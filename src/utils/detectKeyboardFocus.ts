import { isBrowser } from './isBrowser';

export const KEYBOARD_FOCUSED = 'has--keyboard-focus';
const TAB_KEYS = ['Tab', 9];

const detectKeyboardFocus = () => {
  let keyDown = false;

  if (!isBrowser) return;
  document.addEventListener('keydown', event => handleKey(true, event), true);
  document.addEventListener('keyup', () => handleKey(false), true);
  document.addEventListener('mouseleave', () => handleKey(false));
  document.addEventListener('focus', () => handleFocus(), true);
  document.addEventListener('blur', () => handleBlur(), true);

  const handleKey = (pressed: boolean, event?: KeyboardEvent) => {
    const key = event ? event.key || event.keyCode : undefined;

    if (event && key && TAB_KEYS.indexOf(key) === -1) return;

    keyDown = pressed;
  };

  const handleFocus = () => {
    if (keyDown) document.body.classList.add(KEYBOARD_FOCUSED);
  };

  const handleBlur = () => {
    document.body.classList.remove(KEYBOARD_FOCUSED);
  };
};

export default detectKeyboardFocus();
