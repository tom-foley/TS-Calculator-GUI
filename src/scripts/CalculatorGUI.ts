import { HTMLAttrKeyValuePair, HTMLEventKeyValuePair, HTMLElementProperties, HTMLElementGenerator } from './HTMLElementGenerator';
import { EvalResult, Calculator } from './Calculator';

const attribute = HTMLAttrKeyValuePair;
const element = HTMLElementProperties;
const event = HTMLEventKeyValuePair;

class NumberOp {
    token: number | string;
    width: number;

    constructor(token?: number | string, width?: number) {
        if (token !== null) {
            this.token = token;
        }

        if (width !== null) {
            this.width = width;
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
                            new event('click',
                                function (token) {
                                    this.display.value += token;
                                }.bind(this, numberOp.token)
                            )
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
                attrs: [
                    new attribute('readonly', true),
                    new attribute('type', 'text'),
                ],
                events: [
                    // new event('keydown',
                    //     function (ev) {
                    //         const keyCodeStr: string = 'keyCode';
                    //         const keyCode: number = ev[keyCodeStr];
                    //         if (keyCode >= 65 && keyCode <= 90) {
                    //             this.setAttribute('illegalKey', '1');
                    //         } else {
                    //             this.setAttribute('illegalKey', '0');
                    //         }
                    //     }
                    // ),
                    // new HTMLEventKeyValuePair('keyup',
                    //     function (ev) {
                    //         if (this.getAttribute('illegalKey') === '1') {
                    //             this.value = this.getAttribute('_value');
                    //         }
                    //         this.setAttribute('illegalKey', '0');
                    //     }
                    // ),
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
                    this.renderNumberOpRow([new NumOp('C', 3), new NumOp('+/-', 3), new NumOp('%', 3), new NumOp('/', 3)]),
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
