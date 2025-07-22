import BookingList from "@/app/_components/BookingList";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

export default async function Page() {
  // const supabase = createServerComponentClient(
  //   { cookies },
  //   {
  //     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   }
  // );

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // console.log("Cookies on server:", cookies().getAll());

  return <BookingList />;
}
