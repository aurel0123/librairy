import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <section className='bg-white rounded-2xl w-full p-4'>
      <div className="flex flx-wrap justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold">All Books</h1>
        <Button className= 'bg-primary-admin hover:bg-primary-admin' asChild>
          <Link href="/admin/books/new" className='text-white'>
            + Create a new book
          </Link>
        </Button>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <p>Table</p>
      </div>
    </section>
  )
}

export default Page