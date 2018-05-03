# Remeal

Simple remote control panel for reveal.js presentations based on socket.io.

![Alt text](/example.png?raw=true "Screenshot")

## Installation
1. Clone this repo.
2. Deploy its content anywhere (e.g. `now`)
3. Add `socket.io` and `remeal.js` as dependencies to the `Reveal.initialize` config:
    ```js
    Reveal.initialize({
      ...otherConfigOptions,
      dependencies: [
        ...otherDependencies,
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.js' },
        { src: 'https://raw.githubusercontent.com/dmitry-korolev/remeal/master/plugin/remeal.js', async: true }
      ]
    })
    ```
    
4. Visit remeal deployment url.
5. Open your presentation, press `r` and enter remeal deployment url when prompted.
