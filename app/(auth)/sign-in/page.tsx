"use client";

import AuthForm from '@/components/AuthForm'
import { signInWithCreadentials } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/validations'
import React from 'react'

const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema = {signInSchema}
      defaultValues = {{
        email : "", 
        password : ""
      }}
      onSubmit = {signInWithCreadentials}
    />
  )
}

export default Page