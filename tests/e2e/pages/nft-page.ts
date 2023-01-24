import Global from "./global";

export default class NftPage extends Global {
  constructor() {
    super();
  }

  pressPhysical() {
    cy.get('h4:contains("Physical")').should("be.visible").click();
  }

  pressBuyButton() {
    cy.get(`a:contains('redeem')`).should("be.visible").click();
  }
}
