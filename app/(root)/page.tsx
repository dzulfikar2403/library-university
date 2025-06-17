import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constant";

const Home = () =>  {
  
  return (
    <>
      <BookOverview bookHero={sampleBooks[0]}  />
      
      <BookList 
        title={"Latest Books"}
        books={sampleBooks}
        containerClassName="mt-20"
      />
    </>
  );
}

export default Home; 