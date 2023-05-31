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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M16.087.35L5.625 11.2 1.913 7.35c-.45-.467-1.125-.467-1.576 0a1.157 1.157 0 000 1.633l4.5 4.667c.226.233.45.35.788.35s.563-.117.787-.35l11.25-11.667c.45-.466.45-1.166 0-1.633-.45-.467-1.124-.467-1.575 0z"
      />
    </svg>
  );
});
const CheckIcon = chakra(SVGIcon);
export default CheckIcon;
