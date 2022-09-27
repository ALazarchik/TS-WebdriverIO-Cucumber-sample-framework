import { BasePage } from "./basePage";
import { ELEMENT_NAME, URLS } from "../support/constants/constants";

export class StartPage extends BasePage {
    links = {
        [ELEMENT_NAME.HOME]: this.ioLink,
    };

    get rootElement() {
        return $("#__docusaurus");
    }

    get ioLink() {
        return $("a[class='navbar__brand']");
    }

    async openStartPage() {
        await browser.url(URLS.DEV_BASE_URL);
    }
}

export const startPage = new StartPage();