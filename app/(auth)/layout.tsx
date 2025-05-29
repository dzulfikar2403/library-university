import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex items-center gap-2">
            <Image src={"/icons/logo.svg"} alt="logo" width={37} height={37} />
            <h1 className="font-semibold text-2xl text-white">Boookwise</h1>
          </div>
          
          <div>{children}</div> 
        </div>
      </section>
      <section className="auth-illustration">
        <Image 
            src={'/images/auth-illustration.png'}
            alt="illustration"
            width={1000}
            height={1000}
            className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
