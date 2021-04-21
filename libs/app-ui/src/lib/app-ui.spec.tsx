import React from 'react';
import { render } from '@testing-library/react';

import AppUi from './app-ui';

describe('AppUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppUi />);
    expect(baseElement).toBeTruthy();
  });
});
