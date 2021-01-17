/*
new Array(10).fill(null).reduce(
  (minHeight, _, i) => ({
    ...minHeight,
    [(i + 1) * 20]: `${(i + 1) * 20}px`,
  }),
  {}
)*/
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
    minHeight: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
