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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" ref={svgRef} {...props}>
      <g fill="currentColor">
        <path d="M12.92 11.972a3.015 3.015 0 01-1.134 1.572 3.062 3.062 0 01-1.818.576c-.832 0-1.52-.236-2.064-.708s-.912-1.132-1.104-1.98H5.744v-.78h.936c-.016-.256-.024-.46-.024-.612 0-.192.004-.332.012-.42h-.924v-.78h1.02c.168-.912.528-1.62 1.08-2.124s1.252-.756 2.1-.756c.688 0 1.278.16 1.77.48.492.32.846.776 1.062 1.368l-.864.408c-.136-.448-.372-.796-.708-1.044a1.927 1.927 0 00-1.176-.372c-.56 0-1.04.18-1.44.54-.4.36-.68.86-.84 1.5h2.856l-.24.78H7.628a5.184 5.184 0 00-.012.42c0 .216.012.42.036.612h2.472l-.24.78H7.796c.16.584.43 1.038.81 1.362.38.324.838.486 1.374.486.464 0 .89-.144 1.278-.432.388-.288.65-.688.786-1.2l.876.324z" />
        <path d="M10 19.5a9.5 9.5 0 110-19 9.5 9.5 0 010 19zm0-1a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
      </g>
    </svg>
  );
});
const EuroIcon = chakra(SVGIcon);
export default EuroIcon;
