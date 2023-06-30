export default class Global {
  acceptMetamaskAccessRequest(allAccounts = false) {
    return cy.acceptMetamaskAccess();
  }

  confirmMetamaskTransaction() {
    return cy.confirmMetamaskTransaction();
  }

  confirmMetamaskSignatureRequest() {
    return cy.confirmMetamaskSignatureRequest();
  }
}
