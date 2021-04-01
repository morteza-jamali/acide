import React from "react";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";

export interface ITitleBarProps {
  items: ICommandBarItemProps[];
  farItems?: ICommandBarItemProps[];
}

export const TitleBar: React.FunctionComponent<ITitleBarProps> = ({
  items,
  farItems,
}) => <CommandBar items={items} farItems={farItems} />;
