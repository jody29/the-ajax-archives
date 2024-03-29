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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.37 58.37" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M57.863 26.632L29.182 0 .502 26.632a1.001 1.001 0 001.361 1.466l3.319-3.082v33.349h48v-33.35l3.319 3.082a.995.995 0 00.681.267 1 1 0 00.681-1.732zM23.182 56.365v-16c0-3.309 2.691-6 6-6s6 2.691 6 6v16h-12zm28 0h-14v-16c0-4.411-3.589-8-8-8s-8 3.589-8 8v16h-14V23.158l22-20.429 22 20.429v33.207z"
      />
    </svg>
  );
});
const HomeIcon = chakra(SVGIcon);
export default HomeIcon;
