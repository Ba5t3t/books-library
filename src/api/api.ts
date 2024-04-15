import axios from "axios";
import { IBookCard } from "../components/BookCard";

const API_URL_BOOKS = __API__ + "/books";
const API_URL_LOGIN = __API__ + "/login";

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(API_URL_LOGIN, {
      username,
      password,
    });
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const getBooks = async () => {
  try {
    const { data } = await axios.get<{ books: IBookCard[] }>(API_URL_BOOKS);
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const createBook = async (newBook: IBookCard) => {
  try {
    const { data } = await axios.post<IBookCard>(API_URL_BOOKS, newBook);
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const editBook = async (
  bookId: number,
  updatedFields: Partial<IBookCard>
) => {
  try {
    const { data } = await axios.put<IBookCard>(
      `${API_URL_BOOKS}/${bookId}`,
      updatedFields
    );

    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const deleteBook = async (bookId: number) => {
  try {
    await axios.delete(`${API_URL_BOOKS}/${bookId}`);
  } catch (error: any) {
    return error.message;
  }
};

export const deleteBooks = async (booksIds: number[]) => {
  try {
    await Promise.all(
      booksIds.map(async (bookId) => {
        await axios.delete(`${API_URL_BOOKS}/${bookId}`);
      })
    );
  } catch (error: any) {
    return error.message;
  }
};
