import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

// Define as cores principais do tema
const colors = {
  brand: {
    50: '#fff5f5',
    100: '#fed7d7',
    200: '#feb2b2',
    300: '#fc8181',
    400: '#f56565',
    500: '#e53e3e',
    600: '#c53030',
    700: '#9b2c2c',
    800: '#822727',
    900: '#63171b',
  },
};

// Define o tema base
const theme = {
  colors,
  styles: {
    global: {
      // Configurações para o modo claro
      body: {
        bg: 'white',
        color: 'black',
      },
      // Configurações para o modo escuro
      'html[data-theme="dark"] &': {
        body: {
          bg: 'gray.900',
          color: 'white',
        },
      },
    },
  },
};

// Estende o tema base com as propriedades do modo claro e do modo escuro
const cherryTheme = extendTheme(
  {
    ...theme,
    // Configurações para o modo claro
    light: {
      bg: 'white',
      color: 'black',
      borderColor: 'gray.400',
    },
    // Configurações para o modo escuro
    dark: {
      bg: 'gray.500',
      color: 'white',
      borderColor: 'gray.600',
    },
  components: {
    MenuItem: {
      baseStyle: {
        _active: {
          bg: "gray.700",
        },
      },
      defaultProps: {
        variant: "ghost",
      },
      variants: {
        active: {
          bg: "gray.700",
        },
      },
    },
  },

  },
  withDefaultColorScheme({ colorScheme: 'brand' })
);

export default cherryTheme;