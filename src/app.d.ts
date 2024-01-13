// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session } from "@supabase/supabase-js";
declare global {
	namespace App {
		interface Locals{
            superbase: SupabaseClient
            getSession(): Promise<Session|null>

        }
        interface PageData{
            session: Session| null;
        }
	}
}

export {};
