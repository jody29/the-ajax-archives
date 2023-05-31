import styled from '@emotion/styled';

interface RteProps {
  children: string;
}

const StyledRte = styled.div`
  h1 {
  }

  h2 {
  }

  h3 {
  }

  p {
  }

  a {
  }

  ul {
  }

  li {
  }
`;

export function Rte({ children }: RteProps) {
  return <StyledRte dangerouslySetInnerHTML={{ __html: children }} />;
}
