import { expect } from "@playwright/test";

export class CustomersListPage {
  constructor(page) {
    this.page = page;

    this.tableRows = page.locator("tbody").getByRole("row");
    this.deleteButtonOnTheLastRow = page
      .getByRole("button", { name: "Delete" })
      .last();

    this.searchField = page.getByPlaceholder("Search Customer");
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }

  async assertCustomerDataIsPresentInLastRow(
    expectedFirstName,
    expectedLastName,
    expectedPostCode,
  ) {
    const lastRow = this.tableRows.last();

    const firstNameCell = lastRow.getByRole("cell").nth(0);
    const lastNameCell = lastRow.getByRole("cell").nth(1);
    const postCodeCell = lastRow.getByRole("cell").nth(2);
    const accountNumberCell = lastRow.getByRole("cell").nth(3);

    await expect(firstNameCell).toContainText(expectedFirstName);
    await expect(lastNameCell).toContainText(expectedLastName);
    await expect(postCodeCell).toContainText(expectedPostCode);

    await expect(accountNumberCell).toBeEmpty();
  }

  getCustomerRowByName(firstName) {
    return this.tableRows.filter({ hasText: firstName });
  }

  async clickDeleteButtonForCustomer(firstName) {
    const customerRow = this.getCustomerRowByName(firstName);

    await customerRow.getByRole("button", { name: "Delete" }).click();
  }

  async assertCustomerRowNotPresent(firstName) {
    const customerRow = this.getCustomerRowByName(firstName);

    await expect(customerRow).toBeHidden();
  }

  async assertAccountNumberOfCustomerNotEmpty() {
    const accountNumberCell = this.tableRows.getByRole("cell").nth(3);

    await expect(accountNumberCell).not.toBeEmpty();
  }

  async fillSearchFieldFirstName(firstName) {
    await this.searchField.fill(firstName);
  }

  async fillSearchFieldLastName(lastName) {
    await this.searchField.fill(lastName);
  }

  async fillSearchFieldPostCode(postCode) {
    await this.searchField.fill(postCode);
  }
}
