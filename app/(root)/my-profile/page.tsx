import { signOut } from '@/auth'
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { sampleBooks } from '@/constants/indes';
import React from 'react'

const Page = () => {
  return (
    <>
        <form action={
            async () => {
                "use server"
                await signOut() ; 
            }
        } className='mb-10'>
            <Button>
                Sign Out
            </Button>
        </form>
        <BookList title='Borrowed books' books={sampleBooks}/>
    </>
  )
}

export default Page