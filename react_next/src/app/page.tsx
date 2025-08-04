import { Suspense } from "react";
import { css } from "builder-css";
import BookManager from '../components/BookManager';
import ServerHeader from '../components/ServerHeader';
import ServerFooter from '../components/ServerFooter';

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

// Main Home component - Server Component with SSR
export default async function Home() {
  // Fetch data on the server for SSR
  const books = await fetchBooksServer();
  const stats = calculateBookStats(books);

  const containerStyles = css({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  });

  const contentStyles = css({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  });

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        {/* Server-rendered header with builder-css */}
        <ServerHeader 
          bookCount={stats.bookCount}
          totalValue={stats.totalValue}
        />
        
        {/* Client-side interactive component */}
        <BookManager />
        
        {/* Server-rendered footer with builder-css */}
        <ServerFooter />
      </div>
    </div>
  );
}

// Fallback component for loading state
function BookGridFallback() {
  const loadingStyles = css({
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    padding: "40px",
  });

  return <div className={loadingStyles}>Loading books...</div>;
}

// Dynamic component that fetches and renders books
async function DynamicBookGrid() {
  const books = await fetchBooksServer();

  const gridStyles = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  });

  const errorStyles = css({
    textAlign: "center",
    fontSize: "18px",
    color: "#e74c3c",
    padding: "40px",
  });

  if (!books) {
    return <div className={errorStyles}>Failed to load books</div>;
  }

  return (
    <div className={gridStyles}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

// Server-side data fetching function for SSR
async function fetchBooksServer(): Promise<Book[] | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/data.json`, {
      // Enable ISR caching for performance
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch books data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
}

// Calculate statistics from books data (server-side)
function calculateBookStats(books: Book[] | null) {
  if (!books || books.length === 0) {
    return { bookCount: 0, totalValue: 0, averagePrice: 0 };
  }

  const bookCount = books.length;
  const totalValue = books.reduce((sum, book) => sum + book.price, 0);
  const averagePrice = totalValue / bookCount;

  return { bookCount, totalValue, averagePrice };
}

// Static component - pre-rendered
function BookCard({ book }: { book: Book }) {
  const cardStyles = css({
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    },
  });

  const titleStyles = css({
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
  });

  const authorStyles = css({
    fontSize: "14px",
    color: "#666",
    marginBottom: "12px",
  });

  const genreStyles = css({
    fontSize: "12px",
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "12px",
    display: "inline-block",
    marginBottom: "8px",
  });

  const descriptionStyles = css({
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.4",
    marginBottom: "12px",
  });

  return (
    <div className={cardStyles}>
      <h3 className={titleStyles}>{book.title}</h3>
      <p className={authorStyles}>by {book.author}</p>
      <span className={genreStyles}>{book.genre}</span>
      <p className={descriptionStyles}>{book.description}</p>
      <p>Published: {book.publishedYear}</p>

      {/* Dynamic components will be inserted here */}
      <Suspense fallback={<div>Loading stock info...</div>}>
        <DynamicStockStatus bookId={book.id} inStock={book.inStock} />
      </Suspense>

      <Suspense fallback={<div>Loading rating...</div>}>
        <DynamicRating bookId={book.id} rating={book.rating} />
      </Suspense>

      <Suspense fallback={<div>Loading price...</div>}>
        <DynamicPrice bookId={book.id} price={book.price} />
      </Suspense>
    </div>
  );
}

// Dynamic component - client-side rendered
function DynamicStockStatus({
  bookId,
  inStock,
}: {
  bookId: number;
  inStock: boolean;
}) {
  const stockStyles = css({
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: inStock ? "#d4edda" : "#f8d7da",
    color: inStock ? "#155724" : "#721c24",
    display: "inline-block",
    marginRight: "8px",
  });

  return (
    <span className={stockStyles}>{inStock ? "In Stock" : "Out of Stock"}</span>
  );
}

// Dynamic component - client-side rendered
function DynamicRating({ bookId, rating }: { bookId: number; rating: number }) {
  const ratingStyles = css({
    fontSize: "14px",
    color: "#f39c12",
    marginRight: "8px",
  });

  return <span className={ratingStyles}>⭐ {rating}/5</span>;
}

// Dynamic component - client-side rendered
function DynamicPrice({ bookId, price }: { bookId: number; price: number }) {
  const priceStyles = css({
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
  });

  return <span className={priceStyles}>${price.toFixed(2)}</span>;
}
