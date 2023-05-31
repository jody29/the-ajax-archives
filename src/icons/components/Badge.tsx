import { chakra } from '@chakra-ui/react';
import { forwardRef, SVGProps } from 'react';
interface CustomIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}
const SVGIcon = forwardRef<SVGSVGElement, CustomIconProps>(({ size, ...props }, svgRef) => {
  if (size) {
    props.width = size;
    props.height = size;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={19}
      viewBox="0 0 21 19"
      ref={svgRef}
      {...props}
    >
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.875 9.655h3.75m-3.75 3.76h3.75M5.692 3.387h-3.8c-.7 0-1.267.61-1.267 1.364v12.273c0 .753.567 1.363 1.267 1.363h16.466c.7 0 1.267-.61 1.267-1.363V4.75c0-.753-.567-1.364-1.267-1.364h-3.8"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.375 9.655h4v4h-4z" />
        <path d="M8.5 5.5h3V1.8c0-.706-.66-1.3-1.5-1.3s-1.5.594-1.5 1.3v3.7z" />
      </g>
    </svg>
  );
});
const BadgeIcon = chakra(SVGIcon);
export default BadgeIcon;
