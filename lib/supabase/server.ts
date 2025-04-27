// import { createServerClient } from "@supabase/ssr"
// import { cookies } from "next/headers"
// import type { Database } from "@/types/supabase"

// export function createServerSupabaseClient() {
//   const cookieStore = cookies()

//   return createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
//     cookies: {
//       get(name: string) {
//         return (await cookieStore).get(name)?.value
//       },
//       set(name: string, value: string, options: any) {
//         (await cookieStore).set({ name, value, ...options })
//       },
//       remove(name: string, options: any) {
//         (await cookieStore).set({ name, value: "", ...options })
//       },
//     },
//   })
// }


import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from "@/types/supabase"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return ((await cookieStore).get(name))?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value, ...options })
          } catch (error) {
            // Handle error if needed
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            (await cookieStore).set({ name, value: '', ...options })
          } catch (error) {
            // Handle error if needed
          }
        },
      },
    }
  )
}