import { NextPage, NextPageContext } from 'next';

import { ErrorPage } from '@/components/templates';

export interface ErrorProps {
  statusCode?: number | null;
}

const MyError: NextPage<ErrorProps> = props => <ErrorPage {...props} />;

MyError.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default MyError;
