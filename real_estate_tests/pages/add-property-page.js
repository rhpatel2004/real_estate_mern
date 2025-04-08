// real_estate_tests/pages/add-property-page.js
const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');
const path = require('path'); // Import the 'path' module

class AddPropertyPage extends BasePage {
    // Locators
    TITLE_INPUT = By.id("title");
    DESCRIPTION_INPUT = By.id("description");
    PRICE_INPUT = By.id("price");
    ADDRESS_INPUT = By.id("address");
    BEDROOM_INPUT = By.id('bedrooms');
    BATHROOM_INPUT = By.id('bathrooms');
    IMAGE_INPUT = By.id("image");
    ADD_PROPERTY_BUTTON = By.css(".add-property-button");
    SUCCESS_MESSAGE = By.css(".add-property-success");
    ERROR_MESSAGE = By.css(".add-property-error");
    constructor(driver) {
        super(driver);
    }

    async enterTitle(title) {
        await this.inputText(this.TITLE_INPUT, title);
    }

    async enterDescription(description) {
        await this.inputText(this.DESCRIPTION_INPUT, description);
    }

    async enterPrice(price) {
        await this.inputText(this.PRICE_INPUT, price);
    }

    async enterAddress(address) {
        await this.inputText(this.ADDRESS_INPUT, address);
    }
    async enterBedroom(bedroom) {
        await this.inputText(this.BEDROOM_INPUT, bedroom);
    }
    async enterBathroom(bathroom) {
        await this.inputText(this.BATHROOM_INPUT, bathroom);
    }
    async uploadImage(imagePath) {
        const absolutePath = path.resolve(imagePath); // Get absolute path
        await this.inputText(this.IMAGE_INPUT, absolutePath);
    }

    async clickAddProperty() {
        await this.click(this.ADD_PROPERTY_BUTTON);
    }

    async getSuccessMessage() {
        return await this.getText(this.SUCCESS_MESSAGE);
    }
    async getErrorMessage() {
        return await this.getText(this.ERROR_MESSAGE);
    }

    async addProperty(title, description, price, address, imagePath, bedroom, bathroom) {
        await this.open("/add-property");
        await this.enterTitle(title);
        await this.enterDescription(description);
        await this.enterPrice(price);
        await this.enterAddress(address);
        await this.enterBedroom(bedroom);
        await this.enterBathroom(bathroom);
        await this.uploadImage(imagePath);
        await this.clickAddProperty();
    }
}

module.exports = AddPropertyPage;