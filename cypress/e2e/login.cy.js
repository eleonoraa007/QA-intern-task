describe("User Login", () => {
  it("successfully logs in with valid credentials", () => {
    const validUser = {
      email: "testUser1@example.com",
      password: "passwordUser1",
    };
    cy.login(validUser.email, validUser.password);
  });
});
