import { createGlobalStyle } from 'styled-components';

interface Theme {
  colors: {
    primary: string;
    secondaryLight: string;
    secondaryMain: string;
    secondaryDark: string;
  };
  fonts: {
    body: string;
  };
}

const theme: Theme = {
  colors: {
    primary: '#1b68b3', //user selected , Save btn
    secondaryLight: '#ececec',
    secondaryMain: '#e8e8e8',
    secondaryDark: '#f7f7f7',
  },
  fonts: {
    body: 'Roboto, sans-serif',
  },
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-family: 'Roboto';
    --line-height: 1.5;
    --font-size: 1rem;
    --font-weight: 400;
    --color-scheme: light;
    --font-synthesis: none;
    --text-rendering: optimizeLegibility;
    --webkit-font-smoothing: antialiased;
    --moz-osx-font-smoothing: grayscale;
    --webkit-text-size-adjust: 100%;
  }
  

  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Regular.woff') format('woff'), url('/font/Roboto-Regular.eot') format('embedded-opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Medium.woff') format('woff'), url('/font/Roboto-Medium.eot') format('embedded-opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Bold.woff') format('woff'), url('/font/Roboto-Bold.eot') format('embedded-opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-ExtraBold.woff') format('woff'), url('/font/Roboto-ExtraBold.eot') format('embedded-opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 800;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Black.woff') format('woff'), url('/font/Roboto-Black.eot') format('embedded-opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 900;
  }
  
  
  html,body,#root{
    margin: 0;
    padding: 0;
  }
  
  #root{
    font-family: var(--font-family);
    line-height: var(--line-height);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    color-scheme: var(--color-scheme);
    font-synthesis: var(--font-synthesis);
    text-rendering: var(--text-rendering);
    -webkit-font-smoothing: var(--webkit-font-smoothing);
    -moz-osx-font-smoothing: var(--moz-osx-font-smoothing);
    -webkit-text-size-adjust: var(--webkit-text-size-adjust);
  }
`;

export default theme;
