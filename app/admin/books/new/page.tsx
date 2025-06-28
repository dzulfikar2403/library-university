import { createBook } from '@/action/book'
import BookForm from '@/components/admin/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <Button asChild className='back-btn'>
            <Link href={'/admin/books'}>Go Back</Link>
        </Button>

        <section className='bg-white p-7 rounded max-w-2xl'>
          {/* boookform */}
          <BookForm tipe='create' onSubmit={createBook} />
        </section>
    </div>
  )
}

export default page