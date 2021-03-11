import React from "react";
import { merge, $ } from "glamor";

import { IRedditEntry } from "../hooks/entries";
interface SelectedEntryProps {
    entry: IRedditEntry
}

export const SelectedEntry: React.FunctionComponent<SelectedEntryProps> = ({entry}) => {
  const styles = React.useMemo(() => {
    return merge( 
        {},
        $(" .ant-list-item-meta-description", {color: "#fff"}));
  }, []);


  return (
    <div {...styles}>
        <img src={entry.thumbnail} alt="reddit"/>
        {entry.title}
    </div>
  );
};
