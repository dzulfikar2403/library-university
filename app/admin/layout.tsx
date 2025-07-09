import { ReactNode } from "react";
import '@/styles/admin.css'
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Session } from "next-auth";
import { getSession } from "@/lib/utils";


const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();
  
  // if(session.user.role !== 'admin') redirect('/');

  return (
    <div className="flex min-h-screen w-full flex-row">
      <Sidebar session={session as Session} />
      <div className="admin-container">
        <Header session={session as Session} /> 
        {children}
      </div>
    </div>
  );
};

export default layout;
