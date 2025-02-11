describe("User Registration", () => {
  const newUser = {
    username: "test3",
    email: "test3@example.com",
    password: "password3",
  };

  it("successfully registered user", () => {
    cy.register(newUser.username, newUser.email, newUser.password).then(
      (interception) => {
        expect(interception.response.statusCode).to.be.oneOf([200, 201]);
        cy.url().should("include", "/dashboard");
      }
    );
  });

  it("shows error with invalid email", () => {
    cy.register("invalidUser", "invalid-email", "password123").then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(422);
      }
    );
  });

  it("fails with already registered email", () => {
    cy.register("test1", "test1@example.com", "password1").then(
      (interception) => {
        expect(interception.response.statusCode).to.eq(422);
      }
    );
  });
});
