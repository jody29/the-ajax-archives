/**
 * @jest-environment jsdom
 */
import { render } from '@test/utils';

import { Label } from './Label';

test('it renders', () => {
  render(<Label>This is a label</Label>);
});
