export class HTMLAttrKeyValuePair {
    key: string;
    value: string | number | boolean;

    constructor(key: string, value: string | number | boolean) {
        this.key = key;
        this.value = value;
    }
}

export class HTMLEventKeyValuePair {
    eventName: string;
    eventFn: EventListener;

    constructor(name: string, fn: EventListener) {
        this.eventName = name;
        this.eventFn = fn;
    }
}

export class HTMLElementProperties extends Object {
    type: string;
    id: string;
    className: string;
    text: string | number;
    value: string | number;
    attrs: Array<HTMLAttrKeyValuePair>;
    styles: Array<HTMLAttrKeyValuePair>;
    events: Array<HTMLEventKeyValuePair>;
    children: Array<HTMLElementProperties | HTMLElement>;

    constructor(obj: Object) {
        super();

        let attrStr: string;

        attrStr = 'type';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.type = obj[attrStr];
        }

        attrStr = 'id';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.id = obj[attrStr];
        }

        attrStr = 'className';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.className = obj[attrStr];
        }

        attrStr = 'text';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.text = obj[attrStr];
        }

        attrStr = 'value';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.value = obj[attrStr];
        }

        attrStr = 'attrs';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.attrs = obj[attrStr];
        }

        attrStr = 'styles';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.styles = obj[attrStr];
        }

        attrStr = 'events';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.events = obj[attrStr];
        }

        attrStr = 'children';
        if (this.isDefinedWithValue(obj[attrStr])) {
            this.children = obj[attrStr];
        }
    }


    private isDefinedWithValue(obj) {
        return typeof obj !== 'undefined' && obj !== null;
    }
}

export const HTMLElementsTypes: Array<string> = [
    'table',
    'caption',
    'tbody',
    'thead',
    'tfoot',
    'tr',
    'th',
    'td',
    'div',
    'span',
    'input',
    'label',
    'select'
];


export class HTMLElementGenerator {
    private isDefined(obj): boolean {
        return typeof (obj) !== 'undefined';
    }


    private isDefinedWithValue(obj): boolean {
        return typeof (obj) !== 'undefined' && obj !== null;
    }


    private setElementText(el: HTMLElement, text: string): void {
        if (this.isDefinedWithValue(el.innerText)) {
            el.innerText = text;
        } else if (this.isDefinedWithValue(el.textContent)) {
            el.textContent = text;
        }
    }


    private generate(attributes: HTMLElementProperties): HTMLElement {
        let el: HTMLElement = document.createElement(attributes.type);

        if (this.isDefinedWithValue(attributes.id) && attributes.id.length > 0) {
            el.id = attributes.id;
        }

        if (this.isDefinedWithValue(attributes.className) && attributes.className.length > 0) {
            el.className = attributes.className;
        }

        if (this.isDefinedWithValue(attributes.text)) {
            this.setElementText(el, attributes.text.toString());
        }

        if (this.isDefinedWithValue(attributes.value)) {
            const valueStr = 'value';
            el[valueStr] = attributes.value;
        }

        if (this.isDefinedWithValue(attributes.attrs) && attributes.attrs.length > 0) {
            for (let i = 0; i < attributes.attrs.length; ++i) {
                const attrKey: string = attributes.attrs[i].key;
                const attrValue: string | number | boolean = attributes.attrs[i].value;

                if (attrKey.length > 0) {
                    el.setAttribute(attrKey, attrValue.toString());
                }
            }
        }

        if (this.isDefinedWithValue(attributes.styles) && attributes.styles.length > 0) {
            for (let i = 0; i < attributes.styles.length; ++i) {
                const styleKey: string = attributes.styles[i].key;
                const styleValue: string | number | boolean = attributes.styles[i].value;
                if (this.isDefinedWithValue(el.style[styleKey])) {
                    el.style[styleKey] = styleValue;
                }
            }
        }


        if (this.isDefinedWithValue(attributes.events) && attributes.events.length > 0) {
            for (let i = 0; i < attributes.events.length; ++i) {
                const eventName: string = attributes.events[i].eventName;
                const eventFn: EventListener = attributes.events[i].eventFn;
                const eventNameFallBack: string = 'on' + eventName;
                if ((this.isDefined(el[eventName]) || this.isDefined(el[eventNameFallBack]))
                    && typeof eventFn === 'function') {
                    el[eventNameFallBack] = eventFn;
                }
            }
        }

        if (this.isDefinedWithValue(attributes.children) && attributes.children.length > 0) {
            for (let i = 0; i < attributes.children.length; ++i) {
                let child: HTMLElement = null;
                if (attributes.children[i] instanceof HTMLElementProperties) {
                    child = this.generate(<HTMLElementProperties>attributes.children[i]);
                } else {
                    child = <HTMLElement>attributes.children[i];
                }

                if (this.isDefinedWithValue(child)) {
                    el.appendChild(child);
                }
            }
        }

        return el;
    }


    public createElement(attributes: HTMLElementProperties): HTMLElement {
        if (this.isDefinedWithValue(attributes.type) && HTMLElementsTypes[attributes.type] !== null) {
            if (this.isDefinedWithValue(attributes)) {
                return this.generate(attributes);
            }
        }
    }
}
