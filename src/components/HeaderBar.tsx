import { CSSProperties } from "react";
import { Layout } from "antd";
import { AuthBar } from "./AuthBar";

const { Header } = Layout;

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "40px",
  marginBottom: "20px",
  padding: "40px",
  backgroundColor: "#4a5662",
  fontSize: "30px",
  color: "white",
  borderRadius: "10px",
};

export const HeaderBar: React.FC = () => {
  return (
    <Header style={headerStyle}>
      <div>Library</div>
      <AuthBar />
    </Header>
  );
};
