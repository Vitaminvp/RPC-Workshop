import { method } from '@wix/yoshi-flow-bm/serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

export const ID = '1e6b4eb2-c684-47f7-a5a3-30f038757210';

export const fetch = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();

  return commentsService(this.context.aspects).fetch(ID);
});

export const add = method(function (text: string, author: string) {
  const commentsService = NodeWorkshopScalaApp().CommentsService();

  return commentsService(this.context.aspects).add(ID, {
    author,
    text,
  });
});
