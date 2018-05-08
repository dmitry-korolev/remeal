import { h } from 'preact'
import styled from 'preact-emotion'
import { Consumer } from '../controlApp'
import { createSelector } from 'reselect'

const lightTheme = {
  backgroundColor: '#FCFEFF',
  fontColor: '#022B3A',
  borderColor: '#022B3A',
  linkColor: '#1F7A8C'
}

const darkTheme = {
  backgroundColor: '#022B3A',
  fontColor: '#CACED1',
  borderColor: '#1F7A8C',
  linkColor: '#1F7A8C'
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

  font-size: 16px;
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

const themeSelector = createSelector(
  (state) => state.config.theme,
  (theme) => ({ theme })
)

export const ThemeProvider = ({ children }) => (
  <Consumer mapState={themeSelector}>
    {({ theme }) => <Theme theme={theme}>{children}</Theme>}
  </Consumer>
)
