'use server'

import { signIn, signOut } from "@/auth"
import emailTemplate from "@/components/emailTemplate"
import pool from "@/lib/database/postgresQL/db"
import ratelimit from "@/lib/database/redis/ratelimit"
import resend from "@/lib/resend"
import { TSignInSchema, TSignUpSchema } from "@/lib/validations"
import { hash } from "bcryptjs"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async () => await signOut();

export const loginCredentials = async (data:TSignInSchema) => {
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    
    const {success} = await ratelimit.limit(ip);
    
    if(!success){
        redirect('/too-many-request')
    }

    if(!data.email || !data.password){
        return {success: false, message: 'input required'} 
    }
    
    
    try {
        const userByEmail = await pool.query('select * from users where email ilike $1',[data.email]);
        
        if(!userByEmail?.rows[0]?.email || userByEmail.rowCount === 0 || userByEmail.rows.length === 0){
            return {success: false, message: 'email is not exists'} 
        }

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
    const listUniversityId = await pool.query('select distinct university_id from users');
    
    const arrayListUnivId = listUniversityId.rows.map(el => el.university_id);
    
    if(userByEmail.rows.length > 0){
        return {success: false, message: 'email is already exists'}
    }

    if(arrayListUnivId.includes(universityId)){
        return {success: false, message: 'university id already is exists'}
    }
    
    const hashPassword = await hash(password, 10);
    
    try {
        const res = await pool.query(`
            insert into users(full_name,email,password,university_id,university_card)
            values ($1,$2,$3,$4,$5)
            returning *
            `,[fullName,email,hashPassword,universityId,universityCard]);

        if(res.rows.length > 0){
            const sendWelcomeEmail = await resend.emails.send({
                from: 'Dzull Development <hello@dzulfikar2403.my.id>',
                to: email as string,
                subject: `Welcome to University Library 👌`,
                react: emailTemplate({
                    username: fullName as string,
                    bodyMessage: `Welcome to University Library! We're thrilled to have you join our community of book lovers.\nThis email confirms your successful signup. You can now browse our extensive library, create personalized reading lists, and connect with other readers.\nStart exploring our platform here: ...`
                })
            });
            
            if(sendWelcomeEmail.error){
                console.log('error resend email : ' + JSON.stringify(sendWelcomeEmail.error.message,null,2));
            }
        }

        return {success: true, message: 'data successfully registered'}
    } catch (error) {
        console.log((error as Error).message);
        
        return {success: false, message: 'signUp error'}
    }
}