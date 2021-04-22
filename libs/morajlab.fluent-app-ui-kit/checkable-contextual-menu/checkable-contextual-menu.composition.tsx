import React from "react";
import { DefaultButton, IContextualMenuProps } from "@fluentui/react";
import { useConst } from "@uifabric/react-hooks";
import {
  CheckableContextualMenu,
  ICheckableContextualMenuProps,
} from "./checkable-contextual-menu";

export const BasicCheckableContextualMenu = () => {
  const menuProps = useConst<IContextualMenuProps>(
    CheckableContextualMenu(
      (): ICheckableContextualMenuProps => ({
        shouldFocusOnMount: true,
        itemList: [
          {
            text: "New",
            onClick: () => console.log("New clicked"),
          },
          {
            text: "Rename",
            onClick: () => console.log("Rename clicked"),
          },
          {
            text: "Edit",
            onClick: () => console.log("Edit clicked"),
          },
          {
            text: "Properties",
            onClick: () => console.log("Properties clicked"),
          },
          {
            text: "Link same window",
          },
          {
            text: "Link new window",
          },
          {
            text: "Disabled item",
            disabled: true,
            onClick: () =>
              console.error("Disabled item should not be clickable."),
          },
        ],
      })
    )
  );

  return (
    <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
  );
};
