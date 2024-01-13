<script lang="ts">
    import {enhance} from '$app/forms'
    import Avatar from './Avatar.svelte'
    import type { SubmitFunction} from '@sveltejs/kit'

    export let data
    export let form

    let {session, supabase, profile} = data
    $:  ({session, supabase, profile} = data)

    let profileForm:HTMLFormElement
    let loading= false
    let fullname: string = profile?.full_name?? ""
    let username: string = profile?.username ?? ""
    let website: string = profile?.website ?? ""
    let avatarUrl: string = profile?.avatar_url ?? ""

    const handleSubmit :SubmitFunction = ()=>{
        loading= true

        return async ()=> {
            loading = false
        }
    }

    const handleSignout : SubmitFunction = ()=>{
            loading = true
            return async({update}) => {
                loading = false
                update()
            }
    }
</script>

<div class="form-widget">
    <form 
    class='form-widget'
    method="get"
    action="?/update"
    use:enhance={handleSubmit}
    bind:this={profileForm}
    >

    <Avatar
			{supabase}
			bind:url={avatarUrl}
			size={10}
			on:upload={() => {
				profileForm.requestSubmit()
			}}
		/>

    <div>
        <label for="fullname">Email </label>
        <input type="text" id="email" disabled value={session.user.email} />
    </div>

    <div>
        <label for="fullname">Full Name</label>
        <input type="text" name="full_name" id="fullname" required value={form?.fullname ?? fullname}/>
    </div>

    <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" required value={form?.username ?? username}/>
    </div>

    <div>
        <label for="website"></label>
        <input type="text" name="wesite" value={form?.wesite ?? website}/>
    </div>

    <div>
        <input type='submit' class='button block primary' value={loading ?"Loading":"update"} disabled={loading} />
    </div>
</form>

<form method="post" action="?/signout" use:enhance={handleSignout}>
    <div>
        <button class="button block" disabled={loading}>Sign Out</button>
    </div>
</form>

</div>
