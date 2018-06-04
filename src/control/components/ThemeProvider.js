import { h } from 'preact'
import styled from 'preact-emotion'
import { Consumer } from '../controlApp'
import { createSelector } from 'reselect'

const lightTheme = {
  backgroundColor: '#FCFEFF',
  fontColor: '#022B3A',
  borderColor: '#022B3A',
  linkColor: '#1F7A8C',
  dialogBackground: 'rgba(255, 255, 255, 0.9)'
}

const darkTheme = {
  backgroundColor: '#022B3A',
  fontColor: '#CACED1',
  borderColor: '#1F7A8C',
  linkColor: '#1F7A8C',
  dialogBackground: 'rgba(0, 0, 0, 0.7)'
}

const themes = {
  light: lightTheme,
  dark: darkTheme
}

const Theme = styled.div`
  --background-color: ${({ theme }) => themes[theme].backgroundColor};
  --font-color: ${({ theme }) => themes[theme].fontColor};
  --border-color: ${({ theme }) => themes[theme].borderColor};
  --link-color: ${({ theme }) => themes[theme].linkColor};

  --dialog-background: ${({ theme }) => themes[theme].dialogBackground};
  --font-size: 16px;

  font-size: var(--font-size);
  font-family: -apple-system, sans-serif;
  color: var(--font-color);
  background-color: var(--background-color);

  /* Believe me, it's ok */
  a,
  a:visited,
  a:focus,
  a:hover {
    color: var(--link-color);
  }
`

export const ThemeProvider = ({ children }) => (
  <Consumer mapState={(state) => state.config.theme}>
    {(theme) => <Theme theme={theme}>{children}</Theme>}
  </Consumer>
)
