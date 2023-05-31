import { Image } from './Image';

export default {
  title: 'Foundation/Image',
  component: Image,
  argTypes: {
    objectFit: {
      defaultValue: 'cover',
      control: {
        type: 'text',
      },
    },
    width: {
      defaultValue: '100%',
      control: {
        type: 'text',
      },
    },
    height: {
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    preload: {
      defaultValue:
        'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=10&q=80',
      control: {
        type: 'text',
      },
    },
    src: {
      defaultValue:
        'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      control: {
        type: 'text',
      },
    },
    srcSet: {
      defaultValue:
        'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80 320w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80 768w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80 1024w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80 1280w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80 1400w, https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80 1920w',
      control: {
        type: 'text',
      },
    },
    alt: {
      defaultValue: 'Cat picture',
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = Image;
