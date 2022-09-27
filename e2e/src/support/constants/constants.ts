import { Selector } from "webdriverio";

export const TEST_USER_DATA = {};

export const TIMEOUTS = {
    CUCUMBER: 120000,
    CONNECTION_RETRY: 120000,
    DEFAULT_WAIT_TIMEOUT: 15000,
};

export const URLS = {
    DEV_BASE_URL: "https://webdriver.io/",
};

export enum ELEMENT_NAME {
    HOME = "home"
}

export enum ELEMENT_TYPE {
    BUTTON = "button",
    LABEL = "label",
    LINK = "link",
    INPUT = "input",
    FIELD_ERROR = "field error",
    TEXT_MESSAGE = "text message",
    DROP_DOWN_MENU = "dropdown menu",
    CHECKBOX = "checkbox",
    IMAGE_PLACEHOLDER = "image placeholder",
}

export const ERROR_MESSAGES = {
    ELEMENT_IS_NOT_VISIBLE: (selector: Selector) => `Element is not visible: ${selector}`,
    ELEMENT_IS_VISIBLE: (selector: Selector) => `Element is visible: ${selector}`,
    ELEMENT_IS_PRESENT: (selector: Selector) => `Element is present: ${selector}`,
    ELEMENT_IS_NOT_PRESENT: (selector: Selector) => `Element is not present: ${selector}`,
    ELEMENT_IS_DISABLED: (selector: Selector) => `Element is disabled: ${selector}`,
    ELEMENT_IS_ENABLED: (selector: Selector) => `Element is enabled: ${selector}`,
    ELEMENT_IS_NOT_CLICKABLE: (selector: Selector) => `Element is not clickable: ${selector}`,
    TEXT_IS_VISIBLE: (selector) => `Text in input with ${selector} selector is visible`,
    TEXT_IS_NOT_VISIBLE: (selector) => `Text in input with ${selector} selector is not visible`,
    NO_DATA_PASSED_FOR_USER: `No data passed for the user.`,
    ELEMENTS_TEXT_IS_INCORRECT: (elementName: ELEMENT_NAME, elementType: ELEMENT_TYPE, expectedText: string) =>
        `"${elementName}" ${elementType}'s text should be: "${expectedText}"`,
    WRONG_EMAIL_ADDRESS: `Wrong email address. Please provide the correct one.`,
    INCORRECT_LOGIN_CREDENTIALS: `Login credentials were incorrect. Please try again`,
    INCORRECT_INPUT_VALUE_LENGTH: (expectedValueLength: string, actualValueLength: string) =>
        `Input value length is ${actualValueLength}, but expected to be ${expectedValueLength}.`,
    INCORRECT_ELEMENT_TYPE_PROVIDED: `Incorrect type of element provided`,
};

export enum PAGE_NAMES {
    START_PAGE = "Start Page"
}
