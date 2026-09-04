# SauceDemo Shopping Flow Test Plan

## Overview
This plan validates the core shopping flow on SauceDemo at https://www.saucedemo.com/.

The focus areas are:
- successful login
- invalid login
- adding products to cart
- removing products from cart
- verifying cart contents

## Objective
Confirm that users can sign in with valid credentials, are blocked with invalid credentials, add and remove items from the cart, and verify the correct products appear in the cart before checkout.

## Scope
In scope:
- Login page behavior
- Inventory page interactions
- Cart page validations
- Product selection and removal flows

Out of scope:
- Checkout completion
- Payment and order confirmation steps
- User profile or account management

## Environment
- Application URL: https://www.saucedemo.com/
- Browser: Chromium (Playwright)
- Test data:
  - Valid username: standard_user
  - Valid password: secret_sauce
  - Locked-out username: locked_out_user
  - Invalid password: wrong_password
  - Common inventory products:
    - Sauce Labs Backpack
    - Sauce Labs Bike Light
    - Sauce Labs Bolt T-Shirt
    - Sauce Labs Fleece Jacket
    - Sauce Labs Onesie
    - Test.allTheThings() T-Shirt (Red)

## Preconditions
- The SauceDemo site is available and the page loads successfully.
- The login page displays the accepted usernames and the shared password.
- The inventory page contains the products used in the tests.

## Test Cases

### TC-01: Successful login with valid credentials
Priority: High

Steps:
1. Open https://www.saucedemo.com/
2. Enter username `standard_user`
3. Enter password `secret_sauce`
4. Click the Login button

Expected result:
- The user is redirected to the inventory page.
- The inventory page loads successfully.
- The page heading is `Products`.
- The product sort control is available with `Name (A to Z)` selected by default.
- The shopping cart link is visible.
- Six products are displayed.

### TC-02: Invalid login with wrong password
Priority: High

Steps:
1. Open https://www.saucedemo.com/
2. Enter username `standard_user`
3. Enter password `wrong_password`
4. Click the Login button

Expected result:
- Login fails.
- The error message `Epic sadface: Username and password do not match any user in this service` is displayed.
- The user remains on the login page.
- No inventory products are shown.

### TC-03: Invalid login with locked-out user
Priority: High

Steps:
1. Open https://www.saucedemo.com/
2. Enter username `locked_out_user`
3. Enter password `secret_sauce`
4. Click the Login button

Expected result:
- Login fails.
- The error message `Epic sadface: Sorry, this user has been locked out.` is displayed.
- The user remains on the login page.

### TC-04: Add a single product to cart
Priority: High

Steps:
1. Log in with valid credentials.
2. Locate `Sauce Labs Backpack` on the inventory page.
3. Click Add to cart for that product.
4. Observe the cart badge or cart icon.

Expected result:
- The product is added to the cart.
- The button changes to `Remove`.
- The cart count updates to 1.

### TC-05: Add multiple products to cart
Priority: High

Steps:
1. Log in with valid credentials.
2. Add `Sauce Labs Backpack` to the cart.
3. Add `Sauce Labs Bike Light` to the cart.
4. Add `Sauce Labs Bolt T-Shirt` to the cart.

Expected result:
- All selected products are added successfully.
- Each product button changes to `Remove`.
- The cart count reflects the total number of items (3).

### TC-06: Remove a product from cart from the inventory page
Priority: High

Steps:
1. Log in with valid credentials.
2. Add `Sauce Labs Backpack` to the cart.
3. Click `Remove` on `Sauce Labs Backpack` from the inventory page.

Expected result:
- The item is removed from the cart.
- The `Add to cart` button is visible again.
- The cart count returns to zero if no other products remain, and the cart badge is no longer shown.

### TC-07: Remove a product from the cart page
Priority: High

Steps:
1. Log in with valid credentials.
2. Add `Sauce Labs Backpack` and `Sauce Labs Bike Light` to the cart.
3. Open the cart.
4. Click `Remove` for `Sauce Labs Backpack`.

Expected result:
- `Sauce Labs Backpack` is removed from the cart list.
- `Sauce Labs Bike Light` remains in the cart.
- The cart badge reflects the updated item count.

### TC-08: Verify cart contents after adding products
Priority: High

Steps:
1. Log in with valid credentials.
2. Add `Sauce Labs Backpack` and `Sauce Labs Bike Light` to the cart.
3. Open the cart.

Expected result:
- The cart page displays both products.
- The product names match the selected items.
- The cart item count matches the number of added products.
- Each cart row shows quantity `1`, a product name, description, price, and a `Remove` button.

### TC-09: Verify empty cart after removing all products
Priority: Medium

Steps:
1. Log in with valid credentials.
2. Add `Sauce Labs Backpack` to cart.
3. Open the cart.
4. Remove the product.

Expected result:
- The cart is empty.
- The cart page remains on `Your Cart` with no cart item rows.
- The cart badge is not shown.

## Test Data Matrix

| Scenario | Username | Password | Expected Result |
| --- | --- | --- | --- |
| Valid login | standard_user | secret_sauce | Successful redirect to inventory |
| Invalid password | standard_user | wrong_password | Exact invalid-credentials error shown |
| Locked-out user | locked_out_user | secret_sauce | Exact locked-out error shown |

## Exit Criteria
The feature is considered ready when:
- All critical test cases pass in the supported browser.
- Valid and invalid login flows work as expected.
- Product addition and removal actions update cart state correctly.
- Cart contents match the selected products exactly.

## Risk Coverage
- Incorrect credential validation may allow unauthorized access or block valid users.
- Cart state errors could cause product counts or visibility to be wrong.
- Removal from inventory vs cart page must behave consistently.
- Cart state persists across navigation, so automated tests should reset app state or explicitly empty the cart during setup.

## Automation Notes
- Use Playwright page objects or component-level helpers for login, inventory, and cart interactions.
- Assertion points should verify UI state, cart count, and item labels.
- Prefer deterministic product names from the inventory list to avoid brittle tests.
