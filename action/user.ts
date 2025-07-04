'use server'

import pool from "@/lib/database/postgresQL/db";
import redis from "@/lib/database/redis/redis";

export const getUserPending = async () => {
    try {
        const getUser:User[]|null = await redis.get('user:pending');

        if(!getUser){
            const res = await pool.query(`select *
                from users u 
                where status = 'pending'
                order by created_at desc`);
            await redis.set('user:pending',res.rows)

            return {success: true,message: 'sucessfully get user pending',caching:false,data: res.rows}
        }

        return {success: true,message: 'sucessfully get user pending',caching:true,data: getUser}
    } catch (error) {
        console.log(`error : ${error}`);
        
        return {success: false,message: 'get user status pending error',caching:false,data: null}
    }
}