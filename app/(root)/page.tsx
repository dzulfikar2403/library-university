import { getBook } from "@/action/book";
import { getUserByEmail } from "@/action/user";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

const Home = async () => {
  const session = await auth();
  const { data:book } = await getBook();
  const { data:user } = await getUserByEmail(session?.user?.email as string);

  return (
    <>
      {book.length > 0 ? (
        <>
          <BookOverview bookHero={book[0]} canUserBorrow={user?.[0]?.can_borrow_book ?? false} />

          <BookList
            title={"Latest Books"}
            books={book.slice(1)}
            containerClassName="mt-20"
          />
        </>
      ) : (
        <h2 className="text-5xl font-ibm-plex-sans text-light-300 font-semibold">
          Data is empty
        </h2>
      )}
    </>
  );
};

export default Home;
