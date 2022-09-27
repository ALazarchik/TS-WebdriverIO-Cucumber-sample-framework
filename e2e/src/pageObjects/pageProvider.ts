import { BasePage } from "./basePage";
import { PAGE_NAMES } from "../support/constants/constants";
import { startPage } from "./startPage";

const pages = new Map<PAGE_NAMES, BasePage>([
    [PAGE_NAMES.START_PAGE, startPage],
]);

export const getPage = async (pageName: PAGE_NAMES) => {
    if (pages.has(pageName)) {
        return pages.get(pageName);
    } else {
        throw new Error(`There is no page named "${pageName}" in the list of pages`);
    }
};
