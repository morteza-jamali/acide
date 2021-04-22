import React from 'react';
import { render } from '@testing-library/react';
import { BasicCheckableContextualMenu } from './checkable-contextual-menu.composition';

describe('checkable-contextual-menu', () => {

  it('should render with the correct text', () => {
    const { getByText } = render(<BasicCheckableContextualMenu />);
    const rendered = getByText('hello from CheckableContextualMenu');
    expect(rendered).toBeTruthy();
  });

})