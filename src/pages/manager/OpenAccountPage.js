import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator("#currency");
    this.customerDropdown = page.locator("#userSelect");
    this.processButton = page.getByRole("button", { name: "Process" });
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }

  async selectCurrency(currencyName) {
    await this.currencyDropdown.selectOption({ label: currencyName });
  }

  async assertCurencyIsSelected(expectedCurrency) {
    const selectedValue = await this.currencyDropdown.inputValue();
    expect(selectedValue).toBe(expectedCurrency);
  }

  async selectCustomerFromDropdown(fullName) {
    await this.customerDropdown.selectOption({ label: fullName });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
