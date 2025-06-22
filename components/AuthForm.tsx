"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
} from "react-hook-form";
import { ZodTypeAny } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constant";
import ImageInput from "./ImageInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthFormProps<T extends FieldValues> = {
  type: "sign-in" | "sign-up";
  schema: ZodTypeAny;
  defaultValue: T;
  onSubmit: (data: T) => Promise<{success:boolean, message:string}>;
};

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValue,
  onSubmit,
}: AuthFormProps<T>) => {
  const isSignIn = type === "sign-in";
  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue as DefaultValues<T>,
  });

  const handleSubmit = async (data:T) => {
    const response = await onSubmit(data);
    form.reset();

    if(response.success && isSignIn){ // cek jika success & signin
      toast.success(response.message)
      router.push('/')
    }else if(response.success && !isSignIn){ // cek jika success & signup
      toast.success(response.message)
      router.push('/sign-in')
    }else{
      toast.error(response.message)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Welcome Back to the BookWise"
          : "Create Your Library Account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(defaultValue).map((eachField) => (
            <FormField
              key={eachField}
              control={form.control}
              name={eachField as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[eachField as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageInput nameId={field.name} tipe="user" onChange={field.onChange}/>
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[eachField as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center font-medium">
        {isSignIn
          ? "Don’t have an account already? "
          : "Have an account already? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-primary"
        >
          {isSignIn ? "Register here" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
