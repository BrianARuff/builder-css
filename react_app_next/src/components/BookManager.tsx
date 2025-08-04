"use client";

import { useEffect, useState } from "react";
import { css } from "zero-css";
import BookForm from "./BookForm";
import Modal from "./Modal";
import Link from "next/link";

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

export default function BookManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const containerStyles = css({
    padding: "20px 0",
  });

  const headerStyles = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  });

  const addButtonStyles = css({
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)",
    },
  });

  const gridStyles = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
    marginTop: "30px",
  });

  const loadingStyles = css({
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    padding: "60px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  });

  const modalOverlayStyles = css({
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
    padding: "16px",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
  });

  useEffect(() => {
    fetchBooks();
  }, []);


  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (response.ok) {
        const booksData = await response.json();
        setBooks(booksData);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: Partial<Book>) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const newBook = await response.json();
        setBooks((prev) => [...prev, newBook]);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const handleEditBook = async (bookData: Partial<Book>) => {
    if (!editingBook) return;

    try {
      const response = await fetch(`/api/books/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        setBooks((prev) =>
          prev.map((book) => (book.id === editingBook.id ? updatedBook : book))
        );
        setEditingBook(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks((prev) => prev.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleSave = (bookData: Partial<Book>) => {
    if (editingBook) {
      handleEditBook(bookData);
    } else {
      handleAddBook(bookData);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  if (loading) {
    return <div className={loadingStyles}>Loading books...</div>;
  }

  return (
    <div className={containerStyles}>
      <div className={headerStyles}>
        <h2 style={{ margin: 0, color: "#2c3e50", fontSize: "24px" }}>
          Manage Your Book Collection ({books.length} books)
        </h2>
        <button className={addButtonStyles} onClick={() => setShowForm(true)}>
          + Add New Book
        </button>
      </div>

      <div className={gridStyles}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={() => {
              setEditingBook(book);
              setShowForm(true);
            }}
            onDelete={() => handleDeleteBook(book.id)}
          />
        ))}
      </div>

      <Modal
        isOpen={showForm}
        onClose={handleCancel}
        title={editingBook ? "Edit Book" : "Add New Book"}
        description="Fill out the form below to add or edit book information. All fields marked with * are required."
      >
        <BookForm
          book={editingBook || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}

function BookCard({
  book,
  onEdit,
  onDelete,
}: {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const cardStyles = css({
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    padding: "24px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    },
  });

  const titleStyles = css({
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#2c3e50",
    lineHeight: "1.3",
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "#3498db",
    },
  });

  const authorStyles = css({
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "12px",
    fontStyle: "italic",
  });

  const genreStyles = css({
    fontSize: "12px",
    backgroundColor: "#e8f4fd",
    color: "#3498db",
    padding: "6px 12px",
    borderRadius: "20px",
    display: "inline-block",
    marginBottom: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  });

  const descriptionStyles = css({
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.5",
    marginBottom: "16px",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  });

  const detailsStyles = css({
    fontSize: "13px",
    color: "#666",
    marginBottom: "16px",
    lineHeight: "1.4",
  });

  const statsRowStyles = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "8px",
  });

  const ratingStyles = css({
    fontSize: "14px",
    color: "#f39c12",
    fontWeight: "600",
  });

  const priceStyles = css({
    fontSize: "18px",
    fontWeight: "700",
    color: "#27ae60",
  });

  const stockStyles = css({
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor: book.inStock ? "#d5f4e6" : "#ffeaa7",
    color: book.inStock ? "#00b894" : "#fdcb6e",
  });

  const buttonGroupStyles = css({
    display: "flex",
    gap: "8px",
    marginTop: "16px",
  });

  const viewButtonStyles = css({
    flex: "1",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#2ecc71",
    },
  });

  const editButtonStyles = css({
    flex: "1",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
  });

  const deleteButtonStyles = css({
    flex: "1",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#c0392b",
    },
  });

  return (
    <div className={cardStyles}>
      <Link href={`/book/${book.id}`} className={titleStyles}>
        <h3 style={{ margin: 0 }}>{book.title}</h3>
      </Link>
      <p className={authorStyles}>by {book.author}</p>
      <span className={genreStyles}>{book.genre}</span>
      <p className={descriptionStyles}>{book.description}</p>

      <div className={detailsStyles}>
        <div>Published: {book.publishedYear}</div>
        <div>ISBN: {book.isbn}</div>
      </div>

      <div className={statsRowStyles}>
        <span className={ratingStyles}>⭐ {book.rating}/5</span>
        <span className={priceStyles}>${book.price.toFixed(2)}</span>
        <span className={stockStyles}>
          {book.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className={buttonGroupStyles}>
        <Link href={`/book/${book.id}`} className={viewButtonStyles}>
          👁️ View Details
        </Link>
        <button className={editButtonStyles} onClick={onEdit}>
          ✏️ Edit
        </button>
        <button className={deleteButtonStyles} onClick={onDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
