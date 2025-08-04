import { NextRequest, NextResponse } from 'next/server';

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  rating: number;
  description: string;
  coverUrl: string;
  price: number;
  inStock: boolean;
};

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/data.json`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    const books = await response.json();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newBook = await request.json();
    
    // For now, we'll simulate adding the book
    // In a real app, you'd want to use a database
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/data.json`);
    const books = await response.json();
    
    // Generate new ID
    const maxId = books.length > 0 ? Math.max(...books.map((b: Book) => b.id)) : 0;
    newBook.id = maxId + 1;
    
    // In a real implementation, you'd save to database here
    // For demo purposes, we'll just return the new book
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}