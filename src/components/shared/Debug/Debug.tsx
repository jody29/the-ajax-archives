import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const Code = styled.code`
  font-size: 16px;
`;

const Pre = styled.pre`
  background: #fbfbfb;
  border: 1px solid #cecece;
  border-radius: 8px;
  display: inline-block;
  padding: 10px 13px;
  max-width: 100%;
  overflow: auto;
`;

export function Debug({ children }: PropsWithChildren<unknown>) {
  return (
    <Pre>
      <Code>{JSON.stringify(children, undefined, 2)}</Code>
    </Pre>
  );
}
