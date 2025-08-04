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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const updatedBook = await request.json();
    const resolvedParams = await params;
    const bookId = parseInt(resolvedParams.id);
    
    // In a real app, you'd update the database here
    // For demo purposes, we'll just return the updated book
    updatedBook.id = bookId;
    
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const bookId = parseInt(resolvedParams.id);
    
    // In a real app, you'd delete from database here
    // For demo purposes, we'll just return success
    
    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}