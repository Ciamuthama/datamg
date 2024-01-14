import { fail, redirect } from "@sveltejs/kit";

export const load =async ({locals: {supabase, getSession}}:any) => {
    let session = await getSession();

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, email')
    .eq('id', session.user.id)
    .single();

return { session, profile}
}

export const actions ={
    update:async ({request, locals: {supabase, getSession}}:any) => {
        const formData = await request.formData()
        const fullName = formData.get('fullName') as string
        const username = formData.get('username') as string
        const website = formData.get('website') as string
        const avatarUrl = formData.get('avatarUrl') as string

        const session = await getSession()

        const { error } = await supabase.from('profile').upsert({
            id: session?.user.id,
            full_name:fullName,
            username,
            website,
            avatar_url:avatarUrl,
            update_at: new Date()
        })
       if(error){
        return fail(500,{
            fullName,
            username,
            website,
            avatarUrl,
        })
       }
       return{
        fullName,
        username,
        website,
        avatarUrl,
       }
    },

    signout:async ({locals:{supabase,getSession}}:any) => {
        const session = await getSession()
        if (session) {
            await supabase.auth.signout()
            throw redirect(303, '/')
        }
    }
}