import { Modal } from '../Modal/Modal';
import React from 'react';

export const DeleteModal = ({ title, open, setOpen, onDelete, children }) => (
  <Modal
    open={open}
    title={title}
    onClose={() => setOpen(false)}
    buttons={[
      {
        text: 'Delete',
        color: 'red',
        onClick: (_, onClose) => {
          onDelete();
          onClose();
        },
      },
      {
        text: 'Close',
        outlined: true,
        onClick: (_, onClose) => onClose(),
      },
    ]}
  >
    {children}
  </Modal>
);
