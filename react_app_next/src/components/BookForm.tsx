"use client";

import { useState, useEffect, useRef } from 'react';
import { css } from 'zero-css';

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

type BookFormProps = {
  book?: Book;
  onSave: (book: Partial<Book>) => void;
  onCancel: () => void;
};

export default function BookForm({ book, onSave, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    genre: book?.genre || '',
    publishedYear: book?.publishedYear || new Date().getFullYear(),
    isbn: book?.isbn || '',
    rating: book?.rating || 0,
    description: book?.description || '',
    coverUrl: book?.coverUrl || '',
    price: book?.price || 0,
    inStock: book?.inStock || true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const formStyles = css({
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    margin: '0 auto',
    border: '1px solid #e0e0e0',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  });

  const titleStyles = css({
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2c3e50',
    textAlign: 'center',
  });

  const formGridStyles = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  });

  const inputGroupStyles = css({
    marginBottom: '16px',
  });

  const fullWidthInputGroup = css({
    gridColumn: '1 / -1',
    marginBottom: '16px',
  });

  const labelStyles = css({
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#34495e',
  });

  const inputStyles = css({
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
    minWidth: '0',
    '&:focus': {
      outline: '2px solid #3498db',
      outlineOffset: '2px',
      borderColor: '#3498db',
    },
    '&:focus-visible': {
      outline: '2px solid #3498db',
      outlineOffset: '2px',
    },
    '&:invalid': {
      borderColor: '#e74c3c',
    },
    '&:invalid:focus': {
      outline: '2px solid #e74c3c',
      outlineOffset: '2px',
      borderColor: '#e74c3c',
    },
  });

  const textareaStyles = css({
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
    minWidth: '0',
    '&:focus': {
      outline: '2px solid #3498db',
      outlineOffset: '2px',
      borderColor: '#3498db',
    },
    '&:focus-visible': {
      outline: '2px solid #3498db',
      outlineOffset: '2px',
    },
    '&:invalid': {
      borderColor: '#e74c3c',
    },
    '&:invalid:focus': {
      outline: '2px solid #e74c3c',
      outlineOffset: '2px',
      borderColor: '#e74c3c',
    },
  });

  const checkboxStyles = css({
    marginRight: '8px',
    transform: 'scale(1.2)',
  });

  const buttonGroupStyles = css({
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '24px',
  });

  const saveButtonStyles = css({
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    minWidth: '44px',
    '&:hover': {
      backgroundColor: '#2ecc71',
    },
    '&:focus': {
      outline: '2px solid #27ae60',
      outlineOffset: '2px',
    },
    '&:focus-visible': {
      outline: '2px solid #27ae60',
      outlineOffset: '2px',
    },
    '&:disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
      opacity: '0.6',
    },
  });

  const cancelButtonStyles = css({
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    minWidth: '44px',
    '&:hover': {
      backgroundColor: '#7f8c8d',
    },
    '&:focus': {
      outline: '2px solid #95a5a6',
      outlineOffset: '2px',
    },
    '&:focus-visible': {
      outline: '2px solid #95a5a6',
      outlineOffset: '2px',
    },
  });

  const errorStyles = css({
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '4px',
    fontWeight: '500',
    display: 'block',
  });

  const srOnlyStyles = css({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    if (formData.price < 0) newErrors.price = 'Price must be positive';
    if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear() + 10) {
      newErrors.publishedYear = 'Please enter a valid publication year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Announce validation errors to screen readers
      const errorCount = Object.keys(errors).length;
      const announcement = `Form has ${errorCount} error${errorCount > 1 ? 's' : ''}. Please review and correct.`;
      
      // Create a temporary element for screen reader announcement
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
      
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className={formStyles}>
      <h2 id="modal-title" className={titleStyles}>
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className={formGridStyles}>
          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="title">Title *</label>
            <input
              ref={firstInputRef}
              className={inputStyles}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.title ? 'true' : 'false'}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className={errorStyles} role="alert">
                {errors.title}
              </span>
            )}
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="author">Author *</label>
            <input
              className={inputStyles}
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.author ? 'true' : 'false'}
              aria-describedby={errors.author ? 'author-error' : undefined}
            />
            {errors.author && (
              <span id="author-error" className={errorStyles} role="alert">
                {errors.author}
              </span>
            )}
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="genre">Genre</label>
            <input
              className={inputStyles}
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="publishedYear">Published Year</label>
            <input
              className={inputStyles}
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="isbn">ISBN</label>
            <input
              className={inputStyles}
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="rating">Rating (0-5)</label>
            <input
              className={inputStyles}
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="price">Price ($)</label>
            <input
              className={inputStyles}
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles} htmlFor="coverUrl">Cover URL</label>
            <input
              className={inputStyles}
              type="url"
              id="coverUrl"
              name="coverUrl"
              value={formData.coverUrl}
              onChange={handleChange}
            />
          </div>

          <div className={inputGroupStyles}>
            <label className={labelStyles}>
              <input
                className={checkboxStyles}
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>
          </div>

          <div className={fullWidthInputGroup}>
            <label className={labelStyles} htmlFor="description">Description</label>
            <textarea
              className={textareaStyles}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={buttonGroupStyles}>
          <button 
            type="submit" 
            className={saveButtonStyles}
            disabled={isSubmitting}
            aria-describedby="form-description"
          >
            {isSubmitting ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
          </button>
          <button 
            type="button" 
            className={cancelButtonStyles} 
            onClick={onCancel}
            aria-label="Cancel and close form"
          >
            Cancel
          </button>
        </div>
        
        <div id="form-description" className={srOnlyStyles}>
          {book ? 'Update the book information and click Update Book to save changes.' : 'Fill out all required fields and click Add Book to create a new book entry.'}
        </div>
      </form>
    </div>
  );
}