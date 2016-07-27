#   TS-Calculator-GUI
Web-based interface for demoing my implementation of a JavaScript calculator in TypeScript -- [TS-Calculator](https://github.com/tom-foley/TS-Calculator "TS-Calculator"), which aims to emulate JavaScript's native eval() in a safer manner.

##  Demo
![Alt text](CalculatorGUI_Demo.gif?raw=true "CalculatorGUI Demo")
This calculator can handle much larger and more complex inputs -- see the examples at [TS-Calculator](https://github.com/tom-foley/TS-Calculator "TS-Calculator"). This GIF just is just a quick demo of the calculator interface and basic input.

##  Usage
By cloning this repo, you will already have the compiled JS/CSS necessary to run the GUI on your local machine -- all you have to do is fire up a local server (python's `SimpleHTTPServer` is easiest on linux machines, however, a simple node server may be easier on windows) and browse to localhost:8080, where 8080 is the port the local server is running on. 

If you would like to build the source yourself and use the CalculatorGUI elsewhere, use the following steps to get up and running:
*   run `npm install` from the root project directory. This will install all the required node packages to build the source(webpack, webpack-loaders, typescript, etc);
*   create a javascript/typescript file for your webpage for webpack to pick up, similar to the `./app.ts` file located in this repo. Here you will just need to define the required imports for the CalculatorGUI which are the GUI itself and associated styles (again, see `./app.ts` for an example).
*   in order to initialize the CalculatorGUI, you need some sort of HTML element container on your page for the CalculatorGUI to be placed into. My example in `./index.html` defines a simple `<div id="calculator-gui-container">` element to hold the calcular for, and defines styles for this in `./src/styles/app.scss`. To initialize the CalculatorGUI, you just need to get a reference to your container element and pass this in to the CalculatorGUI constructor(as seen in `./app.ts` line 8).
*   navigate to `./webpack.config.js` and change the entry location from `app.ts` to the name of your javascript/typescript file. 
*   if you have webpack installed globally on your machine, simply run the `webpack` command from the root directory. This will compile all the *.ts files from `./src/scripts/` to a JavaScript bundle located in `./lib/bundle.js` and all the *.scss files from `./src/styles/` to a CSS bundle located in `./lib/bundle.css`.
    *   Optional: run `webpack` with argument `--optimize-minimize` to minify the source output.
*   in your .html file which you are using the CalculatorGUI, place the `./lib/bundle.css` in the header and the `./lib/bundle.js` right below the `</body>` tag (or at least somewhere after your container is defined).
*   finally, fire up the server of your choice (or use either option from above), and check out the resulting gui. 

## TODO
*   Add button for calculating exponents(Calculator already has exponent support, just need to find a place for `^` button)
*   Add support for floating point operations. CURRENTLY THE `.` button DOES NOT WORK
*   Add better input handling to make sure no illegal values make their way into the display
*   Add keyboard/numpad support -- Also add listener to "enter" key to submit input to calculation
*   Add backspace button to delete most recently pressed character
