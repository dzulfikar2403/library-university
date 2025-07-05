import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type ModalConfirmProps = {
    tipe: 'red' | 'green'
    textHeader: string
    textSubmit: string
    textDescription: string
    onclose: () => void
    onclick: () => Promise<void>
}

const ModalConfirm = ({tipe,onclose,textSubmit,textHeader,textDescription,onclick}:ModalConfirmProps) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative bg-white rounded text-center min-w-[25%] max-w-80 space-y-4 p-4">
        <X
          size={22}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onclose}
        />
        <div className="relative size-24 mx-auto">
          {tipe === 'green' ? <Image src={"/icons/admin/success-modal.svg"} alt="confirm" fill /> : <Image src={'/icons/admin/reject-modal.svg'} alt="warning" fill />}
        </div>
        <h2 className="font-semibold text-xl">{textHeader}</h2>
        <p className="text-slate-400">
          {textDescription}
        </p>
        <Button onClick={onclick} className={cn('text-white font-semibold w-full py-6 break-words',
            tipe === 'green' ? 'bg-green-400'  : 'bg-rose-400' 
        )}>
          {textSubmit}
        </Button>
      </div>
    </div>
  );
};

export default ModalConfirm;
