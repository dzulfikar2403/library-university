import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({ bookHero, canUserBorrow }: { bookHero: Book,canUserBorrow:boolean }) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 title={bookHero.title}>{bookHero.title}</h1>

        <div className="book-info">
          <p>
            By{" "}
            <span className="font-semibold text-light-200">
              {bookHero.author}
            </span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">
              {bookHero.genre}
            </span>
          </p>
          <div className="flex flex-row items-center gap-1">
            <Image src={"/icons/star.svg"} alt="star" width={22} height={22} />
            <p>{bookHero.rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Book : <span>{bookHero.total_copies}</span>
          </p>
          <p>
            Available Book : <span>{bookHero.available_copies}</span>
          </p>
        </div>

        <p className="book-description">{bookHero.description}</p>

        <Button className="book-overview_btn" disabled={canUserBorrow ? false : true}>
          <Image src={"/icons/book.svg"} alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl">Borrow</p>
        </Button>
      </div>

      <div className="relative flex-1 flex justify-center">
        <div className="relative">
          <BookCover
            variant={"wide"}
            className={"z-10"}
            coverColor={bookHero.cover_color}
            coverUrl={bookHero.cover_url}
          />

          <div className="hidden md:block absolute top-10 left-16 rotate-12 blur">
            <BookCover
              variant={"wide"}
              className={"z-10"}
              coverColor={bookHero.cover_color}
              coverUrl={bookHero.cover_url}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
