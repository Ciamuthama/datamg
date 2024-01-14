export type Json = string| number| boolean| null| {[key:string]:Json} | Json[]

export interface Database {
    public: {
        Tabels:{
            profiles: {
                Row:{
                    id:string
                    update_at:string |null
                    username: string |null
                    avatar_url: string| null
                    website: string | null
                }
                Insert:{
                    id:string
                    update_at?:string |null
                    username?: string| null
                    avatar_url?: string| null
                    website?: string | null
                }
                Update:{
                    id?:string,
                    update_at?:string | null
                    username?: string| null
                    avatar_url?: string| null
                    website?: string | null
                }

            }

        }
        Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
    }
}