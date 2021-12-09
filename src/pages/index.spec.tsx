import React from 'react';
import { render } from '@testing-library/react';
import { TextTestkit } from 'wix-style-react/dist/testkit';
import { testkit } from '@wix/yoshi-flow-bm/testkit';
import Index from './index';
import { fetch } from '../api/comments.api';

describe('index', () => {
  testkit.beforeAndAfter();

  it('renders a title correctly', async () => {
    const { TestComponent } = testkit.getBMComponent(Index, {
      mocks: [
        {
          request: { method: fetch, args: [] },
          result: () => {
            return [
              {
                text: 'first comment',
                author: 'Best author',
              },
            ];
          },
        },
      ] as any,
    });

    const { baseElement, findByTestId } = render(<TestComponent />);

    await findByTestId('app-title');

    const pageHeaderTestkit = TextTestkit({
      wrapper: baseElement,
      dataHook: 'get-started',
    });

    expect(await pageHeaderTestkit.exists()).toBeTruthy();
  });
});
