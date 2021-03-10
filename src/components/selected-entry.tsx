import React from "react";
import { merge, $ } from "glamor";

interface SelectedEntryProps {
    entry: any
}

export const SelectedEntry: React.FunctionComponent<SelectedEntryProps> = ({entry}) => {
  const styles = React.useMemo(() => {
    return merge( 
        {},
        $(" .ant-list-item-meta-description", {color: "#fff"}));
  }, []);


  return (
    <div {...styles}>
        {entry.title}
    </div>
  );
};
