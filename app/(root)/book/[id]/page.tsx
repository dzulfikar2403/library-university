import { getBookById } from "@/action/book";
import BookOverview from "@/components/BookOverview";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { data, success, caching } = await getBookById(id);
  const book: Book[] = data;

  return (
    <>
      <BookOverview bookHero={book[0]} />
      <div className="book-details">
        <div className="flex-1">
          {book[0].video_url && (
            <section className="flex flex-col gap-7">
              <h2 className="text-3xl font-semibold text-light-500 capitalize">
                video
              </h2>
              <video controls src={book[0].video_url} />
            </section>
          )}
          <section className="flex flex-col gap-7">
            <h2 className="text-3xl font-semibold text-light-500 capitalize">
              summary
            </h2>
            <div className="space-y-7 text-light-100 text-xl">
              {book[0].summary.split("\n").map((el: string, i) => (
                <p key={i}>{el}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
