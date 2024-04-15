import { HeaderBar } from "./HeaderBar";
import { Flex, Layout } from "antd";
import { CSSProperties } from "react";
import { Books } from "./Books";
import { AuthProvider } from "./AuthContext";

const layoutStyle: CSSProperties = {
  borderRadius: "8px",
  width: "calc(100% - 8px)",
  maxWidth: "calc(100% - 8px)",
  backgroundColor: "black",
};

export const LibraryApp: React.FC = () => {
  return (
    <AuthProvider>
      <Flex>
        <Layout style={layoutStyle}>
          <HeaderBar />
          <Books />
        </Layout>
      </Flex>
    </AuthProvider>
  );
};
