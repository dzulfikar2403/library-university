import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <Button asChild className='back-btn'>
            <Link href={'/admin/books'}>Go Back</Link>
        </Button>

        <section className='bg-white max-w-2xl'></section>
    </div>
  )
}

export default page