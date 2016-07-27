import { HTMLAttrKeyValuePair, HTMLEventKeyValuePair, HTMLElementProperties, HTMLElementGenerator } from './HTMLElementGenerator';
import { EvalResult, Calculator } from './Calculator';

const attribute = HTMLAttrKeyValuePair;
const element = HTMLElementProperties;
const event = HTMLEventKeyValuePair;

class NumberOp {
    token: number | string;
    width: number;
    ev: any;

    constructor(token: number | string, width: number) {
        this.token = token;
        this.width = width;

        if (typeof (this.token) === 'number') {
            if (this.token > 0) {
                this.ev = function (token) {
                    let display = this.display;
                    if (display.getAttribute('dirty') === 'false') {
                        display.value = token;
                    } else if (display.getAttribute('dirty') === 'true') {
                        display.value += token;
                    }

                    display.setAttribute('dirty', true);
                    display.setAttribute('allowZero', true);
                };
            } else if (this.token === 0) {
                this.ev = function (token) {
                    let display = this.display;
                    if (display.getAttribute('allowZero') === 'true') {
                        display.value += token;
                    }
                };
            }

        } else if (typeof (this.token) === 'string') {
            if (this.token === 'C') {
                this.ev = function () {
                    let display = this.display;
                    display.value = '0';
                    display.setAttribute('dirty', false);
                    display.setAttribute('allowZero', false);
                    display.setAttribute('numOps', 0);
                };
            } else if (this.token === '=') {
                this.ev = function () {
                    let display = this.display;
                    const calcResult = this.calculator.calc(display.value);

                    if (calcResult.error) {
                        alert(calcResult.errorMessage);
                    } else {
                        display.value = calcResult.result;
                    }
                };
            } else {
                this.ev = function (token) {
                    let display = this.display;
                    let numOps = display.getAttribute('numOps');
                    if (numOps === 1) {
                        if (this.token !== '+' || this.token !== '-') {
                            return;
                        }
                    } else if (numOps === 2) {
                        return;
                    }

                    if (display.value === '0') {
                        display.value = token;
                    } else {
                        display.value += token;
                    }
                    display.setAttribute('dirty', true);
                    display.setAttribute('allowZero', false);
                    display.setAttribute('numOps', parseInt(display.getAttribute('numOps') + 1, 10));
                };
            }
        }
    }
}

export class CalculatorGUI {
    calculator: Calculator;
    display: HTMLInputElement;
    container: HTMLElement;
    generator: HTMLElementGenerator;

    constructor(container: HTMLElement) {
        this.calculator = new Calculator();
        this.container = container;
        this.generator = new HTMLElementGenerator();
        this.render();
    }


    private renderNumberOpCell(numberOp: NumberOp): HTMLElement {
        return this.generator.createElement(
            new element({
                type: 'div',
                className: 'mobile-sm-' + numberOp.width,
                children: [
                    new element({
                        type: 'input',
                        value: numberOp.token,
                        className: 'mobile-sm-12',
                        attrs: [
                            new attribute('type', 'button'),
                        ],
                        events: [
                            new event('click', numberOp.ev.bind(this, numberOp.token)),
                            new event('touch', numberOp.ev.bind(this, numberOp.token))
                        ]
                    })
                ]
            })
        );
    }


    private renderDisplayRow(): HTMLElement {
        this.display = <HTMLInputElement>this.generator.createElement(
            new element({
                type: 'input',
                id: 'calculator-display',
                className: 'mobile-sm-12',
                value: '0',
                attrs: [
                    new attribute('readonly', true),
                    new attribute('type', 'text'),
                    new attribute('dirty', false),
                    new attribute('allowZero', false),
                    new attribute('numOps', 0),
                ]
            })
        );

        return this.generator.createElement(
            new element({
                type: 'div',
                className: 'group',
                children: [
                    new element({
                        type: 'div',
                        className: 'mobile-sm-12',
                        children: [
                            this.display
                        ]
                    })
                ]
            })
        );
    }


    private renderNumberOpRow(numbersOps: Array<NumberOp>): HTMLElement {
        let rowChildren: Array<HTMLElement> = new Array<HTMLElement>();
        numbersOps.forEach(
            x => rowChildren.push(this.renderNumberOpCell(x))
        );
        return this.generator.createElement(
            new element({
                type: 'div',
                className: 'group',
                children: rowChildren
            })
        );
    }


    public render(): void {
        const NumOp = NumberOp;
        const calculator: HTMLElement = this.generator.createElement(
            new element({
                type: 'div',
                id: 'calculator',
                className: 'container',
                children: [
                    this.renderDisplayRow(),
                    this.renderNumberOpRow([new NumOp('C', 3), new NumOp('(', 3), new NumOp(')', 3), new NumOp('/', 3)]),
                    this.renderNumberOpRow([new NumOp(7, 3), new NumOp(8, 3), new NumOp(9, 3), new NumOp('x', 3)]),
                    this.renderNumberOpRow([new NumOp(4, 3), new NumOp(5, 3), new NumOp(6, 3), new NumOp('-', 3)]),
                    this.renderNumberOpRow([new NumOp(1, 3), new NumOp(2, 3), new NumOp(3, 3), new NumOp('+', 3)]),
                    this.renderNumberOpRow([new NumOp(0, 6), new NumOp('.', 3), new NumOp('=', 3)]),
                ]
            })
        );

        this.container.appendChild(calculator);
    }
}
