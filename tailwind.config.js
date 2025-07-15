// tailwind.config.js
const { heroui } = require("@heroui/react");

module.exports = {
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
