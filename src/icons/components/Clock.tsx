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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" ref={svgRef} {...props}>
      <g fill="currentColor">
        <path d="M10 19.5a9.5 9.5 0 110-19 9.5 9.5 0 010 19zm0-1a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
        <path d="M14.315 12.849l-.63.777L9.5 10.239V4.69h1v5.07z" />
      </g>
    </svg>
  );
});
const ClockIcon = chakra(SVGIcon);
export default ClockIcon;
