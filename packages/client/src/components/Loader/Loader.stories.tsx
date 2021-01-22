import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import LoaderComponent from './Loader';

export default {
  title: 'Components',
  component: LoaderComponent,
};

const Template: Story<ComponentProps<typeof LoaderComponent>> = (args) => (
  <LoaderComponent {...args} />
);

export const Loader = Template.bind({});
