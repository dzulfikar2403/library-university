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
    created_at?: string;
    created_by?: string;
    updated_at?: string;
    updated_by?: string;
}