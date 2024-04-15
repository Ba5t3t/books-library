import React, { useEffect } from "react";
import { Form, Input, type FormInstance } from "antd";
import { IBookCard } from "./BookCard";

interface BookCreateFormProps {
  initialValues: Omit<IBookCard, "id">;
  onFormInstanceReady: (instance: FormInstance<IBookCard>) => void;
}

export const EditableBookForm: React.FC<BookCreateFormProps> = ({
  initialValues,
  onFormInstanceReady,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  return (
    <Form
      layout='vertical'
      form={form}
      name='form'
      initialValues={initialValues}
    >
      <Form.Item
        name='title'
        label='Title'
        rules={[{ required: true, message: "Please input the title of book!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='image' rules={[{ required: true }]} label='Image link'>
        <Input type='textarea' />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name='author' label='Author'>
        <Input type='textarea' />
      </Form.Item>

      <Form.Item rules={[{ required: true }]} name='genre' label='Genre'>
        <Input type='textarea' />
      </Form.Item>

      <Form.Item rules={[{ required: true }]} name='year' label='Year'>
        <Input type='textarea' />
      </Form.Item>
    </Form>
  );
};
