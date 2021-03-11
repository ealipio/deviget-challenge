import React from "react";
import moment from "moment";
import { merge, $ } from "glamor";
import { MessageOutlined } from "@ant-design/icons";

import { List, Avatar, Spin, Space } from "antd";

import { IRedditEntry } from "../hooks/entries";

interface EntriesListProps {
  onClickEntry: (entry: any) => (e: any) => void;
  isLoading: boolean;
  entries: IRedditEntry[];
}

interface IAction {
  icon: any;
  text: string | number;
}

const IconText = ({ icon, text }: IAction) => (
  <Space>
    {React.createElement(icon, {
      onClick: () => {
        console.log("holis");
      },
    })}
    {text}
  </Space>
);

export const EntriesList: React.FunctionComponent<EntriesListProps> = ({
  onClickEntry,
  isLoading,
  entries,
}) => {
  const styles = React.useMemo(() => {
    return merge(
      { padding: 20 },
      $(" .ant-list-item-meta-title > a", {
        color: "#80ce1c",
      }),
      $(" .ant-space-align-center", {
        color: "#F0F",
      }),
      $(" .content", {
        cursor: 'pointer',
      }),
      $(" .ant-list-item-meta-description", { color: "#ddd", fontSize: 12 }),
      $(" .ant-list-item", {
        fontSize: 18,
        color: "#FFF",
      })
    );
  }, []);

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      />
    );
  }

  return (
    <div {...styles}>
      <List
        itemLayout="vertical"
        dataSource={entries}
        renderItem={(redditEntry: IRedditEntry) => (
          <List.Item
            key={redditEntry.id}
            actions={[
              <IconText
                icon={MessageOutlined}
                text={redditEntry.num_comments}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={redditEntry.thumbnail} />}
              title={
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.reddit.com/user/${redditEntry.author}`}
                >
                  {redditEntry.author}
                </a>
              }
              description={moment.unix(redditEntry.created).fromNow()}
            />
            <span className="content" onClick={onClickEntry(redditEntry)}>{redditEntry.title}</span>
          </List.Item>
        )}
      />
    </div>
  );
};
