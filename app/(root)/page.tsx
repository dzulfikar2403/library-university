import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constant";
import Image from "next/image";

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