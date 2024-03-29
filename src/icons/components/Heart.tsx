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
        stroke="currentColor"
        d="M11.882 17.725C19.066 11.446 21 9.12 21 5.978 21 3.164 18.81 1 15.95 1c-1.572 0-3.166.737-4.19 1.933L11 3.82l-.76-.887C9.216 1.737 7.622 1 6.05 1 3.19 1 1 3.164 1 5.978c0 3.142 1.934 5.468 9.163 11.789l.838.828.88-.87zM10.24 1.632h.114c.231.201.447.419.646.65.199-.231.415-.449.646-.65h.114a7.094 7.094 0 00-.049-.056C12.881.586 14.416 0 15.95 0 19.36 0 22 2.609 22 5.978c0 4.13-3.74 7.5-9.46 12.5L11 20l-1.54-1.522c-5.72-5-9.46-8.37-9.46-12.5C0 2.608 2.64 0 6.05 0c1.534 0 3.069.586 4.239 1.576a7.094 7.094 0 00-.049.056z"
      />
    </svg>
  );
});
const HeartIcon = chakra(SVGIcon);
export default HeartIcon;
