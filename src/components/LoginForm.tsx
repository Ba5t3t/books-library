import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useAuth } from "./AuthContext";

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: { username: string; password: string }) => {
    login(values.username, values.password);
  };

  const isDisabled =
    !clientReady ||
    !!form.getFieldsError().filter(({ errors }) => errors.length).length;

  return (
    <Form
      form={form}
      name='horizontal_login'
      layout='inline'
      onFinish={onFinish}
      initialValues={{ username: "admin", password: "123" }}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button type='primary' htmlType='submit' disabled={isDisabled}>
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
