# Remeal

Simple remote control panel for reveal.js presentations based on socket.io.

![Alt text](/example.png?raw=true "Screenshot")

## Installation
1. Clone this repo and deploy anywhere. Don't forget to `npm run start` it.
2. There are two ways to connect to the control panel:
    1. Build remeal locally (`npm run build`), copy `plugin/remeal.js` to your presentation and add it as a dependency:
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
        
    2. OR visit remeal deployment and drag the huge `Remeal` link to the bookmarks panel. Then open your presentation and press the bookmarklet. Presentation will be connected to the control panel automatically.
