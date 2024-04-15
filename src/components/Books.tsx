import { useEffect, useState } from "react";

import { IBookCard } from "../components/BookCard";
import { Button, Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BookList } from "./BookList";
import { CreateNewBook } from "./CreateNewBook";
import { deleteBooks, getBooks } from "../api/api";

export const Books = () => {
  const [books, setBooks] = useState<IBookCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedBooksToRemove, setCheckedBooksToRemove] = useState<number[]>(
    []
  );

  const onSelectBookToRemove = (bookId: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedBooksToRemove((prev) => prev.filter((id) => bookId !== id));
    } else {
      setCheckedBooksToRemove((prev) => [...prev, bookId]);
    }
  };

  const onDeleteBook = (bookId: number) => {
    setBooks((prev) => prev.filter((book) => bookId !== book.id));
  };

  const onEditBook = (bookId: number, newBook: IBookCard) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (bookId === book.id) {
          return newBook;
        } else {
          return book;
        }
      })
    );
  };

  const handleDeleteBooks = async () => {
    try {
      await deleteBooks(checkedBooksToRemove);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => !checkedBooksToRemove.includes(book.id))
      );
      setCheckedBooksToRemove([]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onCreateNewBook = (newBook: IBookCard) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    getBooks().then((res) => setBooks(res));
  }, []);

  return (
    <>
      <Flex
        wrap='wrap'
        gap='20px'
        align='flex-start'
        justify='space-evenly'
        style={{ backgroundColor: "black", padding: "20px" }}
      >
        <CreateNewBook onCreateNewBook={onCreateNewBook} />

        <Button danger icon={<DeleteOutlined />} onClick={handleDeleteBooks}>
          Delete selected books
        </Button>
      </Flex>

      <Flex
        wrap='wrap'
        gap='20px'
        align='flex-start'
        justify='space-evenly'
        style={{ backgroundColor: "black", padding: "20px" }}
      >
        <BookList
          onEditBook={onEditBook}
          books={books}
          onDeleteBook={onDeleteBook}
          checkedBooksToRemove={checkedBooksToRemove}
          onSelectBookToRemove={onSelectBookToRemove}
        />
      </Flex>
    </>
  );
};
