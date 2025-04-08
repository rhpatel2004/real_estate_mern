// real_estate_tests/pages/home-page.js
const { By } = require('selenium-webdriver');
const BasePage = require('./base-page');

class HomePage extends BasePage {
    // Locators
    LOGIN_LINK = By.linkText("Login");
    REGISTER_LINK = By.linkText("Register");
    ADD_PROPERTY_LINK = By.linkText("Add Property");
    MY_PROPERTIES_LINK = By.linkText("My property");
    LOGOUT_BUTTON = By.css(".navbar-logout-button");
    PROPERTY_LISTINGS = By.css(".property-item");
    PROPERTY_LINK = By.css(".property-item-link");

    constructor(driver) {
        super(driver);
    }

    async goToLogin() {
        await this.click(this.LOGIN_LINK);
    }

    async goToRegister() {
        await this.click(this.REGISTER_LINK);
    }
    async isLogoutButtonDisplayed() {
        return await this.isDisplayed(this.LOGOUT_BUTTON);
    }
    async clickAddPropertyLink() {
        await this.click(this.ADD_PROPERTY_LINK);
    }
    async getPropertyCount() {
        const elements = await this.findElements(this.PROPERTY_LISTINGS);
        return elements.length;
    }
    async clickMyPropertiesLink() {
        await this.click(this.MY_PROPERTIES_LINK);
    }
    async clickLogoutButton() {
        await this.click(this.LOGOUT_BUTTON);
    }

    async clickPropertyLink() {
        await this.click(this.PROPERTY_LINK);
    }
}

module.exports = HomePage;