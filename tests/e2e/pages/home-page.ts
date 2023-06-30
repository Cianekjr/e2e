import Global from "./global";

export default class HomePage extends Global {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/");
  }
  isOpen() {
    cy.get('h3:contains("Exclusive, time-limited collections of our top partners")').should("be.visible");
  }
}
