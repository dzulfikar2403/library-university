import { sampleBooks } from "@/constant";
import { uploadImages } from "@/lib/cloudinary";
import pool from "@/lib/database/postgresQL/db";


const seedingDataBook = async () => {
    console.log('start seeding...');
    
    try {
        for (const book of sampleBooks) {
            const coverUrl = await uploadImages(book.coverUrl,`${book.title}.jpg`,'/book/image');
            console.log(`sucessfully upload image : ${book.title}`);
            
            const availableCopies = book.totalCopies;
            const rating = Math.round(book.rating);

            if(coverUrl){
                await pool.query(`
                    insert into book(title,author,genre,rating,cover_url,cover_color,description,total_copies,available_copies,summary)
                    values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                    returning *;
                `,[book.title,book.author,book.genre,rating,coverUrl,book.coverColor,book.description,book.totalCopies,availableCopies,book.summary]);
            }

            console.log(`success add book ${book.title}`);
        }

        console.log(`sucessfully add all book data`);
    } catch (error) {
        console.log('error : ' + JSON.stringify(error,null,2));
        console.log('error : ' + JSON.stringify((error as Error).message,null,2));
    }
    console.log('close seeding...');
}

seedingDataBook();