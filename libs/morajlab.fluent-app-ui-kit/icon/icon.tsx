import React, { HTMLAttributes, FunctionComponent } from 'react';
import { Icon as _Icon } from '@fluentui/react';

export { initializeIcons } from '@uifabric/icons';

export interface IIconProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const Icon: FunctionComponent<IIconProps> = ({ name, ...rest }) => (
  <_Icon iconName={name} {...rest} />
);
