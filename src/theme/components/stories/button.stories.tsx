import { Button, ButtonProps, VisuallyHidden } from '@chakra-ui/react';
import { Story } from '@storybook/react';

import ArrowIcon from '@/icons/components/Arrow';

export default {
  title: 'Chakra Components/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'submitted',
    },
  },
};

const Template: Story<ButtonProps> = args => <Button {...args}>Click me!</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
};

export const IconTemplate: Story<ButtonProps> = args => (
  <Button variant="icon">
    <ArrowIcon />
    <VisuallyHidden>Click me!</VisuallyHidden>
  </Button>
);
