import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Button } from './Button';
import { colorControl } from '../../utils/storybook.utils';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    color: colorControl,
  },
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'A Button',
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: 'A Button',
  outlined: true,
};
