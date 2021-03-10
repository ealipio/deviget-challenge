import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { merge, $ } from "glamor";

const { Header, Sider, Content } = Layout;

function App() {
  const styles = React.useMemo(() => {
    return merge(
      $(" .trigger", {
        padding: "0 24px",
        fontSize: 18,
        cursor: "pointer",
        transition: "color 0.3s",
      }),
      $(" .trigger:hover", {
        color: "#1890ff",
      }),
      $(" .site-layout .site-layout-background", {
        background: "#fff",
      })
    );
  }, []);

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Layout {...styles} style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={isCollapsed} collapsedWidth={0} width={400}>
        <div>Hello</div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setIsCollapsed(!isCollapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
