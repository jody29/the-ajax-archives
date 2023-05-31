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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        stroke="currentColor"
        d="M11 19.297l1.21-1.195c7.311-6.39 9.29-8.77 9.29-12.124C21.5 2.886 19.085.5 15.95.5c-1.718 0-3.451.801-4.57 2.108L11 3.05l-.38-.443C9.501 1.3 7.768.5 6.05.5 2.915.5.5 2.886.5 5.978c0 3.355 1.979 5.734 9.311 12.145l1.19 1.174z"
      />
    </svg>
  );
});
const HeartFullIcon = chakra(SVGIcon);
export default HeartFullIcon;
