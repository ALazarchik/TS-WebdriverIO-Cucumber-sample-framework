import { When } from "@wdio/cucumber-framework";
import { getPage } from "../pageObjects/pageProvider";
import { ELEMENT_NAME, ELEMENT_TYPE, ERROR_MESSAGES, PAGE_NAMES } from "../support/constants/constants";
import { expect } from "chai";
import { checkButtonIsClickable, checkTextVisibilityOnPage } from "../support/helpers/checks";
import { waitForElement, waitMilliseconds } from "../support/helpers/waits";
import { getElementTextWithScript, getInputValue } from "../support/helpers/actions";

When(/^User sees that "([^"]*)" is displayed$/, async (pageName: PAGE_NAMES) => {
    const page = await getPage(pageName);
    await page.checkPageOpened(true);
});

When(
    /^User sees that "([^"]*)" (label|input|button|link|fieldError|dropDownMenu|checkbox|textMessage) is( not|) displayed on "([^"]*)" at this moment$/,
    async (elementName: ELEMENT_NAME, elementType: ELEMENT_TYPE, elementState: string, pageName: PAGE_NAMES) => {
        const page = await getPage(pageName);
        await page.checkElementIsCurrentlyDisplayed(elementName, elementType, !elementState.includes("not"));
    },
);

When(/^User (sees|doesn't see) "([^"]*)" text message on current page$/, async (textState: string, text: string) => {
    const isTextVisible = textState.includes("sees");
    await checkTextVisibilityOnPage(text, isTextVisible);
});

When(
    /^User sees that "([^"]*)" (textMessage|fieldError|button|label) has "([^"]*)" text on "([^"]*)"$/,
    async (
        elementName: ELEMENT_NAME,
        elementType: ELEMENT_TYPE.FIELD_ERROR | ELEMENT_TYPE.TEXT_MESSAGE | ELEMENT_TYPE.BUTTON,
        expectedText: string,
        pageName: PAGE_NAMES,
    ) => {
        const page = await getPage(pageName);
        const element = await page.getElement(elementName, elementType);
        await element.scrollIntoView();
        await page.checkElementVisible(elementName, elementType, true);
        let actualText = (await getElementTextWithScript(element)).trim();
        if (actualText.includes(`"`)) {
            actualText = actualText.replaceAll(`"`, `\``);
        }
        await expect(actualText, ERROR_MESSAGES.ELEMENTS_TEXT_IS_INCORRECT(elementName, elementType, expectedText)).to.be.equal(expectedText.trim());
    },
);

When(/^User sees "([^"]*)" error message for "([^"]*)" input on "([^"]*)"$/, async (message: string, fieldName: ELEMENT_NAME, pageName: PAGE_NAMES) => {
    const page = await getPage(pageName);
    const expectedErrorMessage = message.trim();
    const element = await page.getElement(fieldName, ELEMENT_TYPE.FIELD_ERROR);
    await waitForElement(element);
    const actualErrorMessage = await page.getErrorMessageText(fieldName);
    expect(actualErrorMessage.trim(), ERROR_MESSAGES.ELEMENTS_TEXT_IS_INCORRECT(fieldName, ELEMENT_TYPE.FIELD_ERROR, expectedErrorMessage)).to.be.equal(
        expectedErrorMessage,
    );
});

When(
    /^User sees that "([^"]*)" (button|link) on "([^"]*)" is (|not )clickable$/,
    async (elementName: ELEMENT_NAME, elementType: ELEMENT_TYPE.BUTTON | ELEMENT_TYPE.LINK, pageName: PAGE_NAMES, state: string) => {
        const page = await getPage(pageName);
        const element = await page.getElement(elementName, elementType);
        const elementState = !state.includes("not");
        await checkButtonIsClickable(element, elementState);
    },
);

When(
    /^User clears ([^"]*) symbols? from "([^"]*)" input on "([^"]*)" with keyboard$/,
    async (numberOfSymbols: string, inputName: ELEMENT_NAME, pageName: PAGE_NAMES) => {
        let symbolsAmount = parseInt(numberOfSymbols);
        while (symbolsAmount > 0) {
            symbolsAmount--;
            const page = await getPage(pageName);
            await page.removeSymbolFromInputWithKeyboard(inputName);
        }
    },
);

When(/^User sees (enabled|disabled) "([^"]*)" button on "([^"]*)"$/, async (state: string, buttonName: ELEMENT_NAME, pageName: PAGE_NAMES) => {
    const isEnabled = state.includes("enabled");
    const page = await getPage(pageName);
    await page.checkButtonEnabled(buttonName, isEnabled);
});

When(/^User sees (hidden|revealed) password in "([^"]*)" input on "([^"]*)"$/, async (state: string, inputName: ELEMENT_NAME, pageName: PAGE_NAMES) => {
    const page = await getPage(pageName);
    const textState = state.includes("hidden");
    await page.checkTextIsHidden(inputName, textState);
});

When(/^User waits for "([^"]*)" seconds?$/, async (timeOut: string) => {
    await waitMilliseconds(parseInt(timeOut) * 1000);
});

When(
    /^User waits for "([^"]*)" (label|input|button|link|fieldError|dropDownMenu) to be visible on "([^"]*)"$/,
    async (elementName: ELEMENT_NAME, elementType: ELEMENT_TYPE, pageName: PAGE_NAMES) => {
        const page = await getPage(pageName);
        const element = await page.getElement(elementName, elementType);
        await waitForElement(element);
    },
);

When(/^User goes to (previous|next) page$/, async (direction: string) => {
    direction === "next" ? browser.forward() : browser.back();
});

When(/^User is redirected to page with url that contains "([^"]*)"$/, async (string: string) => {
    let counter = 0;
    while (true) {
        const pageUrl = await browser.getUrl();
        if (pageUrl.includes(string)) {
            break;
        } else {
            ++counter;
            await browser.pause(1000);
            if (counter === 30) {
                throw new Error(`Current page's URL doesn't contain "${string}"`);
            }
        }
    }
});

When(/^User sees that "([^"]*)" input on "([^"]*)" contains "([^"]*)" text$/, async (inputName: ELEMENT_NAME, pageName: PAGE_NAMES, text: string) => {
    const page = await getPage(pageName);
    const expectedText = text.trim();
    const input = await page.getElement(inputName, ELEMENT_TYPE.INPUT);
    const actualErrorMessage = await getInputValue(input);
    expect(actualErrorMessage.trim()).to.be.equal(expectedText);
});

When(/^User hovers over "([^"]*)" ([^"]*) on "([^"]*)"$/, async (elementName: ELEMENT_NAME, elementType: ELEMENT_TYPE, pageName: PAGE_NAMES) => {
    const page = await getPage(pageName);
    const element = await page.getElement(elementName, elementType);
    await browser.executeScript(`document.querySelector(arguments[0]).textContent`, [element.selector]);
    await waitForElement(element);
    await page.hoverOver(elementType, elementName);
});
