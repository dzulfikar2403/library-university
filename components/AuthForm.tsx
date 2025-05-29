"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constant";
import ImageInput from "./ImageInput";

type AuthFormProps<T> = {
  type: "sign-in" | "sign-up";
  schema: ZodType<T>;
  defaultValue: T;
  onSubmit: (data: T) => void;
};

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValue,
  onSubmit,
}: AuthFormProps<T>) => {
  const isSignIn = type === "sign-in";

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue as DefaultValues<T>,
  });

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <ImageInput />
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
