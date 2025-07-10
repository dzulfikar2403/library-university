type Book = {
    id: number;
    title: string;
    author: string;
    genre:  string;
    rating: number;
    total_copies: number;
    available_copies: number;
    description: string;
    cover_color: string;
    cover_url: string;
    video_url: string;
    summary: string;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    isLoanedBook?: boolean; 
}

type User = {
    id: string;
    full_name: string;
    email: string;
    university_id: number;
    password: string;
    university_card: string;
    status: string;
    role: string;
    can_borrow_book: boolean;
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
    total_borrowed_book?: number;
}

type BorrowReq = {
    user_id: string,
    full_name: string,
    email: string,
    can_borrow_book: boolean,
    user_created: string,
    book_id: string,
    book_title: string,
    cover_url: string,
    cover_color: string,
    book_created: string,
    borrow_id: string,
    borrow_date: string,
    due_date: string,
    return_date: string | null,
    status_borrow: 'borrowed' | 'returned'
}