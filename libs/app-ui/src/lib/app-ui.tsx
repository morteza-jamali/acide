import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
    reiciendis iure consequatur, temporibus excepturi quisquam a dolores numquam
    dolore, explicabo consequuntur, amet quod soluta aut in perspiciatis? A,
    nisi cumque?
  </div>
);

export const RenderUI = (element: HTMLElement) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    element
  );
};
