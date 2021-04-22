import React, { useState } from "react";
import { IContextualMenuProps, IContextualMenuItem } from "@fluentui/react";
import { camelCase } from "camel-case";

export interface ICheckableContextualMenuItem
  extends Partial<IContextualMenuItem> {
  text: string;
}

export interface ICheckableContextualMenuProps
  extends Partial<IContextualMenuProps> {
  itemList: ICheckableContextualMenuItem[];
}

type onItemClickType = (
  state: any,
  setter: React.Dispatch<React.SetStateAction<any>>
) => IContextualMenuProps["onItemClick"];

const onItemClick: onItemClickType = (state, setter) => (_env, item) => {
  console.log(state);
  setter({ apple: true });
};

export const CheckableContextualMenu = (
  props: (() => ICheckableContextualMenuProps) | ICheckableContextualMenuProps
): IContextualMenuProps => {
  let _props: ICheckableContextualMenuProps =
    typeof props === "function" ? props() : props;
  const [listState, setListState] = useState({ apple: false });

  _props.onItemClick = onItemClick(listState, setListState);
  _props.items =
    _props.items ??
    _props.itemList.map((item) => {
      item.key = item.key ?? `${camelCase(item.text)}Key`;
      item.iconProps = {
        iconName: "CheckMark",
        styles: {
          root: {
            opacity: listState.apple ? 1 : 0,
          },
        },
      };

      return item as IContextualMenuItem;
    });

  return _props as IContextualMenuProps;
};
