import React from "react";
import { Titlebar } from "./titlebar";
import type { ITitleBarItemProps } from "./titlebar";

const items: ITitleBarItemProps[] = [
  {
    text: "New",
    subMenuItems: [
      {
        text: "First item",
      },
      {
        text: "Second Item",
      },
      {
        text: "Third Item",
      },
    ],
  },
  {
    text: "File",
  },
  {
    text: "Help",
  },
];

export const BasicTitlebar = () => {
  return <Titlebar items={items} />;
};
