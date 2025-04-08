//real_estate_tests/pages/my-properties-page.js
const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class MyPropertiesPage extends BasePage{
    PROPERTY_LISTINGS = By.css(".property-item");
    NO_PROPERTY_MESSAGE = By.css(".property-list-container p");

    constructor(driver) {
        super(driver);
    }
    async openMyPropertiesPage() {
        await this.open('/my-properties');
    }
    async getPropertyCount() {
        const elements = await this.findElements(this.PROPERTY_LISTINGS);
        return elements.length;
    }

    async getNoPropertyMessage() {
        return await this.getText(this.NO_PROPERTY_MESSAGE);
    }
}

module.exports = MyPropertiesPage;