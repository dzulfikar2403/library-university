import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({ data }: { data: Book }) => {
  return (
    <li className={cn(data.isLoanedBook && "w-full xs:max-w-52")}>
      <Link
        href={`/book/${data.id}`}
        className={cn(data.isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={data.cover_color} coverUrl={data.cover_url} />
        <div
          className={cn("mt-4", !data.isLoanedBook && "max-w-28 xs:max-w-40")}
        >
          <p className="book-title" title={data.title}>{data.title}</p>
          <p className="book-genre">{data.genre}</p>
        </div>

        {data.isLoanedBook && (
          <div className="mt-2 w-full">
            <div className="book-loaned">
                <Image src={'/icons/calendar.svg'} alt="calendar" width={18} height={18} className="object-contain" />
                <p className="text-light-100">11 Days left to return</p>
            </div>
            <Button className="book-btn">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
