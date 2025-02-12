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
});
