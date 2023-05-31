Place all your svg icons in this folder.

Run `yarn svgr` to optimize them with SVGO and export to React Components. The icon will inherit the color from it's parent.

Usage:

```
import HomeIcon from '@/icons/component/Home'

<Box color="primary">
  <HomeIcon size={20} />
</Box>
```
