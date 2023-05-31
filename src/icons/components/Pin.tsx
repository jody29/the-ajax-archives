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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 20" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M8.5.5c4.388 0 8.002 3.597 8 7.965 0 2.303-1.263 4.692-3.407 7.08a27.873 27.873 0 01-4.3 3.86l-.3.217-.294-.223a29.826 29.826 0 01-4.294-3.927C1.762 13.066.5 10.7.5 8.465.5 4.058 4.075.5 8.5.5zm3.85 14.377c1.993-2.222 3.15-4.41 3.15-6.412.001-3.815-3.163-6.965-7-6.965-3.874 0-7 3.112-7 6.965 0 1.934 1.157 4.102 3.152 6.341a28.676 28.676 0 003.854 3.57 26.914 26.914 0 003.843-3.5z"
      />
    </svg>
  );
});
const PinIcon = chakra(SVGIcon);
export default PinIcon;
