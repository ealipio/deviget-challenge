import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { merge, $ } from "glamor";

import { useFetchRedditEntries, IRedditEntry } from "../hooks/entries";

import { EntriesList } from "./entries-list";
import { SelectedEntry } from "./selected-entry";

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
      }),
      $(" .content", {
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }),
      $(" .sider", {
        backgroundColor: "#333",
      })
    );
  }, []);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState<IRedditEntry>();
  const [entries, setEntries] = React.useState<IRedditEntry[]>([]);

  const { data, isLoading } = useFetchRedditEntries();

  const handleClickEntry = (entry: any) => () => {
    setSelectedEntry(entry);
  };

  React.useEffect(() => {
    if(data) {
      setEntries(data)
    }
  }, [data])

  const handleRemoveEntry = (entryId: string) => {
    const newEntries = entries.filter((entry: IRedditEntry) => entry.id !== entryId)
    setEntries(newEntries);
  }

  return (
    <Layout {...styles} style={{ minHeight: "100vh" }}>
      <Sider
        className="sider"
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        collapsedWidth={0}
        width={400}
      >
        <EntriesList
          onRemoveFromEntry={handleRemoveEntry}
          isLoading={isLoading}
          entries={entries}
          onClickEntry={handleClickEntry}
        />
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
          Welcome to Reddit Client
        </Header>
        <Content className="site-layout-background content">
          {selectedEntry && <SelectedEntry entry={selectedEntry} />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
