import { getAllUser } from '@/action/user'
import TableUsers from '@/components/admin/TableUsers'
import React from 'react'

const page = async () => {
    const {data,success} = await getAllUser();

  return (
    <TableUsers user={data as User[]} />
  )
}

export default page