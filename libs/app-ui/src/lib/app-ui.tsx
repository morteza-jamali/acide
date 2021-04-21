import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>File name</div>;

export const RenderUI = (element: HTMLElement) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    element
  );
};
