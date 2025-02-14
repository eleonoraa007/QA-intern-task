describe("API Tests", () => {
  it("GET all products", () => {
    cy.intercept("GET", "**/api/v1/products/?search=*").as("productsRequest");

    cy.reload();

    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.visit("/dashboard");

    return cy
      .wait("@productsRequest", { timeout: 10000 })
      .then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
  });

  it("GET products filtered by category", () => {
    cy.intercept("GET", "**/api/v1/products/?search=*").as("productsRequest");

    cy.reload();

    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.wait("@productsRequest", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.contains("GPUs").click();
    cy.contains("Apply filters").click();

    cy.intercept("GET", "**/api/**").as("filteredProductsRequest");

    cy.wait("@filteredProductsRequest", { timeout: 10000 }).then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(200);
      }
    );
  });

  it("GET products filtered by search", () => {
    cy.intercept("GET", "**/api/v1/products/?search=*").as("productsRequest");

    cy.reload();

    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.wait("@productsRequest", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.intercept("GET", "**/api/v1/products/**").as("searchRequest");

    cy.get("#search").type("A");
    cy.get("#search").type("M");
    cy.get("#search").type("D");

    cy.wait("@searchRequest", { timeout: 10000 }).then((interception) => {
      console.log("Request URL:", interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("Add product into cart", () => {
    cy.intercept("GET", "**/api/v1/products/?search=*").as("productsRequest");

    cy.reload();

    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.wait("@productsRequest", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.intercept("POST", "**/api/v1/cart/**").as("addToCart");

    cy.get("[class='px-1 ml-auto p-button p-component']").eq(1).click();

    cy.wait("@addToCart", { timeout: 10000 }).then((interception) => {
      console.log("Request URL:", interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("Removes all the products from the cart", () => {
    cy.intercept("GET", "**/api/v1/products/?search=*").as("productsRequest");

    cy.reload();

    cy.login(Cypress.env("email"), Cypress.env("password"));

    cy.wait("@productsRequest", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get(
      ".inline-flex.items-center.py-2.border.border-transparent.text-sm.leading-4.font-medium.rounded-md.text-primary.hover\\:text-gray-600.focus\\:outline-none.transition.ease-in-out.duration-150.p-button.p-component"
    ).click();
    cy.contains("Clear").click();
  });
});
