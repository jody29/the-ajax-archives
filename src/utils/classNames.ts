export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;

export interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

export interface ClassArray extends Array<ClassValue> {}

const hasOwn = {}.hasOwnProperty;

export function classNames(...args: ClassValue[]): string {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classNames(arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const key in arg as any) {
          if (hasOwn.call(arg, key) && (arg as any)[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
