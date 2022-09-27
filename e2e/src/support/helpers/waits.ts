import { ChainablePromiseElement } from "webdriverio";
import { ERROR_MESSAGES, TIMEOUTS } from "../constants/constants";
import { expect } from "chai";

export const waitForElement = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    isDisplayed = true,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    const timeAmountToWait = (timeout * 10) / 1000;
    const timeoutMsg = isDisplayed
        ? ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await element.selector)
        : ERROR_MESSAGES.ELEMENT_IS_VISIBLE(await element.selector);
    let currentElementState: boolean;

    for (let i = 0; i < timeAmountToWait; i++) {
        currentElementState = await element.isDisplayed();
        await waitMilliseconds(100);
        if (currentElementState === isDisplayed) {
            break;
        }
    }
    expect(currentElementState).to.be.equal(isDisplayed, timeoutMsg);
};

export const waitForElementToBeClickable = async (element: ChainablePromiseElement<WebdriverIO.Element>, timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT) => {
    const timeAmountToWait = (timeout * 10) / 1000;
    let currentElementState: boolean;

    for (let i = 0; i < timeAmountToWait; i++) {
        currentElementState = await element.isClickable();
        await waitMilliseconds(100);
        if (currentElementState === true) {
            break;
        }
    }
    expect(currentElementState).to.be.equal(true, ERROR_MESSAGES.ELEMENT_IS_NOT_CLICKABLE(await element.selector));
};

export const waitForElementAndClick = async (element: ChainablePromiseElement<WebdriverIO.Element>, timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT) => {
    await waitForElement(element, true, timeout);
    await waitForElementToBeClickable(element, timeout);
    await element.click();
};

export const waitForElementAndSendKeys = async (
    element: ChainablePromiseElement<WebdriverIO.Element>,
    text: string | number,
    timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
) => {
    await waitForElement(element, true, timeout);
    await waitForElementToBeClickable(element, timeout);
    await element.clearValue();
    await element.setValue(text);
};

export const waitForElementAndGetText = async (element: ChainablePromiseElement<WebdriverIO.Element>, timeout = TIMEOUTS.DEFAULT_WAIT_TIMEOUT) => {
    await waitForElement(element, true, timeout);
    return element.getText();
};

export const waitMilliseconds = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
