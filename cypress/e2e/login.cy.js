describe("User Login", () => {
  it("successfully logs in with valid credentials", () => {
    const validUser = {
      email: "testUser1@example.com",
      password: "passwordUser1",
    };
    cy.login(validUser.email, validUser.password).then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      cy.url().should("include", "/dashboard");
    });
  });
});

it("shows error with invalid email format", () => {
  cy.login("invalidemail", "password123").then((interception) => {
    expect(interception.response.statusCode).to.eq(422);
  });
});

it("shows error with incorrect password", () => {
  cy.login("valid@email.com", "wrongpassword").then((interception) => {
    expect(interception.response.statusCode).to.eq(401);
  });
});
it("fails with non-existent email", () => {
  cy.login("example@example.com", "password123").then((interception) => {
    expect(interception.response.statusCode).to.eq(401);
  });
});
