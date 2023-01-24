import Global from "./global";

export default class RedeemPage extends Global {
  constructor() {
    super();
  }

  fillRedeemForm(size) {
    cy.waitForResources();

    cy.get("body").then(($body) => {
      if ($body.find('span:contains("Order to same address")').length > 0) {
        cy.get(`span:contains("Order to same address")`)
          .should("be.visible")
          .click();
        cy.get(`button:contains("Confirm")`).should("be.visible").click();

        cy.wait(3000);
        cy.get("#mui-component-select-size").should("be.visible").click();
        cy.get(`li:contains(${size})`).should("be.visible").click();
      } else {
        cy.get("#nickname").should("be.visible").type("Uniqly");

        cy.get("#mui-component-select-size").should("be.visible").click();
        cy.get(`li:contains(${size})`).should("be.visible").click();

        cy.get("#firstName").should("be.visible").type("Matthieu");
        cy.get("#lastName").should("be.visible").type("MatthieuLast");

        cy.get("#mui-component-select-country").should("be.visible").click();
        cy.get(`li:contains("Albania")`).should("be.visible").click();

        cy.get("#postalCode").should("be.visible").type("01111");
        cy.get("#city").should("be.visible").type("Warsaw");
        cy.get("#address").should("be.visible").type("Daszynskiego 123");
        cy.get("#apartment").should("be.visible").type("11");
        cy.get("#phoneNumber").should("be.visible").type("+48123321123");
      }
    });
  }

  pressCryptoPayment() {
    cy.get('h4:contains("Crypto")').should("be.visible").click();
  }

  selectToken(name: string) {
    cy.get("#mui-component-select-price").should("be.visible").click();
    cy.get(`li h5:contains(${name})`).should("be.visible").click();
  }

  checkTerms() {
    cy.get(`input[type="checkbox"]`).check();
  }

  pressRedeemButton() {
    cy.get(`button:contains('Redeem')`).should("be.visible").click();
  }

  pressRedeemModalButton() {
    cy.get(`.MuiDialog-root button:contains('Redeem')`)
      .should("be.visible")
      .click();
  }

  checkThankYouModal() {
    cy.get(`h3:contains('Thank you!')`, { timeout: 200000 }).should(
      "be.visible",
    );
  }
}
