import { IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { Book, useDeleteBookMutation } from "../../generated/graphql";
import styles from "./card.module.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type BookCardProps = {
  book: Book;
};

export const BookCard: React.FC<BookCardProps> = (p) => {
  const [, deleteBook] = useDeleteBookMutation();
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className="card-body">
        <NextLink href="/book/[id]" as={`/book/${p.book.id}`}>
          <Link>
            <h2>{p.book.title}</h2>
          </Link>
        </NextLink>
        <p>{p.book.author?.slice(0, 50)}</p>
        {p.book.genre ? <p>Genre: {p.book.genre.slice(0, 50)}</p> : null}
        {p.book.rating ? <p>Rating: {p.book.rating}</p> : null}
        <IconButton
          icon={<DeleteIcon color="red" />}
          aria-label="Delete book"
          onClick={() => {
            deleteBook({ id: p.book.id });
          }}
        />
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit book"
          onClick={() => {
            router.push(`/book/edit/[${p.book.id}]`);
          }}
        />
      </div>
    </div>
  );
};
