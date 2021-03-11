import React from "react";
import moment from "moment";
import { merge, $ } from "glamor";
import { MessageOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { List, Avatar, Spin, Space } from "antd";

import { IRedditEntry } from "../hooks/entries";

interface EntriesListProps {
  onClickEntry: (entry: any) => (e: any) => void;
  onRemoveFromEntry: (entryId: string) => void;  
  isLoading: boolean;
  entries: IRedditEntry[];
}

interface IAction {
  icon: any;
  text: string | number;
  entryId: string;
}

const DISMISS = "dismiss post";

export const EntriesList: React.FunctionComponent<EntriesListProps> = ({
  onClickEntry,
  onRemoveFromEntry,
  isLoading,
  entries,
}) => {
  const styles = React.useMemo(() => {
    return merge(
      { padding: 20 },
      $(" .ant-list-item-meta-title > a", {
        color: "#80ce1c",
      }),
      $(" .icon", {
        color: "#F00",
      }),
      $(" .ant-space-align-center", {
        color: "#bbb",
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

  const handleAction = (action: any, entryId: string) => () => {
      if(action === DISMISS) {
          onRemoveFromEntry(entryId)
      }
  }

  const IconText = ({ icon, text, entryId }: IAction) => (
    <Space>
      {React.createElement(icon, {className:"icon", onClick: handleAction(text, entryId)})}
      {text}
    </Space>
  );
  
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
                entryId={redditEntry.id}
              />,
              <IconText
              icon={CloseCircleOutlined}
              text={DISMISS}
              entryId={redditEntry.id}
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
