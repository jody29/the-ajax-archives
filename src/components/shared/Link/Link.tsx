import { default as NextLink, LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { Children, cloneElement } from 'react';

export const Link = NextLink;

type NavLinkProps = LinkProps & {
  activeClassName?: string;
  exact?: boolean;
  render?: (isActive: boolean) => any;
  children?: React.ReactElement;
};

export function NavLink({
  children,
  href,
  exact,
  activeClassName = 'active',
  render,
  ...otherProps
}: NavLinkProps) {
  const router = useRouter();
  const child = children && Children.only(children);

  const routerPath = router.asPath ? router.asPath : router.pathname;
  const match = router.asPath ? otherProps.as || href : href;

  const condition = exact
    ? Boolean(routerPath === match)
    : Boolean(routerPath.startsWith(String(match)));

  const className = condition ? activeClassName : undefined;

  return (
    <Link href={href} {...otherProps}>
      {render
        ? render(condition)
        : child && cloneElement(child, { className: [child.props.className, className].join(' ') })}
    </Link>
  );
}
