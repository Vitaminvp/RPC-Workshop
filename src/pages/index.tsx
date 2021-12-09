import React, { FC, useEffect, useState } from 'react';
import {
  useTranslation,
  useAppLoaded,
  useRequest,
  useHttpClient,
} from '@wix/yoshi-flow-bm';
import {
  Page,
  Layout,
  Cell,
  Card,
  Text,
  Button,
  Input,
  Box,
  FormField,
} from 'wix-style-react';
import { fetch, add } from '../api/comments.api';

const Index: FC = () => {
  const { loading, data } = useRequest(fetch());

  const [comments, setComments] = useState(data);

  useEffect(() => {
    setComments(data);
  }, [data]);

  const client = useHttpClient();

  useAppLoaded({ auto: true });

  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const { t } = useTranslation();

  const handleClick = async () => {
    if (!text || !author) {
      return;
    }

    await client.request(add(text, author));

    setComments((state: any) => [...state, { text, author }]);

    setText('');
    setAuthor('');
  };

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Layout>
          <Cell span={6}>
            <Card>
              <Card.Content>
                <Text dataHook="get-started">
                  {loading ? (
                    <div>Loading ...</div>
                  ) : (
                    comments?.map((e, i) => {
                      return (
                        <li key={i}>
                          {e.text} - {e.author}
                        </li>
                      );
                    })
                  )}
                </Text>
              </Card.Content>
            </Card>
          </Cell>
          <Cell span={6}>
            <Card>
              <Card.Content>
                <FormField label="Text">
                  <Input
                    value={text}
                    onChange={({ target: { value } }) => setText(value)}
                  />
                </FormField>
                <Box height="20px" />
                <FormField label="Author">
                  <Input
                    value={author}
                    onChange={({ target: { value } }) => setAuthor(value)}
                  />
                </FormField>
                <Box height="20px" />
                <Button onClick={handleClick}>Add + </Button>
              </Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
