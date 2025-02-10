describe("Login Test", () => {
  it("should visit the login page", () => {
    cy.visit("https://automaticityacademy.ngrok.app/");
    cy.contains("Log in").click();
  });
});
