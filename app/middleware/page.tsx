import { auth } from '@/lib/auth';
import React from 'react'

const Middleware = async() => {
    const session = await auth();
  return (
    <div className='flex h-full items-center justify-center flex-col gap-2'>
        <h1 className='text-3xl'>
            Middleware Page
        </h1>
        <p className='text-lg'>
            {session?.user?.email}
        </p>
    </div>
  )
}

export default Middleware