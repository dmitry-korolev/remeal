# Remeal
Simple remote control panel for reveal.js presentations based on socket.io.

Features:

1. Title of the talk. For busy people!
2. Timer. Click on it to restart.
3. Beautiful connection indicator. 
4. Displays the current slide. Tap and hold the slide to turn the pointer on (can be disabled at the customization panel).
5. Displays speaker notes for the current slide.
6. Controls available:
    1. next slide
    2. previous slide
    3. toggle pause mode
    4. toggle overview mode
7. Customizable panel! Choose where to place the current slide, speaker notes and controls, or disable them at all!
8. Light and dark theme included. Sometimes you just don't want to make your listeners blind. 
9. Control panel vibrates on receiving events from the presentation so that you don't have to look back on the main screen to be sure that everything works (can be disabled at the customization panel).

## Usage
The installation process includes two simple steps:

1. Clone this repo and deploy anywhere. Don't forget to `npm run build&& npm run start` it (hint: `now` will do it automatically).
2. Connect your presentation to the control panel. There are two ways to do that:
    1. Visit remeal deployment and drag the huge `Remeal` link to the bookmarks panel. Then open your presentation and press the bookmarklet. The presentation will be connected to the control panel automatically. This method is preferable. Obviously.
    2. OR, if you feel *adventurous*, build remeal locally (`npm run build`), copy `plugin/remeal.js` to your presentation and add it as a dependency:
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
3. Tapping on the gear in the header opens the configuration panel, where you can:
    1. Switch theme
    2. Rearrange or disable control panel blocks
    3. Turn vibrations on and off
    4. Enable and disable the pointer feature.

## Screenshots
### Dark theme
![Dark theme](/screenshots/dark.png?raw=true "Dark theme")

### Light theme
![Light theme](/screenshots/light.png?raw=true "Light theme")

## Built with:
* [preact](https://preactjs.com/) as a view library
* [stapp](https://www.npmjs.com/package/stapp) as a state management tool
* [socket.io](https://socket.io/) as an event transport
* [parcel](https://parceljs.org/) as a bundler with zero configuration

## License
MIT
