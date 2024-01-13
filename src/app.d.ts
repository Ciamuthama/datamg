import { SupabaseClient, Session } from "@supabase/supabase-js"
//import { DataBase } from './DatabaseDefinitions'

declare global{
    namespace App{
        interface Local {
            superbase: SupabaseClient
            getSession(): Promise<Session | null>
        }
        interface PageData{
            session: Session| null
        }
    }
}

