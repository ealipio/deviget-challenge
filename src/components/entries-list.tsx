import React from "react";
import { merge, $ } from "glamor";

import { List, Avatar, Spin } from "antd";

import { IRedditEntry } from "../hooks/entries";

interface EntriesListProps {
  onClickEntry: (entry: any) => (e: any) => void;
  isLoading: boolean;
  entries: IRedditEntry[];
}

export const EntriesList: React.FunctionComponent<EntriesListProps> = ({
  onClickEntry, isLoading, entries
}) => {


  const styles = React.useMemo(() => {
    return merge(
      { padding: 20 },
      $(" .ant-list-item-meta-title > a", {
        color: "#80ce1c",
      }),
      $(" .ant-list-item-meta-description", { color: "#fff" })
    );
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Spin size="large" />;
      </div>
    );
  }

  return (
    <div {...styles}>
      <List
        itemLayout="horizontal"
        dataSource={entries}
        renderItem={(item: IRedditEntry) => (
          <List.Item onClick={onClickEntry(item)}>
            <List.Item.Meta
              avatar={
                <Avatar src={item.thumbnail} />
              }
              title={<a href="https://www.reddit.com/dev/api">{item.author}</a>}
              description={item.title}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
