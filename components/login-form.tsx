
'use client';
import React from 'react'
import AuthButton from './auth-button';
import { loginWithCreds } from '@/actions/auth';

const LoginForm = () => {
  return (
    <div>
        <form action={loginWithCreds} className='w-full flex flex-col gap-4'>
            <div>
                <label htmlFor="">
                    Email
                </label>
                <input type="email" placeholder='Email' id='Email'
                name='email'
                className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200' />
            </div>
             <div>
                <label htmlFor="">
                    Password
                </label>
                <input type="password" placeholder='Password' id='Password'
                name='password'
                className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200' />
            </div>
            <div className='mt-4'>
                <AuthButton/>
            </div>
        </form>
    </div>
  )
}

export default LoginForm