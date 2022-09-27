import { expect } from "chai";
import { ChainablePromiseElement } from "webdriverio";
import { ELEMENT_NAME, ELEMENT_TYPE, TIMEOUTS } from "../support/constants/constants";
import { clearInputWithKeyboard, hoverElement, unfocusInput } from "../support/helpers/actions";
import { waitForElement, waitForElementAndClick, waitForElementAndGetText, waitForElementAndSendKeys } from "../support/helpers/waits";
import { checkButtonIsEnabled, checkElementIsPresent, checkElementIsVisible, checkInputsTextIsHidden } from "../support/helpers/checks";

export abstract class BasePage {
    protected inputs: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected links: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected fieldErrors: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected buttons: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected labels: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected textMessages: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected dropDownMenus: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected checkBoxes: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    protected imagePlaceholders: {
        [key: string]: ChainablePromiseElement<WebdriverIO.Element>;
    };
    private _rootElement: ChainablePromiseElement<WebdriverIO.Element>;

    public get rootElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this._rootElement;
    }

    public set rootElement(value: ChainablePromiseElement<WebdriverIO.Element>) {
        this._rootElement = value;
    }

    protected getElementProvider = async (elementType) => {
        let elementsProvider;
        switch (elementType) {
            case ELEMENT_TYPE.LINK:
                elementsProvider = this.links;
                break;
            case ELEMENT_TYPE.FIELD_ERROR:
                elementsProvider = this.fieldErrors;
                break;
            case ELEMENT_TYPE.BUTTON:
                elementsProvider = this.buttons;
                break;
            case ELEMENT_TYPE.LABEL:
                elementsProvider = this.labels;
                break;
            case ELEMENT_TYPE.INPUT:
                elementsProvider = this.inputs;
                break;
            case ELEMENT_TYPE.TEXT_MESSAGE:
                elementsProvider = this.textMessages;
                break;
            case ELEMENT_TYPE.DROP_DOWN_MENU:
                elementsProvider = this.dropDownMenus;
                break;
            case ELEMENT_TYPE.CHECKBOX:
                elementsProvider = this.checkBoxes;
                break;
            case ELEMENT_TYPE.IMAGE_PLACEHOLDER:
                elementsProvider = this.imagePlaceholders;
                break;
            default:
        }
        return elementsProvider;
    };

    getElement = async (elemName: ELEMENT_NAME, elemType: ELEMENT_TYPE) => {
        const elementType = await this.getElementProvider(elemType);
        if (elemName in elementType) {
            return elementType[elemName];
        } else {
            throw new Error(`No such ${elemType} with name ${elemName}. Class - ${this.constructor.name}.`);
        }
    };

    checkPageOpened = async (state: boolean) => {
        await waitForElement(this.rootElement);
        await checkElementIsPresent(this.rootElement, state);
    };

    clickOnElement = async (type: ELEMENT_TYPE.BUTTON | ELEMENT_TYPE.LABEL | ELEMENT_TYPE.LINK, elementName: ELEMENT_NAME) => {
        const elem = await this.getElement(elementName, type);
        await elem.scrollIntoView();
        await waitForElementAndClick(elem);
    };

    insertValueInInput = async (inputName: ELEMENT_NAME, value: string | number) => {
        const elem = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        await waitForElementAndSendKeys(elem, value);
    };

    unfocusInputElement = async (inputName: ELEMENT_NAME) => {
        const elem = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        await unfocusInput(elem.selector);
    };

    checkElementVisible = async (elemName: ELEMENT_NAME, elemType: ELEMENT_TYPE, state: boolean) => {
        const elem = await this.getElement(elemName, elemType);
        await checkElementIsVisible(elem, state);
    };

    checkElementPresent = async (elemName: ELEMENT_NAME, elemType: ELEMENT_TYPE, state: boolean) => {
        const elem = await this.getElement(elemName, elemType);
        await checkElementIsPresent(elem, state);
    };

    checkElementIsCurrentlyDisplayed = async (elemName: ELEMENT_NAME, elemType: ELEMENT_TYPE, state: boolean) => {
        const elem = await this.getElement(elemName, elemType);
        const actualElemState = await elem.isDisplayed();
        expect(actualElemState).to.be.equal(state);
    };

    getErrorMessageText = async (fieldName: ELEMENT_NAME) => {
        const elem = await this.getElement(fieldName, ELEMENT_TYPE.FIELD_ERROR);
        return waitForElementAndGetText(elem, TIMEOUTS.DEFAULT_WAIT_TIMEOUT);
    };

    removeSymbolFromInputWithKeyboard = async (inputName: ELEMENT_NAME) => {
        const elem = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        await clearInputWithKeyboard(elem);
    };

    checkButtonEnabled = async (buttonName: ELEMENT_NAME, state: boolean) => {
        const button = await this.getElement(buttonName, ELEMENT_TYPE.BUTTON);
        await checkButtonIsEnabled(button, state);
    };

    checkTextIsHidden = async (inputName: ELEMENT_NAME, isHidden: boolean) => {
        const input = await this.getElement(inputName, ELEMENT_TYPE.INPUT);
        await checkInputsTextIsHidden(input, isHidden);
    };

    hoverOver = async (type: ELEMENT_TYPE, elementName: ELEMENT_NAME) => {
        const elem = await this.getElement(elementName, type);
        await hoverElement(elem);
    };
}
