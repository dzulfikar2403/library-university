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
    video: string;
    summary: string;
    isLoanedBook?: boolean; 
}