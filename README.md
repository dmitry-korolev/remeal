# Remeal
Simple remote control panel for reveal.js presentations based on socket.io. Features:

1. Title of the talk. For busy people!
2. Timer. Click on it to restart.
3. Beautiful connection indicator. 
4. Displays the current slide.
5. Displays speaker notes for the current slide.
6. Controls available:
    1. next slide
    2. previous slide
    3. toggle pause mode
    4. toggle overview mode
7. Customizable panel! Choose where to place the current slide, speaker notes and controls, or disable them at all!
8. Light and dark theme included. Sometimes you just don't want to make your listeners blind.

## Usage
The installation process includes two simple steps:

1. Clone this repo and deploy anywhere. Don't forget to `npm run build&& npm run start` it (hint: `now` will do it automatically).
2. Connect your presentation to the control panel. There are two ways to do that:
    1. Visit remeal deployment and drag the huge `Remeal` link to the bookmarks panel. Then open your presentation and press the bookmarklet. The presentation will be connected to the control panel automatically.
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
3. Tapping on the gear in the header opens the configuration panel, where you can switch theme and rearrange or disable control panel blocks.

## Screenshots
### Dark theme
![Dark theme](/screenshots/dark.png?raw=true "Dark theme")

### Light theme
![Light theme](/screenshots/light.png?raw=true "Light theme")

### Settings
![Settings](/screenshots/settings.png?raw=true "Settings panel")

## License
MIT
