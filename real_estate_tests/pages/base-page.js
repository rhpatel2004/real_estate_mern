// real_estate_tests/pages/base-page.js
const { By, until } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.baseUrl = "http://localhost:5173";  // Replace with your frontend URL
        this.timeout = 10000;
    }

    async open(path = "/") {
        await this.driver.get(this.baseUrl + path);
    }

    async findElement(locator, time = this.timeout) {
        try {
             return await this.driver.wait(until.elementLocated(locator), time);
        } catch (error) {
             throw new Error(`Element not found within ${time} ms: ${locator}, Error: ${error}`);
        }
       
    }

    async findElements(locator, time = this.timeout) {
          try {
            return await this.driver.wait(until.elementsLocated(locator), time);
          } catch {
             throw new Error(`Elements not found within ${time} ms: ${locator}`);
          }
    }

    async click(locator, time = this.timeout) {
        const element = await this.findElement(locator, time);
        await element.click();
    }

    async inputText(locator, text, time = this.timeout) {
        const element = await this.findElement(locator, time);
        await element.clear();
        await element.sendKeys(text);
    }

    async isDisplayed(locator, time = this.timeout) {
        try {
            const element = await this.findElement(locator, time);
            return await element.isDisplayed();
        } catch (error) {
            return false; // Element not found, so not displayed
        }
    }

    async getText(locator, time = this.timeout) {
        const element = await this.findElement(locator, time);
        return await element.getText();
    }
    async waitFotUrlChange(expectedUrl, time=this.timeout) {
        try {
            await this.driver.wait(until.urlIs(this.baseUrl + expectedUrl), time);
            return true;
        } catch(error) {
             console.error(`URL did not change to ${expectedUrl} within ${time} ms. Current URL: ${await this.driver.getCurrentUrl()}`);
             return false;
        }
    }
}

module.exports = BasePage;