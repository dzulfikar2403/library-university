import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    universityId: z.coerce.number(), // coerce itu maksa
    universityCard: z.string().nonempty(), // nonempty = min(1)
    password: z.string().min(8)
})

export const signInSchema = signUpSchema.pick({email: true,password: true})


// type
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TSignInSchema = z.infer<typeof signInSchema>;
