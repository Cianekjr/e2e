import Global from "./global";

export default class Auth extends Global {
  constructor() {
    super();
  }

  pressLoginButton() {
    cy.get('button[type="button"]:contains("SIGN IN")')
      .should("be.visible")
      .click();
  }

  pressConnectMetamask() {
    cy.get('span:contains("metamask wallet")').should("be.visible").click();
  }

  isLoggedIn() {
    cy.get('a:contains("My items")').should("be.visible");
  }

  pressSignUpTab() {
    cy.get('button:contains("Sign up")').should("be.visible").click();
  }

  fillEmail(email?: string) {
    if (email) {
      cy.get("#email").should("be.visible").type(email);
    } else {
      cy.task("getMailerEmail").then((email: unknown) => {
        cy.get("#email")
          .should("be.visible")
          .type(email as string);
      });
    }
  }

  fillPassword(password: string) {
    cy.get("#password").should("be.visible").type(password);
  }

  fillConfirmPassword(passwordConfirm: string) {
    cy.get("#passwordConfirm").should("be.visible").type(passwordConfirm);
  }

  checkTerms() {
    cy.get(`input[type="checkbox"]`).check();
  }

  submitSignUp() {
    cy.get('button[type="submit"]:contains("SIGN UP")')
      .should("be.visible")
      .click();
  }

  checkSignUp() {
    cy.get('div:contains("Registration has been completed")').should(
      "be.visible",
    );
  }

  submitSignIn() {
    cy.get('button[type="submit"]:contains("SIGN IN")')
      .should("be.visible")
      .click();
  }
}
