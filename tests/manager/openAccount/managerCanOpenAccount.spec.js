import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { OpenAccountPage } from "../../../src/pages/manager/OpenAccountPage";
import { BankHomePage } from "../../../src/pages/BankHomePage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";
import { BankManagerMainPage } from "../../../src/pages/manager/BankManagerMainPage";

let firstName;
let lastName;
let postCode;
let fullName;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();
  fullName = `${firstName} ${lastName}`;

  await addCustomerPage.open();
  await addCustomerPage.fillFieldFirstName(firstName);
  await addCustomerPage.fillFieldLastName(lastName);
  await addCustomerPage.fillFieldPostCode(postCode);
  await addCustomerPage.clickAddCustumeButton();
  await page.reload();

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test("Assert manager can add new customer", async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCustomerFromDropdown(fullName);
  await openAccountPage.selectCurrency("Dollar");
  await openAccountPage.clickProcessButton();
  await page.reload();
  await bankManagerMainPage.clickCustomersButton();

  await customersListPage.open();
  await customersListPage.assertAccountNumberOfCustomerNotEmpty();
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
