import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public"
import { createServerClient } from '@supabase/ssr'
import type { Handle } from "@sveltejs/kit"

export const handle:Handle =  async ({ event, resolve }:any) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      cookies: {
        get: (key) => event.cookies.get(key),
        set: (key, value, options) => {
          event.cookies.set(key, value, options)
        },
        remove: (key, options) => {
          event.cookies.delete(key, options)
        },
      },
    })

    event.locals.getSession = async () => {
        const {
          data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
      }
    
      return resolve(event, {
        filterSerializedResponseHeaders(name: string) {
          return name === 'content-range'
        },
      })
   
}