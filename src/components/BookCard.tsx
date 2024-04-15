import { useState } from "react";

import { Button, Space, Card, Checkbox, type FormInstance } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";

import { deleteBook, editBook } from "../api/api";

import { BookFormModal } from "./BookFormModal";

export interface IBookCard {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  image: string;
}

export interface Props extends IBookCard {
  isCheckedToRemove: boolean;
  onDeleteBook: (bookId: number) => void;
  onEditBook: (bookId: number, newBook: IBookCard) => void;
  onSelectBookToRemove: (bookId: number, isChecked: boolean) => void;
}

export const BookCard: React.FC<Props> = ({
  onDeleteBook,
  onEditBook,
  isCheckedToRemove,
  onSelectBookToRemove,
  id,
  ...bookProps
}) => {
  const { title, author, genre, year, image } = bookProps;

  const [isEditBookOpenModal, setIsEditBookOpenModal] = useState(false);
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    onSelectBookToRemove(id, isCheckedToRemove);
  };

  const handleEditBook = async () => {
    setIsEditBookOpenModal(true);
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      onDeleteBook(id);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmitEditBookModal = async () => {
    try {
      const formValues = formInstance?.getFieldsValue();
      const newBook = { ...formValues, id };

      await editBook(id, newBook);

      formInstance?.resetFields();

      onEditBook(id, newBook);
    } catch (error) {
      console.log("Failed:", error);
    } finally {
      setIsEditBookOpenModal(false);
    }
  };

  return (
    <>
      <Card
        title={title}
        bordered={false}
        style={{
          width: 250,
          height: 500,
          backgroundColor: "rgb(157 168 178)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Space direction='vertical' style={{ alignItems: "center" }} size={7}>
          <Checkbox checked={isCheckedToRemove} onChange={handleCheckboxChange}>
            Select to remove
          </Checkbox>

          <div
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                className='movie-image'
                src={image}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Author: {author}
          </span>
          <span>Genre: {genre}</span>
          <span>Publication year: {year}</span>

          <Button
            icon={<EditOutlined />}
            style={{ width: "200px", textAlign: "center" }}
            onClick={handleEditBook}
          >
            Edit book entries
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            style={{ width: "200px", textAlign: "center" }}
            onClick={handleDeleteBook}
          >
            Delete this book
          </Button>
        </Space>
      </Card>

      {isEditBookOpenModal && (
        <BookFormModal
          initialValues={bookProps}
          onCancel={() => setIsEditBookOpenModal(false)}
          open={isEditBookOpenModal}
          okText='Save'
          title='Edit book'
          onOk={onSubmitEditBookModal}
          setFormInstance={setFormInstance}
        />
      )}
    </>
  );
};
