describe("Register Test", () => {
  it("should visit the register page", () => {
    cy.visit("https://automaticityacademy.ngrok.app/");
    cy.contains("Register").click();
  });
});
