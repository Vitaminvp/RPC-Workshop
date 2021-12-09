import { bootstrap, HttpClient } from '@wix/yoshi-flow-bm/test/serverless';
import { fetch, ID } from './comments.api';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

const serverlessApp = bootstrap();

describe('Products API', () => {
  serverlessApp.beforeAndAfter();
  it('should say hello', async () => {
    const mockComment = { text: 'test', author: 'test' };

    const client = new HttpClient({ baseURL: serverlessApp.getUrl() });

    const commentsStub =
      serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
    commentsStub.CommentsService().fetch.when(ID).resolve([mockComment]);

    const { data: response } = await client.request(fetch());
    expect(response).toEqual([expect.objectContaining(mockComment)]);
  });
});
