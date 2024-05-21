import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CreatePage from "./CreatePage";

async function Create() {

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/");
  }
  return <CreatePage />;
}

export default Create;
