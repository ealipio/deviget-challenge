import React from "react";
import { Space } from 'antd';

export const DISMISS = "dismiss post";

interface IconTextProps {
    icon: any;
    text: number | string;
    entryId: string;
    onActionClick: (text: any, entryId: string) => (e: any) => void;
  }

export const IconText: React.FunctionComponent<IconTextProps> = ({icon, text, entryId, onActionClick}) => {
  return (
    <Space>
      {React.createElement(icon, {
        className: "icon",
        onClick: onActionClick(text, entryId),
      })}
      {text === DISMISS ? <span className="clickable" onClick={onActionClick(text, entryId)}>{text}</span>: text}
    </Space>

  );
};
