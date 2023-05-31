/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Image } from './Image';

test('it renders', () => {
  render(
    <Image
      src="https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
      alt="Cat"></Image>,
  );
});
