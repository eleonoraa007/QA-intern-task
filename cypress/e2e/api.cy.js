describe("API Tests", () => {
  it("GET all products", () => {
    cy.intercept({
      method: "GET",
      url: "**/products*",
    }).as("productsRequest");

    cy.login("testUser1@example.com", "passwordUser1").then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
    });

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

    cy.login("testUser1@example.com", "passwordUser1");

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

    cy.login("testUser1@example.com", "passwordUser1");

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

    cy.login("testUser1@example.com", "passwordUser1");

    cy.wait("@productsRequest", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // cy.intercept("GET", "**/api/v1/products/**").as("addToCart");
    cy.intercept("POST", "**/api/v1/cart/**").as("addToCart");

    // cy.get(".p-tooltip-target-wrapper").first().click();
    cy.get("[class='px-1 ml-auto p-button p-component']").first().click();

    cy.wait("@addToCart", { timeout: 10000 }).then((interception) => {
      console.log("Request URL:", interception.request.url);
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});
