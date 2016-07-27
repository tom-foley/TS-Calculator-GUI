//  For TypeScript require() support
declare var require: any;
//  Require sass files here so webpack picks them up & compiles
require('./src/styles/app.scss');


import { CalculatorGUI } from  './src/scripts/CalculatorGUI';
new CalculatorGUI(document.getElementById('calculator-gui-container'));
