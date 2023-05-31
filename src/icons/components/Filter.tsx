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
      width={24}
      height={18}
      fill="none"
      viewBox="0 0 24 18"
      ref={svgRef}
      {...props}>
      <path stroke="currentColor" d="M0 3.5h24m-24 11h24" />
      <circle cx={6.5} cy={3.5} r={3} fill="white" stroke="currentColor" />
      <circle cx={17.5} cy={14.5} r={3} fill="white" stroke="currentColor" />
    </svg>
  );
});
const FilterIcon = chakra(SVGIcon);
export default FilterIcon;
