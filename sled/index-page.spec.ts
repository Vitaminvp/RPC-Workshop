/// <reference types="@wix/sled-test-runner" />
// ⚠️ Remember:
// 1. Ensure your application is ready (fully loaded, interactive and finished animations) before you're starting to perform actions / take screenshots
// 2. Each spec file running 3 times in parallel!
import { Page } from 'puppeteer';
import { injectBMOverrides } from '@wix/yoshi-flow-bm/sled';
import { TextTestkit } from 'wix-style-react/dist/testkit/puppeteer';
import { ID } from '../src/api/comments.api';

describe('happy flow', () => {
  let _page: Page;

  beforeEach(async () => {
    const { page } = await sled.newPage({
      authType: 'free-user',
    });

    _page = page;

    await injectBMOverrides({
      page,
      appConfig: require('../target/module-sled.merged.json'),
    });

    const bmUrl = `https://www.wix.com/dashboard/${ID}/cc-2-2021-ambassador`;

    await _page.goto(bmUrl);
  });

  it('should render dashboard home for authenticated user', async () => {
    const textTestkit = await TextTestkit({
      page: _page,
      dataHook: 'get-started',
    });

    const text = await textTestkit.getText();
    expect(text).toMatch(/WLzxZYFByk - uCRenoxaiP/);
  });
});
