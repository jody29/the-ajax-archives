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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0zm.192 6.656c.363 0 .643-.093.84-.28.197-.187.296-.45.296-.792 0-.341-.099-.603-.296-.784-.197-.181-.477-.272-.84-.272s-.645.09-.848.272c-.203.181-.304.443-.304.784s.101.605.304.792c.203.187.485.28.848.28zM12.04 16V8h-1.712v8h1.712z"
      />
    </svg>
  );
});
const InfoIcon = chakra(SVGIcon);
export default InfoIcon;
