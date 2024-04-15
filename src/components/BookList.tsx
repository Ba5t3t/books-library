import { Dispatch, SetStateAction, useState } from "react";

import { BookCard } from "./BookCard";
import { IBookCard } from "../components/BookCard";

interface Props {
  books: IBookCard[];
  onDeleteBook: (bookdId: number) => void;
  checkedBooksToRemove: number[];
  onEditBook: (bookId: number, newBook: IBookCard) => void;
  onSelectBookToRemove: (bookId: number, isChecked: boolean) => void;
}

export const BookList: React.FC<Props> = ({
  books,
  onDeleteBook,
  checkedBooksToRemove,
  onSelectBookToRemove,
  onEditBook,
}) => {
  return (
    <>
      {books.map((book) => (
        <BookCard
          {...book}
          key={book.id}
          onDeleteBook={onDeleteBook}
          onEditBook={onEditBook}
          isCheckedToRemove={checkedBooksToRemove.includes(book.id)}
          onSelectBookToRemove={onSelectBookToRemove}
        />
      ))}
    </>
  );
};
