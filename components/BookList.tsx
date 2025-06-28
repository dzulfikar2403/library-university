import React from "react";
import BookCard from "./BookCard";

type BookListProps = {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({books,title,containerClassName}:BookListProps) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.length > 0 ? books.map(book => <BookCard key={book.id} data={book} />) : <p className="text-light-400">*no data new yet</p>}
      </ul>
    </section>
  );
};

export default BookList;
