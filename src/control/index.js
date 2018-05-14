import './index.css'
import { h, render } from 'preact'
import { Header } from './components/Header'
import { Blocks } from './components/Blocks'
import { ThemeProvider } from './components/ThemeProvider'

import { polyfill } from 'mobile-drag-drop'
polyfill()

render(
  <ThemeProvider>
    <Header />
    <Blocks />
  </ThemeProvider>,
  document.getElementById('app')
)
