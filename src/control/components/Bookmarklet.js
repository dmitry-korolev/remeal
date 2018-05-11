import { h } from 'preact'
import styled from 'preact-emotion'

const Container = styled.div`
  height: var(--blocks-height);
  text-align: center;
  font-size: 6vh;

  > a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: calc(100vh - var(--header-height));
  }
`

export const bookmarkletUrl = (url) =>
  `javascript:(function()%7Bconst%20loadScript%20%3D%20(src)%20%3D%3E%20new%20Promise((resolve%2C%20reject)%20%3D%3E%20%7Bconst%20script%20%3D%20document.createElement('script')%3Bscript.src%20%3D%20src%3Bscript.onload%20%3D%20resolve%3Bscript.onerror%20%3D%20reject%3Bdocument.head.appendChild(script)%3B%7D)%3BloadScript("${url}/plugin/remeal.js").then(()%20%3D%3E%20initRemeal("${url}", true))%7D)()`

export const Bookmarklet = ({ url }) => (
  <Container>
    <a
      className="bookmarklet"
      title="Remeal bookmarklet"
      href={bookmarkletUrl(url)}>
      Remeal
    </a>
  </Container>
)
