import React from "react";
import moment from "moment";
import { merge, $ } from "glamor";
import { MessageOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { List, Avatar, Button, Badge } from "antd";

import { IRedditEntry } from "../hooks/entries";
import { palette } from "../styles/theme";
import { Spinner, IconText, DISMISS } from "../shared";

interface EntriesListProps {
  onClickEntry: (entry: any) => (e: any) => void;
  onRemoveFromEntry: (entryId: string) => void;
  onDisMissAll: () => void;
  isLoading: boolean;
  entries: IRedditEntry[];
}

export const EntriesList: React.FunctionComponent<EntriesListProps> = ({
  onClickEntry,
  onRemoveFromEntry,
  onDisMissAll,
  isLoading,
  entries,
}) => {
  const styles = React.useMemo(() => {
    return merge(
      { padding: 20 },
      $(" .ant-list-item-meta-title > a", {
        color: palette.green,
      }),
      $(" .icon", {
        color: palette.red,
      }),
      $(" .ant-space-align-center", {
        color: palette.gray,
      }),
      $(" .clickable", {
        cursor: "pointer",
      }),
      $(" .ant-pagination, .ant-list-footer, .ant-list-header", {
        textAlign: "center",
      }),
      $(" .ant-list-item-meta-description", {
        color: palette.lightGray,
        fontSize: 12,
      }),
      $(" .ant-list-item", {
        fontSize: 18,
        color: palette.white,
      })
    );
  }, []);

  const handleAction = React.useCallback(
    (action: any, entryId: string) => () => {
      if (action === DISMISS) {
        onRemoveFromEntry(entryId);
      }
    },
    [onRemoveFromEntry]
  );

  const handleRenderItem = React.useCallback(
    (redditEntry: IRedditEntry) => (
      <List.Item
        key={redditEntry.id}
        actions={[
          <IconText
            icon={MessageOutlined}
            text={redditEntry.num_comments}
            entryId={redditEntry.id}
            onActionClick={handleAction}
          />,
          <IconText
            icon={CloseCircleOutlined}
            text={DISMISS}
            entryId={redditEntry.id}
            onActionClick={handleAction}
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
              {!redditEntry.clicked && <Badge status="processing" />}
              {redditEntry.author}
            </a>
          }
          description={moment.unix(redditEntry.created).fromNow()}
        />
        <span className="clickable" onClick={onClickEntry(redditEntry)}>
          {redditEntry.title}
        </span>
      </List.Item>
    ),
    [handleAction, onClickEntry]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div {...styles}>
      <List
        itemLayout="vertical"
        dataSource={entries}
        header={<h2>Reddit Posts</h2>}
        renderItem={handleRenderItem}
        footer={
          <Button type="primary" onClick={onDisMissAll}>
            Dismiss All
          </Button>
        }
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};
