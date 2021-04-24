import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import {
  TitleBar,
  ITitleBarItemProps,
  initializeIcons,
  Window,
} from '@acide/morajlab.fluent-app-ui-kit';

initializeIcons();

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

const App: FunctionComponent<{}> = () => (
  <>
    <TitleBar items={items}></TitleBar>
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
      reiciendis iure consequatur, temporibus excepturi quisquam a dolores
      numquam dolore, explicabo consequuntur, amet quod soluta aut in
      perspiciatis? A, nisi cumque?
    </div>
  </>
);

export const RenderUI = (element: HTMLElement) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    element
  );
};
