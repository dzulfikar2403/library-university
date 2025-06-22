import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <main className="root-container">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="mt-20 pb-20">
          <div className="text-white font-bebas-neue text-8xl">Chill Bitch, Too Many Request !</div>
          <p className="text-end text-primary">*try again after 1 minute</p>
        </div>
      </div>
    </main>
  );
};

export default page;
