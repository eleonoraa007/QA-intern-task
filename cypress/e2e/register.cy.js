describe("User Registration", () => {
  const newUser = {
    username: "test1",
    email: "test1@example.com",
    password: "password1",
  };

  it("successfully registered user", () => {
    cy.register(newUser.username, newUser.email, newUser.password);
  });
});
