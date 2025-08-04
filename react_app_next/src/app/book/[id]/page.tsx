import Link from "next/link";
import { notFound } from "next/navigation";
import { bookDetailStyles } from "../../../styles/book-detail-styles";

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

type PageProps = {
  params: Promise<{ id: string }>;
};

// Use centralized styles imported from layout

// Server-side data fetching with artificial delay to show loading state
async function fetchBook(id: string): Promise<Book | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/data.json`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books data");
    }

    const books: Book[] = await response.json();

    // Add artificial delay to demonstrate loading state (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return books.find((book) => book.id === parseInt(id)) || null;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

// Generate static params for all books
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/data.json`);
    const books: Book[] = await response.json();

    return books.map((book) => ({
      id: book.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for each book
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const book = await fetchBook(resolvedParams.id);

  if (!book) {
    return {
      title: "Book Not Found",
      description: "The requested book could not be found.",
    };
  }

  return {
    title: `${book.title} by ${book.author} - Bookstore`,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const book = await fetchBook(resolvedParams.id);

  if (!book) {
    notFound();
  }

  return (
    <div className={bookDetailStyles.container}>
      <Link href="/" className={bookDetailStyles.backButton}>
        ← Back to Bookstore
      </Link>

      <div className={bookDetailStyles.bookDetail}>
        <div className={bookDetailStyles.header}>
          <div className={bookDetailStyles.cover}>📖</div>

          <div>
            <h1 className={bookDetailStyles.title}>{book.title}</h1>
            <p className={bookDetailStyles.author}>by {book.author}</p>

            <div className={bookDetailStyles.metaInfo}>
              <div className={bookDetailStyles.metaItem}>
                <span className={bookDetailStyles.metaLabel}>Genre</span>
                <span
                  className={`${bookDetailStyles.metaValue} ${bookDetailStyles.genreTag}`}
                >
                  {book.genre}
                </span>
              </div>

              <div className={bookDetailStyles.metaItem}>
                <span className={bookDetailStyles.metaLabel}>Published</span>
                <span className={bookDetailStyles.metaValue}>
                  {book.publishedYear}
                </span>
              </div>

              <div className={bookDetailStyles.metaItem}>
                <span className={bookDetailStyles.metaLabel}>ISBN</span>
                <span className={bookDetailStyles.metaValue}>{book.isbn}</span>
              </div>

              <div className={bookDetailStyles.metaItem}>
                <span className={bookDetailStyles.metaLabel}>Rating</span>
                <div className={bookDetailStyles.rating}>
                  ⭐ {book.rating}/5
                </div>
              </div>

              <div className={bookDetailStyles.metaItem}>
                <span className={bookDetailStyles.metaLabel}>Price</span>
                <span className={bookDetailStyles.price}>
                  ${book.price.toFixed(2)}
                </span>
              </div>

              <div className={bookDetailStyles.metaItem}>
                <span className={bookDetailStyles.metaLabel}>Availability</span>
                <span
                  className={`${bookDetailStyles.stockBase} ${
                    book.inStock
                      ? bookDetailStyles.inStock
                      : bookDetailStyles.outOfStock
                  }`}
                >
                  {book.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={bookDetailStyles.description}>
          <h2 className={bookDetailStyles.descriptionTitle}>About This Book</h2>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
}
