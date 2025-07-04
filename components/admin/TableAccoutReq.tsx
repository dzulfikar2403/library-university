"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpDown, CircleX, Eye, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";

const TableAccoutReq = ({ user }: { user: User[] }) => {
  const [filteringUser, setFilteringUser] = useState<[] | User[]>([]);
  const [sort, setSort] = useState<boolean>(true);
  const [modalApprove, setModalApprove] = useState<boolean>(false);
  const [modalReject, setModalReject] = useState<boolean>(false);

  const searchUser = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    const userClone = user.slice();
    const result = userClone.filter((el) =>
      el.full_name.toLowerCase().includes(value)
    );
    setFilteringUser(result);
  };

  const sortingUserByName = () => {
    // trigger after click sort btn
    const sortUser = filteringUser;
    if (!sort) {
      sortUser.sort((a, b) =>
        (b.created_at as string).localeCompare(a.created_at as string)
      );
    } else if (sort) {
      sortUser.sort((a, b) =>
        (a.created_at as string).localeCompare(b.created_at as string)
      );
    }

    setFilteringUser(sortUser);
    setSort(!sort);
  };

  useEffect(() => {
    setFilteringUser(user);
  }, [user]);

  return (
    <>
      <section className="rounded-xl p-7 max-w-3/4 bg-white">
        <div className="flex flex-wrap justify-between gap-2">
          <h2 className="text-xl font-semibold">
            Account Registration Requests
          </h2>
          <div className="flex items-end gap-4">
            <Input
              type="text"
              onChange={searchUser}
              placeholder="Search User"
            />
            <Button
              variant={"outline"}
              className="flex items-center gap-1"
              onClick={sortingUserByName}
            >
              <p>A-Z</p>
              <ArrowUpDown size={18} color="black" />
            </Button>
          </div>
        </div>

        <div className="mt-7 w-full overflow-hidden rounded">
          <Table>
            <TableHeader className="bg-light-300">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date joined</TableHead>
                <TableHead>University ID</TableHead>
                <TableHead>ID Card</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.length > 0 &&
                filteringUser.length > 0 &&
                filteringUser.map((el: User, i) => (
                  <TableRow
                    key={i}
                    className="border-light-400 font-semibold text-base"
                  >
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
                      {new Date(el.created_at as string)
                        .toDateString()
                        .slice(3)
                        .trim()}
                    </TableCell>
                    <TableCell>{el.university_id}</TableCell>
                    <TableCell>
                      <a
                        href={el.university_card}
                        target="_blank"
                        className="text-sky-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye size={22} className="text-sky-400" />
                        <p>View ID Card</p>
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-6 items-center ">
                        <Button
                          className="text-green-400 bg-green-200 hover:ring-1 hover:ring-green-400"
                          variant={"secondary"}
                          onClick={() => setModalApprove(true)}
                        >
                          Approve Account
                        </Button>
                        <CircleX
                          color="red"
                          size={24}
                          className="cursor-pointer"
                          onClick={() => setModalReject(true)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </section>
      {modalApprove && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="relative bg-white rounded text-center min-w-[25%] max-w-80 space-y-4 p-4">
                <X size={22} className="absolute top-4 right-4 cursor-pointer" onClick={() => setModalApprove(false)}/>
                <div className="relative size-24 mx-auto">
                    <Image src={'/icons/admin/success-modal.svg'} alt="success" fill />
                </div>
                <h2 className="font-semibold text-xl">Approve Account Request</h2>
                <p className="text-slate-400">Approve the student’s account request and grant access. A confirmation email will be sent upon approval.</p>
                <Button className="bg-green-400 text-white font-semibold w-full py-6 break-words">Approve & Send Confirmation</Button>
            </div>
        </div>
      )}
      {modalReject && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="relative bg-white rounded text-center min-w-[25%] max-w-80 space-y-4 p-4">
                <X size={22} className="absolute top-4 right-4 cursor-pointer" onClick={() => setModalReject(false)}/>
                <div className="relative size-24 mx-auto">
                    <Image src={'/icons/admin/reject-modal.svg'} alt="success" fill />
                </div>
                <h2 className="font-semibold text-xl">Deny Account Request</h2>
                <p className="text-slate-400">Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification.</p>
                <Button className="bg-rose-400 text-white font-semibold w-full py-6 break-words">Deny & Notify Student</Button>
            </div>
        </div>
      )}
    </>
  );
};

export default TableAccoutReq;
