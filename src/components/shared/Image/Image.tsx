import { BoxProps, Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type ImageProps = BoxProps & {
  src?: string;
  srcSet?: string;
  placeholderSrc?: string;
  placeholderSrcSet?: string;
  alt: string;
  ratio?: number;
  lazyload?: boolean;
  onLoad?: (event: Event) => void;
  onError?: (event: Event | string) => void;
};

const transparentPlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export const Image = ({
  src,
  srcSet,
  alt,
  placeholderSrc,
  placeholderSrcSet,
  objectFit = 'cover',
  onLoad,
  lazyload = true,
  objectPosition,
  onError,
  ratio,
  ...props
}: ImageProps) => {
  const isMounted = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (!src && !srcSet) {
      return;
    }

    if (lazyload && !inView) {
      return;
    }

    const image = new window.Image();
    if (src) image.src = src;
    if (srcSet) image.srcset = srcSet;

    image.onload = event => {
      if (isMounted.current) {
        setHasLoaded(true);
        onLoad && onLoad(event);
      }
    };

    image.onerror = event => {
      if (isMounted.current) {
        setHasLoaded(false);
        onError && onError(event);
      }
    };
  }, [src, srcSet, onLoad, onError, inView, lazyload]);

  const ratioProps = ratio
    ? ({
        position: 'absolute',
        top: 0,
        left: 0,
      } as BoxProps)
    : {};

  return (
    <Box {...props} position="relative" ref={ref} pt={ratio ? ratio * 100 + '%' : undefined}>
      <Box
        as="img"
        display="block"
        src={hasLoaded ? src : placeholderSrc || transparentPlaceholder}
        srcSet={hasLoaded ? srcSet : placeholderSrcSet}
        {...ratioProps}
        sx={{
          width: '100%',
          height: '100%',
          transition: 'opacity 0.4s ease-in-out',
          opacity: hasLoaded || placeholderSrc ? 1 : 0,
          objectFit,
          objectPosition,
        }}
        alt={alt}
      />
    </Box>
  );
};
