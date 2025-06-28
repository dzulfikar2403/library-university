import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
  
    if(!session){
      redirect('/sign-in')
    }

  return (
    <main className="root-container">
      <div className="max-w-7xl mx-auto">
        <Navbar session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
