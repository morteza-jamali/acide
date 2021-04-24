import React from 'react';
import { TitleBar, ITitleBarItemProps } from '.';

const items: ITitleBarItemProps[] = [
  {
    text: 'New',
    subMenuItems: [
      {
        text: 'First item',
      },
      {
        text: 'Second Item',
      },
      {
        text: 'Third Item',
      },
    ],
  },
  {
    text: 'File',
  },
  {
    text: 'Help',
  },
];

export const BasicTitlebar = () => {
  return <TitleBar items={items} />;
};
