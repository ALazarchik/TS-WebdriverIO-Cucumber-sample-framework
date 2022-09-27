import { Given } from "@wdio/cucumber-framework";
import { startPage } from "../pageObjects/startPage";

Given(/^User goes to the start page$/, async () => {
    await startPage.openStartPage();
});