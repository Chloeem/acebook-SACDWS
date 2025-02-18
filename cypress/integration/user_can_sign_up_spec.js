describe("Registration", () => {
  it("A user signs up and is redirected to posts", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("sign_in@example.com");
    cy.get("#password").type("Passw0rd!");
    cy.get('#firstName').type("first name");
    cy.get('#surName').type('surname');
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("should return a message if the email is already in use", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someoneelse@example.com");
    cy.get("#password").type("Passw0rd!");
    cy.get("#submit").click();

    cy.visit("/users/new");
    cy.get("#email").type("someoneelse@example.com");
    cy.get("#password").type("Passw0rd!");
    cy.get("#submit").click();

    cy.get("#error").should("have.text", "This email is already in use, please try again")
  });
});