export default class Global {
  acceptMetamaskAccessRequest(allAccounts = false) {
    return cy.acceptMetamaskAccess({
    });
  }

  confirmMetamaskTransaction() {
    return cy.confirmMetamaskTransaction();
  }
  confirmMetamaskDataSignatureRequest() {
    return cy.confirmMetamaskDataSignatureRequest();
  }

  confirmMetamaskSignatureRequest() {
    return cy.confirmMetamaskSignatureRequest();
  }
}
