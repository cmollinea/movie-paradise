import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {}
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            default: {
              50: '#f1f4fb',
              100: '#d4dbdc',
              200: '#bdc0c2',
              300: '#a3a6a8',
              400: '#8a8c8f',
              500: '#707375',
              600: '#57595c',
              700: '#3d4042',
              800: '#24262a',
              900: '#00100e'
            },
            background: '#242423',
            foreground: {
              DEFAULT: '#f2f2f2',
              50: '#f2f2f2',
              100: '#d9d9d9',
              200: '#bfbfbf',
              300: '#a6a6a6',
              400: '#8c8c8c',
              500: '#737373',
              600: '#595959',
              700: '#404040',
              800: '#262626',
              900: '#0d0d0d'
            },
            primary: {
              DEFAULT: '#fca71c',
              50: '#ffefdb',
              100: '#ffd9ad',
              200: '#fec57e',
              300: '#fdb54d',
              400: '#fca71c',
              500: '#e37f03',
              600: '#b05600',
              700: '#7f3500',
              800: '#4d1a00',
              900: '#1d0500'
            },
            success: {
              100: '#E4FCD7',
              200: '#C4FAB1',
              300: '#99F187',
              400: '#71E366',
              500: '#38D138',
              600: '#28B334',
              700: '#1C9631',
              800: '#11792C',
              900: '#0A6429'
            },
            danger: {
              100: '#FDDCD9',
              200: '#FCB3B4',
              300: '#F88C98',
              400: '#F26F89',
              500: '#EA4174',
              600: '#C92F6C',
              700: '#A82064',
              800: '#871459',
              900: '#700C51'
            },
            warning: {
              100: '#FCF2CE',
              200: '#FAE29D',
              300: '#F1C96B',
              400: '#E4AE46',
              500: '#D38910',
              600: '#B56E0B',
              700: '#975608',
              800: '#7A4005',
              900: '#653003'
            }
          }
        }
      }
    })
  ]
};
export default config;
