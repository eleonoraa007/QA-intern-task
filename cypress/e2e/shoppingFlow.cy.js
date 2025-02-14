describe("E2E Tests", () => {
  it("Complete shopping flow - login, search, filter, add to cart", () => {
    cy.intercept("GET", "**/api/v1/products/?search=*").as("productsRequest");

    cy.reload();

    // Login
    cy.intercept({
      method: "POST",
      url: "**/login*",
    }).as("loginRequest");

    cy.visit("/login");

    cy.get("#email").should("be.visible").type(Cypress.env("email"));
    cy.get("#password").should("be.visible").type(Cypress.env("password"));

    cy.contains("button", "Sign in").click();

    cy.wait("@loginRequest", { timeout: 10000 });
    cy.wait("@productsRequest", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Search for a product
    cy.intercept("GET", "**/api/v1/products/**").as("searchRequest");

    cy.get("#search").type("A");
    cy.get("#search").type("M");
    cy.get("#search").type("D");

    cy.wait("@searchRequest", { timeout: 10000 }).then((interception) => {
      console.log("Request URL:", interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });

    // Apply category filter
    cy.intercept("GET", "**/api/**").as("filteredProductsRequest");

    cy.contains("GPUs").click();
    cy.contains("Apply filters").click();

    cy.wait("@filteredProductsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(200);
      }
    );

    // Add product to cart
    cy.intercept("POST", "**/api/v1/cart/**").as("addToCart");

    cy.get("[class='px-1 ml-auto p-button p-component']").first().click();

    cy.wait("@addToCart", { timeout: 10000 }).then((interception) => {
      console.log("Request URL:", interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});
