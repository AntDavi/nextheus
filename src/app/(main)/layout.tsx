import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import Header from "./_components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
