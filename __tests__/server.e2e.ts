import { bootstrap } from 'yoshi-serverless-testing';
import HttpClient from 'yoshi-serverless-client';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';
import { fetch, ID } from '../src/api/comments.api';

const serverlessApp = bootstrap();

let client: HttpClient;

beforeAll(async () => {
  await serverlessApp.start();
  client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
});

test('fetch method should return comments', async () => {
  const mockComment = aComment().build();

  const commentsStub =
    serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
  commentsStub.CommentsService().fetch.when(ID).resolve([mockComment]);

  const response = await client.request(fetch());
  expect(response).toEqual([mockComment]);
});
