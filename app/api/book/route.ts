import { getBook, getBookById } from "@/action/book";
import { getSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { validate as isUUID } from "uuid";

export const GET = async (req: NextRequest) => {
  const session = await getSession();
  
  if(!session?.user?.email){
    return NextResponse.json({ message: `Unauthorized User`, data: null },{ status: 401 });
  }

  const bookIdParams = req.nextUrl.searchParams;
  const bookId = bookIdParams.get("id");

  try {
    if (bookId) {
      if(!isUUID(bookId)) {
        return NextResponse.json({ message: `id invalid`, data: null },{ status: 400 });
      }

      const { data: bookById } = await getBookById(bookId);
      return NextResponse.json({ message: `success get book by ${bookId}`, data: bookById },{ status: 200 });
    }
    
    const { data: book } = await getBook();

    return NextResponse.json({ message: `success get book`, data: book },{ status: 200 });
  } catch (error) {
    console.log('error : ' + error);
    
    return NextResponse.json({ message: `get book error`, data: null},{ status: 500 });
  }
};
