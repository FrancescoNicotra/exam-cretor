import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddNewExam from "@/components/Button/SubComponents/AddNewExam/AddNewExam";
import { GoPlus } from "react-icons/go";
import { IconType } from "react-icons";

export default async function ProtectedPage() {
  const supabase = createClient();

  const renderIcon = (Icon: IconType) => {
    return <Icon />;
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <h2 className="font-bold text-4xl mb-4">Crea il tuo esame</h2>
        <div className="grid grid-cols-4 gap-4 w-full h-full">
          <AddNewExam text={"crea un nuovo esame"} Icon={GoPlus} href="/exam/create"/>
        </div>
      </div>
    </>
  );
}
