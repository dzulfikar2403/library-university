'use server'

import pool from "@/lib/database/postgresQL/db";
import ratelimit from "@/lib/database/redis/ratelimit";
import redis from "@/lib/database/redis/redis";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getAllUser = async () => {
    try {
        const getUser:User[]|null = await redis.get('user');

        if(!getUser){
            const res = await pool.query(`select u.id,
                                                u.full_name ,
                                                u.email ,
                                                u.created_at,
                                                u.updated_at,
                                                u.role,
                                                u.university_id ,
                                                u.university_card ,
                                                u.status ,
                                                u.can_borrow_book,
                                                count(bb.book_id) total_borrowed_book
                                        from users u 
                                        left join borrow_book bb on (u.id = bb.user_id)
                                        where u.status = 'success'
                                        group by u.id,u.email
                                        order by u.created_at desc`);
            await redis.set('user',res.rows);

            return {success: true,message: 'sucessfully get all user',caching:false,data: res.rows}
        }

        return {success: true,message: 'sucessfully get all user',caching:true,data: getUser}
    } catch (error) {
        console.log(`error : ${error}`);
        
        return {success: false,message: 'get user status pending error',caching:false,data: null}
    }
}

export const getUserByEmail = async (email:string) => {
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';

    const {success} = await ratelimit.limit(ip);

    if(!success) redirect('/too-many-request');

    try { 
        const res = await pool.query(`select *
                                    from users u 
                                    where status = 'success' and email ilike $1
                                    limit 1`,[email]);
        
        return {success: false,message: 'successfully get user by email',data: res.rows}
    } catch (error) {
        return {success: false,message: 'get user by email error',data: null}
    }
}

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

export const updateUserRole = async(role:'user'|'admin',email:string) => {
    try {
        const updateRoleQuery = await pool.query(`update users
                                        set "role" = $1
                                        where email = $2
                                        returning *`,[role,email])
        
        if(updateRoleQuery.rows.length > 0){
            const revalidateUser = await pool.query(`select u.id,
                                                        u.full_name ,
                                                        u.email ,
                                                        u.created_at,
                                                        u.updated_at,
                                                        u.role,
                                                        u.university_id ,
                                                        u.university_card ,
                                                        u.status ,
                                                        u.can_borrow_book,
                                                        count(bb.book_id) total_borrowed_book
                                                    from users u 
                                                    left join borrow_book bb on (u.id = bb.user_id)
                                                    where u.status = 'success'
                                                    group by u.id,u.email
                                                    order by u.created_at desc`);
        await redis.set('user',revalidateUser.rows,{xx:true}); // overide key user
        }

        return {success: true,message: 'update user role successfully',data: null}
    } catch (error) {
        
        return {success: false,message: 'update user role error',data: null}
    }
}