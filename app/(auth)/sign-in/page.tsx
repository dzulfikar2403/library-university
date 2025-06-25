"use client"
import { loginCredentials } from '@/action/auth'
import AuthForm from '@/components/AuthForm'
import { signInSchema, TSignInSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm<TSignInSchema>
      type={'sign-in'}
      schema={signInSchema}
      defaultValue={{ 
        email: "",
        password: ""
       }}
      onSubmit={async (data) => await loginCredentials(data)}
    />
  )
}

export default page