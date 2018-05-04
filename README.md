# Remeal

Simple remote control panel for reveal.js presentations based on socket.io.

![Alt text](/example.png?raw=true "Screenshot")

## Usage
Installation process includes two simple steps:

1. Clone this repo and deploy anywhere. Don't forget to `npm run build&& npm run start` it (hint: `now` will do it automatically).
2. Connect your presentation to the control panel. There are two ways to do that:
    1. Visit remeal deployment and drag the huge `Remeal` link to the bookmarks panel. Then open your presentation and press the bookmarklet. Presentation will be connected to the control panel automatically.
    2. OR build remeal locally (`npm run build`), copy `plugin/remeal.js` to your presentation and add it as a dependency:
        ```js
        Reveal.initialize({
          ...otherConfigOptions,
          dependencies: [
            ...otherDependencies,
            { src: REMEAL_PLUGIN_URL_GOES_HERE, async: true, callback: () => initRemeal() }
          ]
        })
        ```
        Then open your presentation and press `r` to connect to the remote control panel.
        
## Todo
Add support for shower.js.