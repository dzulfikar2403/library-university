import { getListBorrowRequest } from '@/action/user';
import TableBorrowReq from '@/components/admin/TableBorrowReq';
import React from 'react'

const page = async() => {
    const {data,success} = await getListBorrowRequest();

  return (
    <TableBorrowReq listBorrowReq={data as BorrowReq[]} />
  )
}

export default page