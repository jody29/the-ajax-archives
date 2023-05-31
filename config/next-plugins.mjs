import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZE === 'true',
  })(),
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV !== 'production',
        dest: 'public',
        publicExcludes: ['!favicon/**/*'],
      },
    },
  ],
];

export { plugins };
