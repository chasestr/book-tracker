import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/nunito";

const fonts = { nunito: `'Nunito', sans-serif` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme: ThemeConfig = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#5cdb95",
      },
    },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts,
  breakpoints,
});

export default theme;
