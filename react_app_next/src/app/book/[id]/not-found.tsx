import Link from "next/link";
import { notFoundStyles } from "../../../styles/book-detail-styles";

export default function BookNotFound() {
  return (
    <div className={notFoundStyles.container}>
      <div className={notFoundStyles.icon}>📚</div>
      <h1 className={notFoundStyles.title}>Book Not Found</h1>
      <p className={notFoundStyles.message}>
        Sorry, we couldn't find the book you're looking for. It might have been
        removed or the ID might be incorrect.
      </p>
      <Link href="/" className={notFoundStyles.backButton}>
        ← Back to Bookstore
      </Link>
    </div>
  );
}
