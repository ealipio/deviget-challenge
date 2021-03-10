import React from "react";
import { merge, $ } from "glamor";

import { List, Avatar } from "antd";

interface EntriesListProps {
    onClickEntry: (entry: any) => (e: any) => void;
}

export const EntriesList: React.FunctionComponent<EntriesListProps> = ({onClickEntry}) => {
  const data = [
    {
      title: "Reddit Entry 1",
    },
    {
      title: "Reddit Entry 2",
    },
    {
      title: "Reddit Entry 3",
    },
    {
      title: "Reddit Entry 4",
    },
  ];

  const styles = React.useMemo(() => {
    return merge( 
        {padding: 20},
        $(' .ant-list-item-meta-title > a', {
            color: '#80ce1c'
        }),
        $(" .ant-list-item-meta-description", {color: "#fff"}));
  }, []);


  return (
    <div {...styles}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item onClick={onClickEntry(item)}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://www.reddit.com/dev/api">{item.title}</a>}
              description="Many endpoints on reddit use the same protocol for controlling pagination and filtering. These endpoints are called Listings and share five common parameters"
            />
          </List.Item>
        )}
      />
    </div>
  );
};
