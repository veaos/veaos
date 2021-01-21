import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Modal } from './Modal';

export default {
  title: 'Components',
  component: Modal,
};

const Template: Story<ComponentProps<typeof Modal>> = (args) => (
  <Modal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: "Use Google's location service?",
  children:
    'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.',
  buttons: [
    {
      text: 'agree',
    },
    {
      text: 'close',
      outlined: true,
    },
  ],
};
