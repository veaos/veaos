import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Modal as ModalComponent } from './Modal';

export default {
  title: 'Components',
  component: ModalComponent,
};

const Template: Story<ComponentProps<typeof ModalComponent>> = (args) => (
  <ModalComponent {...args} />
);

export const Modal = Template.bind({});
Modal.args = {
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
