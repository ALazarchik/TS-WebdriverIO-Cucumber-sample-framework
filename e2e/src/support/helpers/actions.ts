import { ChainablePromiseElement, Selector } from "webdriverio";
import { DEFAULT_TIMEOUT } from "@wdio/cucumber-framework/build/constants";
import { ERROR_MESSAGES } from "../constants/constants";
import { waitForElement } from "./waits";

export const getElementText = async (elem: ChainablePromiseElement<WebdriverIO.Element>, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    return await elem.getText();
};

export const unfocusInput = async (selector: Selector) =>
    await browser.execute((selector: string) => (document.querySelector(selector) as HTMLInputElement).blur(), selector);

export const clearInputWithKeyboard = async (elem: ChainablePromiseElement<WebdriverIO.Element>, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForExist({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await elem.selector),
        timeout: timeout,
    });
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    await elem.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
};

export const hitButtonOnKeyboard = async (buttonName: "," | "Space" | "Return") => {
    await browser.keys(buttonName);
};

export const getInputValue = async (elem: ChainablePromiseElement<Promise<WebdriverIO.Element>>, attribute = true, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    return attribute ? await elem.getAttribute("value") : await elem.getValue();
};

export const getElementTextWithScript = async (elem: ChainablePromiseElement<WebdriverIO.Element>, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    return await browser.executeScript(`return document.querySelector(arguments[0]).textContent`, [elem.selector]);
};

export const hoverElement = async (elem: ChainablePromiseElement<WebdriverIO.Element>, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    await elem.moveTo();
};

export const getElementValueWithScript = async (elem: ChainablePromiseElement<WebdriverIO.Element>, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await elem.selector),
        timeout: timeout,
    });
    return await browser.executeScript(`return document.querySelector(arguments[0]).value`, [elem.selector]);
};

export const getAttributesValueOfElement = async (element: ChainablePromiseElement<WebdriverIO.Element>, attribute: string): Promise<string> => {
    await waitForElement(element);
    return element.getAttribute(attribute);
};
