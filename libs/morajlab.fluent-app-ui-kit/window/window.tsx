import React, { HTMLAttributes, FunctionComponent } from 'react';
import Draggable from 'react-draggable';

export interface IWindowProps extends HTMLAttributes<HTMLDivElement> {}

export const Window: FunctionComponent<IWindowProps> = ({}) => {
  return (
    <Draggable
      axis="x"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
    >
      <div>
        <div className="handle">Drag from here</div>
        <div>This readme is really dragging on...</div>
      </div>
    </Draggable>
  );
};
