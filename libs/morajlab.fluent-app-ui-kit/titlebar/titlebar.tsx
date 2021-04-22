import React from "react";
import {
  CommandBar,
  IButtonStyles,
  ICommandBarItemProps,
  IContextualMenuItem,
  ICommandBarStyles,
  IIconStyles,
  IContextualMenuProps,
} from "@fluentui/react";
import { camelCase } from "camel-case";

const titleBarDefaultStyle: ICommandBarStyles = {
  root: {
    backgroundColor: "rgb(51, 51, 51)",
    padding: 0,
    "& button, & a": {
      backgroundColor: "inherit",
    },
    "& i, & button, & a": {
      color: "rgb(204, 204, 204)",
    },
  },
};

export interface ITitleBarItem extends Partial<IContextualMenuItem> {
  text: string;
}

export interface ITitleBarItemProps extends Partial<ICommandBarItemProps> {
  text: string;
  subMenuItems?: ITitleBarItem[];
}

export interface ITitleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ITitleBarItemProps[];
}

const fixSubMenuItemProps = (items: ITitleBarItem[]): IContextualMenuItem[] => {
  if (!items) {
    return items as IContextualMenuItem[];
  }

  return items.map((item) => {
    item.key = `${camelCase(item.text)}Key`;
    item.iconProps = { iconName: "CheckMark" };

    return item as IContextualMenuItem;
  }) as IContextualMenuItem[];
};

const fixSubMenuProps = (item: ITitleBarItemProps): IContextualMenuProps => {
  let subMenuItems: IContextualMenuItem[] = fixSubMenuItemProps(
    item.subMenuItems
  );

  if (subMenuItems) {
    if (!item.subMenuProps) {
      item.subMenuProps = { items: [] };
    }

    item.subMenuProps.items = subMenuItems;
    item.subMenuProps.className = `${
      item.subMenuProps.className ?? ""
    } subMenuContainer`.trim();
  }

  return item.subMenuProps;
};

const fixItemProps = (items: ITitleBarItemProps[]): ICommandBarItemProps[] =>
  items.map((item) => {
    item.key = item.key ?? `${item.text}Key`;
    item.cacheKey = item.cacheKey ?? `${item.text}CacheKey`;
    item.subMenuProps = fixSubMenuProps(item);
    item.buttonStyles = item.buttonStyles ?? getButtonStyle();

    return item as ICommandBarItemProps;
  });

const getButtonStyle = (): IButtonStyles => {
  let style: IButtonStyles = {
    menuIcon: { display: "none" },
  };

  let sameRootProps: string[] = [
    "rootHovered",
    "rootFocused",
    "rootExpandedHovered",
    "rootPressed",
  ];

  sameRootProps.forEach((prop) => {
    style[prop] = {
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "rgb(204, 204, 204)",
    };
  });

  return style;
};

const farItemsIconsDefaultStyle: IIconStyles = {
  root: {
    color: "rgb(204, 204, 204) !important",
  },
};

const farItems: ICommandBarItemProps[] = [
  {
    key: "minimizeKey",
    text: "Minimize",
    ariaLabel: "Minimize",
    iconOnly: true,
    iconProps: {
      iconName: "ChromeMinimize",
      styles: farItemsIconsDefaultStyle,
    },
    buttonStyles: getButtonStyle(),
  },
  {
    key: "maximizeKey",
    text: "Maximize",
    ariaLabel: "Maximize",
    iconOnly: true,
    iconProps: {
      iconName: "ArrangeBringForward",
      styles: farItemsIconsDefaultStyle,
    },
    buttonStyles: getButtonStyle(),
  },
  {
    key: "closeKey",
    text: "Close",
    ariaLabel: "Close",
    iconOnly: true,
    iconProps: { iconName: "ChromeClose", styles: farItemsIconsDefaultStyle },
    buttonStyles: {
      rootHovered: {
        backgroundColor: "red",
      },
    },
  },
];

export const Titlebar: React.FunctionComponent<ITitleBarProps> = ({
  items,
  ...rest
}) => (
  <CommandBar
    items={fixItemProps(items)}
    farItems={farItems}
    {...rest}
    styles={titleBarDefaultStyle}
  />
);
