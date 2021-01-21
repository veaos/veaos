import tailwindConfig from 'tailwindcss/stubs/defaultConfig.stub';

const {
  theme: { colors },
} = tailwindConfig;

export const colorControl = {
  control: { type: 'select', options: Object.keys(colors), default: 'blue' },
};
