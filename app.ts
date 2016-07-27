//  For TypeScript require() support
declare var require: any;
//  Require sass files here so webpack picks them up & compiles
require('./src/styles/styles');

import { CalculatorGUI } from  './src/scripts/CalculatorGUI';
new CalculatorGUI(document.getElementById('calculator-gui-container'));
