import { Layout, LayoutRoot } from '@/components/layout';

import { Resizable } from 're-resizable';
import { useRef } from 'react';

import { useSize } from 'ahooks';

export const LayoutDemo = () => {
  const div = useRef<HTMLDivElement>();

  const rootSize = useSize(div) ?? { width: 600, height: 800 };

  return (
    <Resizable defaultSize={rootSize}>
      <div ref={div} style={{ width: '100%', height: '100%', border: 'black thin solid' }}>
        <LayoutRoot
          {...{ w: 600, h: 800, maxScale: [1.2], minScale: [0.8], rootSize }}
          // {...{ w: 600, h: 800, maxScale: [1.2], minScale: [.8], }}
          bg="gray"
          pageProps={{
            bg: 'lightgray',
          }}
        >
          <Layout
            {...{ w: 300, h: 200, t: 100, l: 50 }}
            style={{
              backgroundColor: 'tomato',
            }}
          >
            内容块 1
          </Layout>

          <Layout
            {...{ w: 100, h: 50 }}
            l
            r
            t
            b
            style={{
              backgroundColor: 'pink',
            }}
          >
            内容块 2
          </Layout>

          <Layout
            {...{ w: 400, h: 100, b: 100, r: 50 }}
            style={{
              backgroundColor: 'steelblue',
            }}
          >
            内容块 3
          </Layout>
        </LayoutRoot>
      </div>
    </Resizable>
  );
};
