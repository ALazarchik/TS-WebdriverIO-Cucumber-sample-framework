import { TIMEOUTS } from "../constants/constants";
import fs from "fs";

const config = {
    specs: ["./features/**/*.feature"],
    maxInstances: 1,
    capabilities: [
        {
            browserName: "chrome",
            acceptInsecureCerts: true,
            "goog:chromeOptions": {
                args: [
                    "--incognito",
                    "--no-sandbox",
                    "--disable-web-security",
                    "--allow-running-insecure-content",
                    "--disable-gpu",
                    "--start-maximized",
                    "disable-extensions",
                    "--disable-infobars",
                    "--disable-dev-shm-usage",
                    // "--window-size=1920,1080",
                    // "--headless",
                ],
            },
        },
    ],
    logLevel: "error",
    bail: 0,
    reporters: [
        "spec",
        [
            "allure",
            {
                outputDir: "./allure-results",
            },
        ],
    ],
    waitforTimeout: TIMEOUTS.DEFAULT_WAIT_TIMEOUT,
    connectionRetryTimeout: TIMEOUTS.CONNECTION_RETRY,
    connectionRetryCount: 3,
    services: ["chromedriver"],
    framework: "cucumber",
    cucumberOpts: {
        require: ["./src/stepDefinitions/**/*.ts"],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ["pretty"],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: "@all",
        timeout: TIMEOUTS.CUCUMBER,
        ignoreUndefinedDefinitions: false,
        retry: 0,
    },
    onPrepare: async function () {
        const allureResults = `./allure-results/`;
        if (fs.existsSync(allureResults)) {
            await fs.rmSync(allureResults, { recursive: true, force: true });
        }
        const allureReport = `./allure-report/`;
        if (fs.existsSync(allureReport)) {
            await fs.rmSync(allureReport, { recursive: true, force: true });
        }
    },
    afterScenario: async function () {
        await browser.execute("window.localStorage.clear()");
        await browser.refresh();

        await async function () {
            const windows = await browser.getWindowHandles();
            if (windows.length > 1) {
                for (const window of windows.splice(1, windows.length)) {
                    await browser.switchToWindow(window);
                    await browser.closeWindow();
                }
            }
        };
    },
    afterStep: async function (step, scenario, { error }) {
        if (error) {
            await browser.takeScreenshot();
        }
    },
};

module.exports = { config };
