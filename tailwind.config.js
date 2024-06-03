/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  theme: {
    extend: {
        fontFamily: {
            mono: ['Apercu Mono Pro', ...defaultTheme.fontFamily.mono],
        },
    },
},
plugins: [
  // require('@tailwindcss/forms'),
  // ...
],
}

