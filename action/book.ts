'use server'
import pool from "@/lib/database/postgresQL/db";
import redis from "@/lib/database/redis/redis";
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
        const res = await pool.query(`
            insert into book(title,author,genre,rating,cover_url,cover_color,description,total_copies,available_copies,video_url,summary)
            values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            returning *;
        `,[title,author,genre,rating,coverUrl,coverColor,description,totalCopies,availableCopies,checkVideoUrl,summary]);
        
        if(res.rows.length > 0){
            const dataBook = await pool.query('select * from book order by created_at desc limit 10');
            await redis.set('book', dataBook.rows,{xx:true,ex: 3600}); // update using xx:true
        };

        return {success: true, message:'Succesfully add book'};
    } catch (error) {
        console.log(error);

        return {success: false, message: "An error occurred while creating the book"};
    }
}

export const getBook = async () => {
    const getBook:Book[]|null = await redis.get('book');
    
    if(!getBook){
        const dataBook = await pool.query('select * from book order by created_at desc limit 10');
        await redis.set('book', dataBook.rows,{nx:true,ex: 3600}) // update using nx:true
        
        return {success: true, caching: false, data:dataBook.rows};
    }

    return {success: true, caching: true, data: getBook};
}