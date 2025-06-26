import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    universityId: z.coerce.number(), // coerce itu maksa
    universityCard: z.string().nonempty({message: 'university card required'}).url(), // nonempty = min(1)
    password: z.string().min(8)
})

export const signInSchema = signUpSchema.pick({email: true,password: true})

export const bookSchema = z.object({
    title: z.string().min(2).max(100).trim(),
    description: z.string().min(5).max(1000).trim(),
    author: z.string().min(2).max(100).trim(),
    genre: z.string().min(2).max(100),
    rating: z.coerce.number().min(1).max(5),
    totalCopies: z.coerce.number().positive().max(1000),
    coverUrl: z.string().nonempty(),
    coverColor: z.string({message: 'color required'}).regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,{message: 'invalid color type'}).trim(),
    videoUrl: z.string(),
    summary: z.string().min(10).trim()
})

// type
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TSignInSchema = z.infer<typeof signInSchema>;

export type TbookSchema = z.infer<typeof bookSchema>;