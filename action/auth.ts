'use server'

import { signIn, signOut } from "@/auth"
import pool from "@/lib/database/postgresQL/db"
import ratelimit from "@/lib/database/redis/ratelimit"
import { TSignInSchema, TSignUpSchema } from "@/lib/validations"
import { hash } from "bcryptjs"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async () => await signOut();

export const loginCredentials = async (data:TSignInSchema) => {
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    console.log({
        email: data.email,
        password: data.password
    });
    
    const {success,reset} = await ratelimit.limit(ip);
    console.log({
  success: success,
  resetAt: new Date(reset),
});
    
    if(!success){
        redirect('/too-many-request')
    }

    try {
        await signIn('credentials',{
            redirect: false,
            ...data
        })
        
        return {success: true, message: 'successfully login'} 
    } catch (error) {
        return {success: false, message: 'Invalid Data'} 
    }
}

export const register = async (data:TSignUpSchema) => {
    const {email,fullName,password,universityCard,universityId,} =  data;
    
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';

    const { success } = await ratelimit.limit(ip);
    if(!success){
        redirect('/too-many-request')
    }

    if(!email || !fullName || !password || !universityCard || !universityCard || !universityId){
        return {success: false, message: 'date required'}
    }
    
    const userByEmail = await pool.query('select * from users where email ilike $1',[email]);
    
    if(userByEmail.rows.length > 0){
        return {success: false, message: 'email is exists'}
    }
    
    const hashPassword = await hash(password, 10);
    
    try {
        await pool.query(`
            insert into users(full_name,email,password,university_id,university_card)
            values ($1,$2,$3,$4,$5)
            `,[fullName,email,hashPassword,universityId,universityCard]);

            
        return {success: true, message: 'data successfully regitered'}
    } catch (error) {
        console.log((error as Error).message);
        
        return {success: false, message: 'signUp error'}
    }
}