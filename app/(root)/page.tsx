import { getBook } from "@/action/book";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

const Home = async () => {
  const { data, success } = await getBook();

  return (
    <>
      {data.length > 0 ? (
        <>
          <BookOverview bookHero={data[0]} />

          <BookList
            title={"Latest Books"}
            books={data.slice(1)}
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
