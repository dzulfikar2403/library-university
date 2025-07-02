'use client'
import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

const page = () => {
  const [book, setBook] = useState<[] | Book[]>([]);
  const [filteringBook, setFilteringBook] = useState<[] | Book[]>([]);
  const [sort, setSort] = useState<boolean>(true);
  
  const searchBook = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    
    const bookClone = book.slice();
    const result = bookClone.filter(el => el.title.toLowerCase().includes(value));
    setFilteringBook(result)
  }

  const sortingBook = () => { // trigger after click sort btn
    const sortBook = filteringBook;
    if(!sort){
      sortBook.sort((a,b) => (b.created_at as string).localeCompare(a.created_at as string));
    }else if(sort){
      sortBook.sort((a,b) => (a.created_at as string).localeCompare(b.created_at as string));
    }

    setFilteringBook(sortBook);
    setSort(!sort);
  }

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch('/api/book');
      const book = await res.json();
      setBook(book.data)
      setFilteringBook(book.data)
    }
    fetchBook()
  }, [])
  

  return (
    <section className="rounded-xl p-7 max-w-3/4 bg-white">
      <div className="flex flex-wrap justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <div className="flex items-end gap-4">
          <Input type="text" onChange={searchBook} placeholder="Search Book" />
          <Button variant={"outline"} className="flex items-center gap-1" onClick={sortingBook}>
            <p>A-Z</p>
            <ArrowUpDown size={18} color="black" />
          </Button>
          <Button className="bg-primary-admin" asChild>
            <Link href={"/admin/books/new"} className="text-white">
              + Create New Books
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7 w-full overflow-hidden rounded">
        <Table>
          <TableHeader className="bg-light-300">
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Book Available</TableHead>
              <TableHead>Total Book</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {book.length > 0 && filteringBook.length > 0 &&
              filteringBook.map((el: Book, i) => (
                <TableRow
                  key={i}
                  className="border-light-400 font-semibold text-base"
                >
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <BookCover
                        coverUrl={el.cover_url}
                        coverColor={el.cover_color}
                        variant="extrasmall"
                        className="min-w-20 min-h-24 max-w-20 max-h-24"
                      />
                      <p className="max-w-52">{el.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>{el.author}</TableCell>
                  <TableCell>{el.genre}</TableCell>
                  <TableCell>{el.available_copies}</TableCell>
                  <TableCell>{el.total_copies}</TableCell>
                  <TableCell>
                    {new Date(el.created_at as string)
                      .toDateString()
                      .slice(3)
                      .trim()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <Pen color="blue" size={24} className="cursor-pointer" />
                      <Trash2 color="red" size={24} className="cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default page;
