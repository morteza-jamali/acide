import { HTMLAttributes, FunctionComponent } from 'react';

export interface IIndexProps extends HTMLAttributes<HTMLDivElement> {}

const Index: FunctionComponent<IIndexProps> = () => <div>This is for test</div>;

export default Index;
