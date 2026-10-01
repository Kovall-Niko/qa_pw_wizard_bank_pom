import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.fieldFirstName = page.getByPlaceholder("First Name");
    this.fieldLastName = page.getByPlaceholder("Last Name");
    this.fieldPostCode = page.getByPlaceholder("Post Code");
    this.addCustumeButton = page
      .getByRole("form")
      .getByRole("button", { name: "Add Customer" });
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
  }

  async fillFieldFirstName(name) {
    await this.fieldFirstName.fill(name);
  }

  async fillFieldLastName(name) {
    await this.fieldLastName.fill(name);
  }

  async fillFieldPostCode(numb) {
    await this.fieldPostCode.fill(numb);
  }

  async clickAddCustumeButton() {
    await this.addCustumeButton.click();
  }
}
