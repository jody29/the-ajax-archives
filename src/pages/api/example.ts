import { NextApiHandler } from 'next';

const handle: NextApiHandler = (_req, res) => {
  res.end('Hello World');
};

export default handle;
