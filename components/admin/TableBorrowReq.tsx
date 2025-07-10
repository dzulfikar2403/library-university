"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpDown, Check, ReceiptText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import ModalConfirm from "./ModalConfirm";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import BookCover from "../BookCover";
import { updateStatusBorrowReq } from "@/action/user";
import { toast } from "sonner";

const TableBorrowReq = ({ listBorrowReq }: { listBorrowReq: BorrowReq[] }) => {
  const router = useRouter();
  const [filteringBorrowReq, setFilteringBorrowReq] = useState<[] | BorrowReq[]>([]);
  const [sort, setSort] = useState<boolean>(true);
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  const searchBorrowReq = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    const listBorrowReqClone = listBorrowReq.slice();
    const result = listBorrowReqClone.filter((el) =>
      el.full_name.toLowerCase().includes(value)
    );
    setFilteringBorrowReq(result);
  };

  const sortingBorrowReq = () => {
    // trigger after click sort btn
    const dataTemp = filteringBorrowReq;
    if (!sort) {
      dataTemp.sort((a, b) =>
        (b.borrow_date as string).localeCompare(a.borrow_date as string)
      );
    } else if (sort) {
      dataTemp.sort((a, b) =>
        (a.borrow_date as string).localeCompare(b.borrow_date as string)
      );
    }

    setFilteringBorrowReq(dataTemp);
    setSort(!sort);
  };

  const handleChangeStatusBorrow = async (tipe: 'borrowed' | 'returned',borrowId:string) => {
    const resUpdate = await updateStatusBorrowReq(tipe,borrowId);

    if(resUpdate.success){
      toast.success(resUpdate.message,{
        description: `updated status borrow with id ${borrowId}`
      })
    }else{
      toast.error(resUpdate.message,{
        description: `failed updated status borrow`
      })
    }
    router.refresh();
  }

  useEffect(() => {
    setFilteringBorrowReq(listBorrowReq);
  }, [listBorrowReq]);

  return (
    <>
      <section className="rounded-xl p-7 max-w-3/4 bg-white">
        <div className="flex flex-wrap justify-between gap-2">
          <h2 className="text-xl font-semibold">All Users</h2>
          <div className="flex items-end gap-4">
            <Input
              type="text"
              onChange={searchBorrowReq}
              placeholder="Search User"
            />
            <Button
              variant={"outline"}
              className="flex items-center gap-1"
              onClick={sortingBorrowReq}
            >
              <p>Oldest to Recent</p>
              <ArrowUpDown size={18} color="black" />
            </Button>
          </div>
        </div>

        <div className="mt-7 w-full overflow-hidden rounded">
          <Table>
            <TableHeader className="bg-light-300">
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>User Request</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Borrowed Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listBorrowReq.length > 0 &&
                filteringBorrowReq.length > 0 &&
                filteringBorrowReq.map((el: BorrowReq, i) => (
                  <TableRow
                    key={i}
                    className="border-light-400 font-semibold text-base"
                  >
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <BookCover
                        coverUrl={el.cover_url}
                        coverColor={el.cover_color}
                        variant="extrasmall"
                        className="min-w-10 max-w-10 min-h-10 max-h-10 "
                      />
                      <p className="max-w-52">{el.book_title}</p>
                    </div>
                  </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {el.full_name
                              .split(" ")
                              .map((el) => el.slice(0, 1))
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{el.full_name}</p>
                          <small className="text-slate-400">{el.email}</small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge
                            variant={"outline"}
                            className={cn(
                              "capitalize cursor-pointer",
                              el.status_borrow === "returned"
                                ? "text-green-400 bg-green-200"
                                : "text-orange-400 bg-orange-200"
                            )}
                          >
                            {el.status_borrow}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Badge
                              variant={"outline"}
                              className="capitalize cursor-pointer text-orange-400 bg-orange-200"
                              onClick={async () =>
                                await handleChangeStatusBorrow("borrowed", el.borrow_id)
                              }
                            >
                              Borrowed
                            </Badge>
                            {el.status_borrow === "borrowed" && (
                              <DropdownMenuShortcut>
                                <Check size={18} />
                              </DropdownMenuShortcut>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Badge
                              variant={"outline"}
                              className="capitalize cursor-pointer text-green-400 bg-green-200"
                              onClick={async () =>
                                await handleChangeStatusBorrow("returned", el.borrow_id)
                              }
                            >
                              returned
                            </Badge>
                            {el.status_borrow === "returned" && (
                              <DropdownMenuShortcut>
                                <Check size={18} />
                              </DropdownMenuShortcut>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      {new Date(el.borrow_date as string)
                        .toDateString()
                        .slice(3)
                        .trim()}
                    </TableCell>
                    <TableCell>
                      {new Date(el.due_date as string)
                        .toDateString()
                        .slice(3)
                        .trim()}
                    </TableCell>
                    <TableCell>
                      {el.return_date
                        ? new Date(el.return_date as string)
                            .toDateString()
                            .slice(3)
                            .trim()
                        : 'not returned yet'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"secondary"}
                        onClick={() => {
                          setModalDelete(true);
                        }}
                        className="bg-blue-50 text-primary-admin"
                      >
                        <ReceiptText size={22} />
                        <p>Generate</p>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </section>
      {modalDelete && (
        <ModalConfirm
          tipe="red"
          textHeader="generate receipt is coming soon"
          textSubmit="Confirm Delete"
          onclose={() => {
            setModalDelete(false);
          }}
          onclick={async () => {}}
          textDescription="Sorry, generate receipt is not exists for now. but it will come"
        />
      )}
    </>
  );
};

export default TableBorrowReq;
