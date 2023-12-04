import { Book } from "../../generated/graphql";
import styles from "./card.module.css";

type BookCardProps = {
  book: Book;
};

export const BookCard: React.FC<BookCardProps> = (p) => {
  return (
    <div className={styles.card}>
      <div className="card-body">
        <h2>{p.book.title?.slice(0, 50)}</h2>
        <p>{p.book.author?.slice(0, 50)}</p>
        {p.book.genre ? <p>Genre: {p.book.genre.slice(0, 50)}</p> : null}
        {p.book.rating ? <p>Rating: {p.book.rating}</p> : null}
      </div>
    </div>
  );
};
