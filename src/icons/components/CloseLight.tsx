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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M15.707 15l14.348 14.348-.707.707L15 15.707.652 30.055l-.707-.707L14.293 15-.055.652l.707-.707L15 14.293 29.348-.055l.707.707L15.707 15z"
      />
    </svg>
  );
});
const CloseLightIcon = chakra(SVGIcon);
export default CloseLightIcon;
