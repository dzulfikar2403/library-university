import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extrasmall" | "small" | "medium" | "regular" | "wide";

const variantClassName = {
  extrasmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

type BookCoverProps = {
  variant?: BookCoverVariant;
  className?: string;
  coverColor: string;
  coverUrl: string;
};

const BookCover = ({
  coverColor = "#012b48",
  coverUrl = "https://placehold.co/600x400/png",
  className,
  variant = "regular",
}: BookCoverProps) => {
  return (
    <div className={cn("relative", variantClassName[variant], className)}>
        <BookCoverSvg coverColor={coverColor} />
        <div className="absolute z-10 left-[16%] w-[87.5%] h-[88%] ">
            <Image src={coverUrl} alt="book cover" fill className="rounded" />
        </div>
    </div>
  );
};

export default BookCover;
