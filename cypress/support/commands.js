Cypress.Commands.add("register", (username, email, password) => {
  cy.visit("/register");

  cy.get("#username").should("be.visible").type(username);
  cy.get("#email").should("be.visible").type(email);
  cy.get("#password").should("be.visible").type(password);

  cy.intercept({
    method: "POST",
    url: "**/register*",
  }).as("registrationRequest");

  cy.contains("button", "Register").click();
  return cy.wait("@registrationRequest", { timeout: 10000 });
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");

  cy.get("#email").should("be.visible").type(email);
  cy.get("#password").should("be.visible").type(password);

  cy.intercept({
    method: "POST",
    url: "**/login*",
  }).as("loginRequest");

  cy.contains("button", "Sign in").click();
  return cy.wait("@loginRequest", { timeout: 10000 });
});
