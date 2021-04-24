import React, { HTMLAttributes, FunctionComponent } from 'react';

export interface IWindowProps extends HTMLAttributes<HTMLDivElement> {}

export const Window: FunctionComponent<IWindowProps> = ({}) => {
  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
      consequuntur, repudiandae molestias pariatur nesciunt iusto dignissimos,
      mollitia, velit quas cumque sequi deleniti nulla non natus corrupti
      repellendus soluta officia nisi!
    </div>
  );
};
