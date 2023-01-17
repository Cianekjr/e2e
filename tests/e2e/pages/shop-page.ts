import { recurse } from "cypress-recurse";

import { Email } from "../helpers/mailer";

import Global from "./global";

export default class ShopPage extends Global {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/stores");
  }

  pressStore(name: string) {
    recurse(
      () =>
        cy
          .wait(500)
          .get(`h4:contains("${name}")`, { timeout: 500 })
          .should(() => ({})),
      (x) => x.length > 0,
      {
        post() {
          cy.scrollTo("bottom", { duration: 100 });
        },
        delay: 100,
        limit: 99999,
        timeout: 100000,
      },
    )
      .closest("a")
      .invoke("removeAttr", "target")
      .click();
  }

  pressBundle(name: string) {
    cy.get(`h5:contains("${name}")`).should("be.visible").click();
  }

  switchNetwork(name: string) {
    cy.get("#mui-component-select-network").should("be.visible").click();
    cy.get(`li h6:contains(${name})`).should("be.visible").click();
  }

  pressCryptoPayment() {
    cy.get('h4:contains("Crypto")').should("be.visible").click();
  }

  pressFiatPayment() {
    cy.get('h4:contains("Fiat")').should("be.visible").click();
  }

  saveFiatPrice() {
    cy.get('h6:contains("USD")')
      .should("be.visible")
      .then(($h6) => {
        const text = $h6.text() || "";
        const price = text.match(/[\d]*(\d+)/)?.[0];

        return price;
      })
      .as("fiatPrice");
  }

  selectToken(name: string) {
    cy.get("#mui-component-select-price").should("be.visible").click();
    cy.get(`li h5:contains(${name})`).should("be.visible").click();
  }

  checkTerms() {
    cy.get(`input[type="checkbox"]`).check();
  }

  pressBuyButton() {
    cy.get(`button:contains('Buy')`).should("be.visible").click();
  }

  pressBuyModalButton() {
    cy.get(`.MuiDialog-root button:contains('Buy')`)
      .should("be.visible")
      .click();
  }

  pressFiatBuyButton() {
    recurse(
      () => {
        cy.get(`button:contains('Buy')`).should("be.visible").click();

        cy.wait(5000);

        return cy
          .get(`[data-testid="transaction-window"]`, {
            timeout: 10000,
          })
          .should(() => ({}));
      },
      (x) => x.length > 0,
      {
        delay: 1000,
        limit: 99999,
        timeout: 100000,
      },
    );
  }

  checkThankYouModal() {
    cy.get(`h3:contains('Thank you!')`, { timeout: 200000 }).should(
      "be.visible",
    );
  }

  closeThankYouModal() {
    cy.get(`[data-testid="CloseIcon"]`);
  }

  // ARI10
  fillAri10Email() {
    cy.task("getMailerEmail").then((email: unknown) => {
      cy.get(`[data-testid="mailAddress__input"]`)
        .should("be.visible")
        .type(email as string);
    });
  }

  submitAri10Email() {
    cy.get(`[data-testid="mailAddress__confirmButton"]`)
      .should("be.visible")
      .click();
  }

  fillAri10PhoneNumber() {
    cy.task("getAri10PhoneNumber").then((value) => {
      cy.get(`[data-testid="phoneNumber__input"]`)
        .should("be.visible")
        .clear()
        .wait(1000)
        .type(String(value));
    });
  }

  submitAri10PhoneNumber() {
    cy.get(`[data-testid="phoneNumber__confirmButton"]`)
      .should("be.visible")
      .click();
  }

  fillAri10Code() {
    cy.task("getAri10Code").then((value) => {
      cy.get(`[data-testid="verificationCode-code-input"]`)
        .should("be.visible")
        .clear()
        .wait(1000)
        .type(String(value));
    });
  }

  submitAri10Code() {
    cy.get(`[data-testid="verificationCode-submit"]`)
      .should("be.visible")
      .click();
  }

  chooseTestPaymentMethod() {
    cy.get(".PaymentMethod__Options").should("be.visible").click();
    cy.get(`[data-value="TEST_METHOD"]`).should("be.visible").click();
  }

  submitAri10PaymentMethod() {
    cy.get(`[data-testid="payment-method-submit"]`)
      .should("be.visible")
      .click();
  }

  checkAri10Terms() {
    cy.get(`[data-testid="agreements-component-check1"]`)
      .should("be.visible")
      .check();

    cy.get(`[data-testid="agreements-component-check3"]`)
      .should("be.visible")
      .check();
  }

  submitAri10Form() {
    cy.get(`[data-testid="agreements-component-confirm-button"]`)
      .should("be.visible")
      .click();
  }

  checkAri10SuccessEmail() {
    cy.task("getEmailMessage", {
      subject: "completed",
    }).should((email: unknown) => {
      const paidPrice = (email as Email).text.match(
        "Amount paid: (.*) USD",
      )?.[1];

      cy.get("@fiatPrice").should((fiatPrice) => {
        expect(paidPrice).to.be.equal(`${fiatPrice}.00`);
      });
    });
  }
}
