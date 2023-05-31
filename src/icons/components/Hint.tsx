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
        d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0zm.528 5.28c-1.099 0-1.987.25-2.664.752a3.209 3.209 0 00-1.272 2l1.584.752c.064-.63.293-1.12.688-1.472.395-.352.912-.528 1.552-.528.65 0 1.144.133 1.48.4.336.267.504.635.504 1.104 0 .555-.224.984-.672 1.288-.448.304-1.195.52-2.24.648l.032 2.416h1.632l.048-1.616c.907-.096 1.637-.39 2.192-.88.555-.49.832-1.19.832-2.096 0-.875-.339-1.555-1.016-2.04-.677-.485-1.57-.728-2.68-.728zm-.192 8.592c-.363 0-.653.104-.872.312-.219.208-.328.483-.328.824 0 .352.107.63.32.832.213.203.507.304.88.304.363 0 .65-.101.864-.304.213-.203.32-.48.32-.832 0-.341-.107-.616-.32-.824-.213-.208-.501-.312-.864-.312z"
      />
    </svg>
  );
});
const HintIcon = chakra(SVGIcon);
export default HintIcon;
