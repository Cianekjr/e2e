import { recurse } from "cypress-recurse";

import Global from "./global";

export default class MyItemsPage extends Global {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/my-items");
  }

  pressItemToRedeem(name) {
    cy.waitForResources();

    recurse(
      () => cy.contains("b", `${name} #`, { timeout: 1000 }).should(() => ({})),
      (x) => x.length > 0,
      {
        post() {
          cy.get(`[data-testid="NavigateNextIcon"]`)
            .should("be.visible")
            .and("not.be.disabled")
            .click();

          cy.waitForResources();
        },
        delay: 1000,
        limit: 99999,
        timeout: 100000,
      },
    ).click();
  }
}
