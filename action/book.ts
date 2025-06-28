'use server'
import pool from "@/lib/database/postgresQL/db";
import { TbookSchema } from "@/lib/validations";

export const createBook = async (data:TbookSchema) => {
    const {
        title,
        author,
        genre,
        rating,
        totalCopies,
        coverUrl,
        coverColor,
        description,
        videoUrl,
        summary
    } = data;

    const checkVideoUrl = videoUrl === '' ? null : videoUrl;
    const availableCopies = totalCopies;

    try {
        await pool.query(`
            insert into book(title,author,genre,rating,cover_url,cover_color,description,total_copies,available_copies,video_url,summary)
            values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            returning *;
        `,[title,author,genre,rating,coverUrl,coverColor,description,totalCopies,availableCopies,checkVideoUrl,summary]);
        
        return {success: true, message:'Succesfully add book'};
    } catch (error) {
        console.log(error);

        return {success: false, message: "An error occurred while creating the book"};
    }
}