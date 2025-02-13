describe("Cover flow of shopping new product from the store", () => {
  it("Adds product to cart and handles checkout", () => {
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

    // Apply category filter
    cy.intercept("GET", "**/api/**").as("filteredProductsRequest");

    cy.contains("CPUs").click();
    cy.contains("Apply filters").click();

    cy.wait("@filteredProductsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(200);
      }
    );

    //Add product to cart
    cy.intercept("POST", "**/api/v1/cart/**").as("addToCart");

    cy.get("[class='px-1 ml-auto p-button p-component']").first().click();

    cy.wait("@addToCart", { timeout: 10000 }).then((interception) => {
      console.log("Request URL:", interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });
    //Checkout
    cy.get(
      ".inline-flex.items-center.py-2.border.border-transparent.text-sm.leading-4.font-medium.rounded-md.text-primary.hover\\:text-gray-600.focus\\:outline-none.transition.ease-in-out.duration-150.p-button.p-component"
    ).click();
    cy.contains("Checkout").click();
    cy.get('button[aria-label="Next step"]').click();
    cy.get('button[aria-label="Make changes"]').click();
    cy.get('button[aria-label="Update"]').click();
    cy.get('button[aria-label="Next step"]').click();
  });
});
