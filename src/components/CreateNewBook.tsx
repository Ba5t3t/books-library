import { Dispatch, SetStateAction, useState } from "react";

import { Button, type FormInstance } from "antd";

import { BookFormModal } from "./BookFormModal";
import { IBookCard } from "../components/BookCard";

import { createBook } from "../api/api";

interface Props {
  onCreateNewBook: (newBook: IBookCard) => void;
}

export const CreateNewBook: React.FC<Props> = ({ onCreateNewBook }) => {
  const [isCreateNewBookModalOpen, setIsCreateNewBookModalOpen] =
    useState(false);
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const handleCreateNewBook = async () => {
    try {
      const newBook = await formInstance?.validateFields();

      await createBook(newBook);

      onCreateNewBook(newBook);
      formInstance?.resetFields();
    } catch (error) {
      console.log("Error");
    } finally {
      setIsCreateNewBookModalOpen(false);
    }
  };

  return (
    <>
      <Button type='primary' onClick={() => setIsCreateNewBookModalOpen(true)}>
        New Book
      </Button>

      <BookFormModal
        setFormInstance={setFormInstance}
        onOk={handleCreateNewBook}
        open={isCreateNewBookModalOpen}
        title='Create a title'
        okText='Create'
        onCancel={() => setIsCreateNewBookModalOpen(false)}
        initialValues={{
          title: "",
          author: "",
          genre: "",
          year: 0,
          image: "",
        }}
      />
    </>
  );
};
