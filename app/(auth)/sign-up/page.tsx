"use client";
import AuthForm from "@/components/AuthForm";
import { signUpSchema, TSignUpSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <AuthForm<TSignUpSchema>
      type={"sign-up"}
      schema={signUpSchema}
      defaultValue={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default page;
