describe("API Tests", () => {
  it("GET /api/v1/products", () => {
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
});
