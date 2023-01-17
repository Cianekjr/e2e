import Global from "./global";

export default class HomePage extends Global {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/");
  }
}
