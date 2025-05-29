"use client"
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
      onSubmit={() => {}}
    />
  )
}

export default page