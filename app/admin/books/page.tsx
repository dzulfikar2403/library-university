import { getBook } from "@/action/book";
import TableBook from "@/components/admin/TableBook";

const page = async () => {
  const {data,success} = await getBook();

  return (
    <TableBook book={data} />
  );
};

export default page;
