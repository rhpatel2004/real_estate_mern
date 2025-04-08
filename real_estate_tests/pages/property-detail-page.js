// real_estate_tests/pages/property-detail-page.js

const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class PropertyDetailPage extends BasePage {
    TITLE = By.css(".property-detail-title");
    PRICE = By.css(".property-detail-price");
    ADDRESS = By.css(".property-detail-address");
    DESCRIPTION = By.css(".property-detail-description");
    IMAGE = By.css(".property-detail-image");

    constructor(driver) {
        super(driver);
    }

    async getTitle() {
        return await this.getText(this.TITLE);
    }
    async getPrice() {
        return await this.getText(this.PRICE);
    }
    async getAddress() {
        return await this.getText(this.ADDRESS);
    }

    async getDescription() {
        return await this.getText(this.DESCRIPTION);
    }

    async getImageSrc() {
        const element = await this.findElement(this.IMAGE);
        return await element.getAttribute("src");
    }
}

module.exports = PropertyDetailPage;  