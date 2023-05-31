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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M8.914 7.5l5.251 5.251a1 1 0 11-1.414 1.414L7.5 8.915l-5.251 5.25a1 1 0 01-1.414-1.414L6.085 7.5.836 2.249A1 1 0 012.249.835L7.5 6.085l5.251-5.25a1 1 0 111.414 1.414L8.915 7.5z"
      />
    </svg>
  );
});
const CloseNormalIcon = chakra(SVGIcon);
export default CloseNormalIcon;
