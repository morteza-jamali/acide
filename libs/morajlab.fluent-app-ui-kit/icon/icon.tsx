import React from "react";
import { Icon as _Icon } from "@fluentui/react";

export { initializeIcons } from "@uifabric/icons";

export interface IIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const Icon: React.FunctionComponent<IIconProps> = ({
  name,
  ...rest
}) => <_Icon iconName={name} {...rest} />;
