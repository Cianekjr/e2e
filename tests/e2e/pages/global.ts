export default class Global {
  acceptMetamaskAccessRequest(allAccounts = false) {
    return cy.acceptMetamaskAccess({
      // confirmDataSignatureRequest: true,
      confirmSignatureRequest: true,
      // allAccounts,
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
