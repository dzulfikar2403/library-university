import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <section className="rounded-xl p-7 w-full bg-white">
      <div className="flex flex-wrap justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href={"/admin/books/new"} className="text-white">
            + Create New Books
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        table
      </div>
    </section>
  );
};

export default page;
