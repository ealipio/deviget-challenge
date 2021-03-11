import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { merge, $ } from "glamor";

import { useFetchRedditEntries, IRedditEntry } from "../hooks/entries";
import { EntriesList } from "./entries-list";
import { SelectedEntry } from "./selected-entry";
import { SkeletonEntry } from "../shared/skeleton-entry";
import { palette } from "../styles/theme";

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
        color: palette.blue,
      }),
      $(" .site-layout .site-layout-background", {
        background: palette.white,
      }),
      $(" .content", {
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }),
      $(" .ant-layout-sider", {
        backgroundColor: palette.silver,
      })
    );
  }, []);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState<IRedditEntry>();
  const [entries, setEntries] = React.useState<IRedditEntry[]>([]);

  const { data, isLoading } = useFetchRedditEntries();

  const changeClickedStateFromEntries = React.useCallback(
    (entryId: string) => {
      const newEntries = entries.map((entry) => {
        if (entry.id === entryId) {
          const newEntry = { ...entry, clicked: true };
          return newEntry;
        }
        return entry;
      });
      setEntries(newEntries);
    },
    [entries]
  );

  const handleClickEntry = React.useCallback(
    (entry: IRedditEntry) => () => {
      setSelectedEntry(entry);
      // by default clicked is false
      if (!entry.clicked) {
        changeClickedStateFromEntries(entry.id);
      }
    },
    [changeClickedStateFromEntries]
  );

  React.useEffect(() => {
    if (data) {
      setEntries(data);
      setSelectedEntry(data[0]);
    }
  }, [data]);

  const handleRemoveEntry = React.useCallback(
    (entryId: string) => {
      const newEntries = entries.filter(
        (entry: IRedditEntry) => entry.id !== entryId
      );
      setEntries(newEntries);
    },
    [entries]
  );

  const handleDisMissAll = React.useCallback(() => {
    setEntries([]);
  }, []);

  return (
    <Layout {...styles} style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        collapsedWidth={0}
        width="50%"
      >
        <EntriesList
          onRemoveFromEntry={handleRemoveEntry}
          isLoading={isLoading}
          entries={entries}
          onClickEntry={handleClickEntry}
          onDisMissAll={handleDisMissAll}
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
          Reddit Client
        </Header>
        <Content className="site-layout-background content">
          {selectedEntry ? (
            <SelectedEntry entry={selectedEntry} />
          ) : (
            <SkeletonEntry />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
