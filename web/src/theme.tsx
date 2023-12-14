import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/nunito";
import variables from "./variables.module.scss";

const fonts = { nunito: `'Nunito', sans-serif` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme: ThemeConfig = extendTheme({
  colors: {
    white: variables.white,
    light_mint: variables.light_mint,
    mint: variables.mint,
    dark_mint: variables.dark_mint,
    extra_dark_mint: variables.extra_dark_mint,
    light_blue: variables.light_blue,
    blue: variables.blue,
    red: variables.red,
    dark_red: variables.dark_red,
  },
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
