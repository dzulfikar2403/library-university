"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpDown, Check, Eye, X } from "lucide-react";
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
import { updateUserRole } from "@/action/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TableUsers = ({ user }: { user: User[] }) => {
  const router = useRouter();
  const [filteringUser, setFilteringUser] = useState<[] | User[]>([]);
  const [sort, setSort] = useState<boolean>(true);
  const [modalDelete, setModalDelete] = useState<boolean>(false);

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

  const handleChangeRole = async (role: "admin" | "user", email: string) => {
    const res = await updateUserRole(role, email);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    router.refresh();
  };

  useEffect(() => {
    setFilteringUser(user);
  }, [user]);

  return (
    <>
      <section className="rounded-xl p-7 max-w-3/4 bg-white">
        <div className="flex flex-wrap justify-between gap-2">
          <h2 className="text-xl font-semibold">All Users</h2>
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
              <p>Oldest to Recent</p>
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
                <TableHead>Role</TableHead>
                <TableHead>Books Borrowed</TableHead>
                <TableHead>University ID</TableHead>
                <TableHead>ID Card</TableHead>
                <TableHead>Can Borrow Book</TableHead>
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge
                            variant={"outline"}
                            className={cn(
                              "capitalize cursor-pointer",
                              el.role === "admin"
                                ? "text-green-400 bg-green-200"
                                : "text-rose-400 bg-rose-200"
                            )}
                          >
                            {el.role}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Badge
                              variant={"outline"}
                              className="capitalize cursor-pointer text-rose-400 bg-rose-200"
                              onClick={async () =>
                                await handleChangeRole("user", el.email)
                              }
                            >
                              User
                            </Badge>
                            {el.role === "user" && (
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
                                await handleChangeRole("admin", el.email)
                              }
                            >
                              Admin
                            </Badge>
                            {el.role === "admin" && (
                              <DropdownMenuShortcut>
                                <Check size={18} />
                              </DropdownMenuShortcut>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>{el.total_borrowed_book ?? 0}</TableCell>
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
                    <TableCell>{`${el.can_borrow_book}`}</TableCell>
                    <TableCell>
                      <Button
                        variant={"ghost"}
                        onClick={() => setModalDelete(true)}
                      >
                        <Image
                          src={"/icons/admin/trash.svg"}
                          alt="trash"
                          width={22}
                          height={22}
                        />
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
          textHeader="Delete Account Request"
          textSubmit="Confirm Delete"
          onclose={() => setModalDelete(false)}
          textDescription="Delete the student’s account request and grant access. A confirmation email will be sent upon approval."
        />
      )}
    </>
  );
};

export default TableUsers;
