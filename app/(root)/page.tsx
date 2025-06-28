import { getBook } from "@/action/book";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

const Home = async () =>  {
  const {data,success} = await getBook();
  
  return (
    <>  
      <BookOverview bookHero={data[0]}  />
      
      <BookList 
        title={"Latest Books"}
        books={data.slice(1)}
        containerClassName="mt-20"
      />
    </>
  );
}

export default Home; 