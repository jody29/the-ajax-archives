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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 18" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M11.798 10.575a.5.5 0 01.436-.9 6.125 6.125 0 013.454 5.513.5.5 0 01-.147.353c-.32.32-.947.776-1.898 1.224-1.56.734-3.479 1.172-5.768 1.172-2.29 0-4.208-.438-5.768-1.172C1.156 16.317.53 15.86.21 15.54a.5.5 0 01-.146-.353 6.125 6.125 0 013.452-5.513.5.5 0 11.436.9 5.125 5.125 0 00-2.884 4.391c.059.048.132.105.22.169.338.245.752.493 1.246.725 1.428.672 3.202 1.078 5.342 1.078 2.14 0 3.914-.406 5.342-1.078.494-.232.908-.48 1.246-.725.088-.064.161-.12.22-.169a5.125 5.125 0 00-2.885-4.391zM11.312 4.5a3.437 3.437 0 10-6.874 0c0 2.142 1.735 4.563 3.437 4.563 1.702 0 3.438-2.421 3.438-4.563zm1 0c0 2.636-2.097 5.563-4.437 5.563-2.34 0-4.438-2.927-4.438-5.563a4.437 4.437 0 118.876 0z"
      />
    </svg>
  );
});
const PersonIcon = chakra(SVGIcon);
export default PersonIcon;
