import { ChainablePromiseElement } from "webdriverio";
import { expect } from "chai";
import { DEFAULT_TIMEOUT } from "@wdio/cucumber-framework/build/constants";
import { ERROR_MESSAGES } from "../constants/constants";
import { waitForElement } from "./waits";

export const checkElementIsVisible = async (elem: ChainablePromiseElement<WebdriverIO.Element>, isVisible = true, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForExist({
        timeout: timeout,
        reverse: !isVisible,
        timeoutMsg: isVisible ? ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await elem.selector) : ERROR_MESSAGES.ELEMENT_IS_PRESENT(await elem.selector),
    });
    expect(await elem.isDisplayed()).equal(
        isVisible,
        isVisible ? ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await elem.selector) : ERROR_MESSAGES.ELEMENT_IS_PRESENT(await elem.selector),
    );
};

export const checkElementIsPresent = async (elem: ChainablePromiseElement<WebdriverIO.Element>, isPresent = true) => {
    const errorMessage = isPresent ? ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await elem.selector) : ERROR_MESSAGES.ELEMENT_IS_PRESENT(await elem.selector);
    expect(await elem.isExisting()).equal(isPresent, errorMessage);
};

export const checkTextVisibilityOnPage = async (text: string, isVisible = true) => {
    const elem = browser.$(`//*[normalize-space(text()) = "${text}"]`);
    await waitForElement(elem);
    if (isVisible) await checkElementIsVisible(elem);
    else await checkElementIsPresent(elem, false);
};

export const checkButtonIsClickable = async (elem: ChainablePromiseElement<WebdriverIO.Element>, isClickable = true, timeout = DEFAULT_TIMEOUT) => {
    await elem.waitForExist({ timeout: timeout });
    const buttonActualState = await elem.isClickable();
    expect(buttonActualState).to.equal(isClickable);
};

export const checkButtonIsEnabled = async (button: ChainablePromiseElement<WebdriverIO.Element>, isEnabled = true, timeout = DEFAULT_TIMEOUT) => {
    await button.waitForDisplayed({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_VISIBLE(await button.selector),
        timeout: timeout,
    });
    const errorMessage = isEnabled ? ERROR_MESSAGES.ELEMENT_IS_DISABLED(await button.selector) : ERROR_MESSAGES.ELEMENT_IS_ENABLED(await button.selector);
    if (isEnabled) {
        await button.waitForClickable({
            timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_CLICKABLE(await button.selector),
            timeout: timeout,
        });
    }
    const buttonEnabled = !(await button.getAttribute("class")).includes("disabled");
    expect(buttonEnabled).to.equal(isEnabled, errorMessage);
};

export const checkInputsTextIsHidden = async (input: ChainablePromiseElement<WebdriverIO.Element>, isHidden: boolean, timeout = DEFAULT_TIMEOUT) => {
    await input.waitForExist({
        timeoutMsg: ERROR_MESSAGES.ELEMENT_IS_NOT_PRESENT(await input.selector),
        timeout: timeout,
    });
    const errorMessage = isHidden ? ERROR_MESSAGES.TEXT_IS_VISIBLE(await input.selector) : ERROR_MESSAGES.TEXT_IS_NOT_VISIBLE(await input.selector);
    const attributeTypeValue = await input.getAttribute("type");
    const isTextHidden = attributeTypeValue.includes("password");
    expect(isTextHidden).to.equal(isHidden, errorMessage);
};

export const checkElementIsEnabled = async (element: ChainablePromiseElement<WebdriverIO.Element>, isEnabled = true) => {
    const errorMessage = isEnabled
        ? ERROR_MESSAGES.ELEMENT_IS_DISABLED(await element.selector)
        : ERROR_MESSAGES.ELEMENT_IS_ENABLED(await element.selector);

    const elementEnabled = !(await browser.executeScript(`return document.querySelector(arguments[0]).disabled`, [await element.selector]));
    expect(elementEnabled).to.equal(isEnabled, errorMessage);
};
