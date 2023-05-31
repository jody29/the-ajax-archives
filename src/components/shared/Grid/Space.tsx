import { BoxProps , chakra } from '@chakra-ui/react';
import { Children, cloneElement } from 'react';

const classnames = (...args: any[]) => args.join(' ');
const getClassName = (el: any) => (el.props && el.props.className) || '';

export function StyledChildren({ className, children }: { className?: string } & BoxProps) {
  const styledChildren = Children.toArray(children).map((child: any) =>
    cloneElement(child, {
      className: classnames(getClassName(child), className),
    }),
  );
  return <>{styledChildren}</>;
}

export const Space = chakra(StyledChildren);

Space.displayName = 'Space';
