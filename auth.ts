
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import config from "./lib/config";
import { Pool } from "@neondatabase/serverless"
import PostgresAdapter from "@auth/pg-adapter"
import { compare } from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    const pool = new Pool({connectionString: config.env.databaseUrl,max:10}); // harus init pool khusus dari neon dan harus  
    return{
        adapter: PostgresAdapter(pool),
        
        session: {
            strategy: 'jwt',
            maxAge: 1 * 60 * 60, // exp: 1jam
        },
        
        providers: [
            Credentials({
                name: 'credentials',
                authorize: async (credentials) => {
                    const email = credentials.email as string;
                    const password = credentials.password as string;
                    
                    if(!email || !password){
                        throw new Error('data required')
                    }
                    
                    const userByEmail = await pool.query('select * from users where email ilike $1',[email]);
                    
                    if(!userByEmail.rows[0].email || userByEmail.rowCount === 0){
                        throw new Error('email is not exists')
                    }
                    
                    const comparePassword = await compare(password,userByEmail.rows[0].password)
                    
                    if(!comparePassword){
                        throw new Error('invalid password')
                    }

                    const userData = {
                        id: userByEmail.rows[0].id as string,
                        name: userByEmail.rows[0].full_name as string,
                        email: userByEmail.rows[0].email as string,
                        role: userByEmail.rows[0].role as string,
                    }

                    return userData;
                },
            })
        ],

        pages:{
            signIn: '/sign-in'
        },

        callbacks: {
            jwt: async ({token,user}) =>{
                if(user){
                    token.role = user?.role;
                }

                return token;
            },
            session: async ({session,token}) =>{
                if(token){
                    session.user.role = token.role; 
                }

                return session
            }
        }
    }
})