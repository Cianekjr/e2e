export default class Global {
  acceptMetamaskAccessRequest(allAccounts = false) {
    return cy.acceptMetamaskAccess({
      signInSignature: true,
      allAccounts,
    });
  }

  confirmMetamaskTransaction() {
    return cy.confirmMetamaskTransaction();
  }

  confirmMetamaskSignatureRequest() {
    return cy.confirmMetamaskSignatureRequest();
  }
}
