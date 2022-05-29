## About

This is a simple weather app I designed to run on my Rasperry Pi. It displays the following information about the weather, updated every 5 minutes:

- Temperature (both Fahrenheit and Celcius)
- Description (e.g. "Partly Cloudy", "Thunderstorm")
- Humidity
- Air pressure
- Wind speed and direction
- UV index

In addition to the live current weather stats, it displays a graph of the forecasted temperature throughout the day. The high and low temperatures for the day can be seen from the labels on the y-axis of the graph.

There are also two other tabs on the screen, which are works in progress: radar and 10-day forecast. The radar feature is not performant enough to run well on the Raspberry Pi, so it needs to be re-implemented. The 10-day forecast feature is simply not implemented yet (coming soon!TM).

## Usage

To run the app, run `npm start` from the root directory, then open `localhost:3000` in your browser of choice.

The app is designed to run on an 800x400 pixel display, with the browser in fullscreen mode. It should work fine on most screen sizes though, since the CSS uses flexbox for almost everything.

If the display is too bright at night, you can triple tap or triple click the screen to turn it black. Triple tap again to turn it back on.

### Setting up the wall display

You will need:
- A Raspberry Pi - I'm using a [Raspberry Pi 3 - Model B+](https://www.adafruit.com/product/3775) but any Pi with wifi should work.
- A microSD card
- A display - preferably touchscreen and 800x400. I'm using [this one](https://www.newark.com/raspberry-pi/raspberrypi-display/sbc-raspberry-pi-board/dp/24AJ1828).
- A case for the Pi. This is optional but recommended. I'm using [this one](https://www.adafruit.com/product/2258).
- A 2.5 amp, 5 volt Micro-USB power adapter
- Command strips

1. Set up the Raspberry Pi with the microSD card.
2. Connect the display to the Raspberry Pi using the connectors included with the display.
3. Put the Raspberry Pi in the case.
4. Connect the power adapter to the display.
5. Mount both the display and Pi to the wall. I used two command strips for the display and one for the Pi and it holds fine.
6. Plug in the power adapter to the wall.
7. Clone this repository on the Raspberry Pi and follow above instructions for running the app.
8. Put the browser in full screen mode and enjoy checking the weather!

##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
