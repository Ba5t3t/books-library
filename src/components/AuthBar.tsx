import { Button } from "antd";
import { useAuth } from "./AuthContext";
import { LoginForm } from "./LoginForm";

export const AuthBar = () => {
  const { user, logout } = useAuth();

  return user ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 7,
      }}
    >
      Welcome, {user.username}!<Button onClick={logout}>Logout</Button>
    </div>
  ) : (
    <LoginForm />
  );
};
