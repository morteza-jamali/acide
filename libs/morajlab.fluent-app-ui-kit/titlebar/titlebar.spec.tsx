import React from 'react';
import { render } from '@testing-library/react';
import { BasicTitlebar } from './titlebar.composition';

describe('titlebar', () => {

  it('should render with the correct text', () => {
    const { getByText } = render(<BasicTitlebar />);
    const rendered = getByText('hello from Titlebar');
    expect(rendered).toBeTruthy();
  });

})