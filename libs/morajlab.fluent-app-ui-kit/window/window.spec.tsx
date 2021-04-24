import React from 'react';
import { render } from '@testing-library/react';
import { BasicWindow } from './window.composition';

describe('window', () => {
  it('should render with the correct text', () => {
    const { getByText } = render(<BasicWindow />);
    const rendered = getByText('hello from Window');
    expect(rendered).toBeTruthy();
  });
});
