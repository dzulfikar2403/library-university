import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { Session } from "next-auth";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

  return (
    <main className="root-container">
      <div className="max-w-7xl mx-auto">
        <Navbar session={session as Session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
