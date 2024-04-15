import React from "react";

import { Modal } from "antd";

import { IBookCard } from "./BookCard";
import { EditableBookForm } from "./EditableBookForm";

interface BookFormModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  title: string;
  okText: string;
  initialValues: Omit<IBookCard, "id">;
  setFormInstance: (instance: any) => void;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  open,
  onCancel,
  initialValues,
  title,
  okText,
  onOk,
  setFormInstance,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      okText={okText}
      cancelText='Cancel'
      onCancel={onCancel}
      destroyOnClose
      onOk={onOk}
    >
      <EditableBookForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};
