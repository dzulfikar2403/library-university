"use server";

import pool from "@/lib/database/postgresQL/db";

// users
export const getAllUser = async () => {
    try {
        const res = await pool.query(`select u.id,
                                            u.full_name ,
                                            u.email ,
                                            u.created_at,
                                            u.updated_at,
                                            u.role,
                                            u.university_id ,
                                            u.university_card ,
                                            u.status ,
                                            u.can_borrow_book,
                                            count(bb.book_id) total_borrowed_book
                                    from users u 
                                    left join borrow_book bb on (u.id = bb.user_id)
                                    where u.status = 'success'
                                    group by u.id,u.email
                                    order by u.created_at desc`);

        return {
            success: true,
            message: "sucessfully get all user",
            data: res.rows,
        };
    } catch (error) {
        console.log(`error : ${error}`);

        return {
            success: false,
            message: "get user status pending error",
            data: null,
        };
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const res = await pool.query(
            `select *
            from users u 
            where status = 'success' and email ilike $1
            limit 1`,
            [email]
        );

        return {
            success: true,
            message: "successfully get user by email",
            data: res.rows,
        };
    } catch (error) {
        return { success: false, message: "get user by email error", data: null };
    }
};

export const updateUserRole = async (role: "user" | "admin", email: string) => {
    if (!role || !email) {
        return {
            success: false,
            message: "update user role successfully",
            data: null,
        };
    }

    try {
        await pool.query(
            `update users
        set "role" = $1
        where email = $2
        returning *`,
            [role, email]
        );

        return {
            success: true,
            message: "update user role successfully",
            data: null,
        };
    } catch (error) {
        console.log(error);

        return { success: false, message: "update user role error", data: null };
    }
};

export const deleteUser = async (email: string) => {
    if (!email) {
        return { success: false, message: "email required", data: null };
    }

    try {
        await pool.query(
            `delete from users
            where email = $1
            returning *`,
            [email]
        );

        return { success: true, message: "successfully delete", data: null };
    } catch (error) {
        console.log(error);

        return { success: false, message: "delete user error", data: null };
    }
};

// account req
export const getUserPending = async () => {
    try {
        const res = await pool.query(`
        select *
        from users u 
        where status = 'pending'
        order by created_at desc`);

        return {
            success: true,
            message: "sucessfully get user pending",
            data: res.rows,
        };
    } catch (error) {
        console.log(`error : ${error}`);

        return {
            success: false,
            message: "get user status pending error",
            data: null,
        };
    }
};

export const approveAccount = async (email: string) => {
    if (!email) {
        return {
            success: false,
            message: `email required`,
            data: null,
        };
    }

    try {
        await pool.query(
            `update users
            set status = 'success'
            where email = $1
            returning *`,
            [email]
        );

        return {
            success: true,
            message: `succesfully aprrove user`,
            data: null,
        };
    } catch (error) {
        console.log(`error : ${error}`);

        return {
            success: false,
            message: "approve user error",
            data: null,
        };
    }
};

export const rejectAccount = async (email: string) => {
    if (!email) {
        return {
            success: false,
            message: "email required",
            data: null,
        };
    }

    try {
        await pool.query(
            `update users
                set status = 'rejected'
                where email = $1`,[email]);

        return {
            success: true,
            message: "succesfully reject user",
            data: null,
        };
    } catch (error) {
        console.log(`error : ${error}`);

        return {
            success: false,
            message: "reject user error",
            data: null,
        };
    }
}


// borrow req
export const getListBorrowRequest = async (limit:number = 10,offset:number = 0) => {
    try {
        const res = await pool.query(`select u.id as user_id,
                                                u.full_name,
                                                u.email,
                                                u.can_borrow_book,
                                                u.created_at as user_created,
                                                b.id as book_id,
                                                b.title as book_title,
                                                b.cover_url,
                                                b.cover_color,
                                                b.created_at as book_created,
                                                bb.id as borrow_id,
                                                bb.borrow_date,
                                                bb.due_date,
                                                bb.return_date,
                                                bb.status_borrow
                                        from users u 
                                        left join borrow_book bb on (u.id = bb.user_id )
                                        inner join book b on (bb.book_id = b.id )
                                        where u.status = 'success'
                                        order by bb.borrow_date desc
                                        limit $1 offset $2;
                                        `,[limit,offset]);


        return {success: true, message: 'succesfully get data borrow', data: res.rows};
    } catch (error) {
        console.log(`error : ` + error);
        
        return {success: false, message: 'get data borrow error', data: null};
    }
}

export const updateStatusBorrowReq = async (tipe: 'borrowed' | 'returned',borrowId:string) => {
    if(!tipe || !borrowId){
        return {success: false, message: 'tipe and borrow-id is required', data: null};
    }

    try {
        const res = tipe === 'borrowed' ? await pool.query(
                                                `update borrow_book bb 
                                                set status_borrow = $1,
                                                    return_date = null
                                                where bb.id = $2
                                                returning *`,[tipe,borrowId])
                                        : await pool.query(
                                                `update borrow_book bb 
                                                set status_borrow = $1,
                                                    return_date = now()
                                                where bb.id = $2
                                                returning *`,[tipe,borrowId]);
        
        return {success: true, message: 'successfully update status borrow', data: res.rows};
    } catch (error) {
        console.log(`error : ` + error);
        
        return {success: false, message: 'update data borrow error', data: null};
    }
}