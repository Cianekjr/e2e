import { Email } from "../helpers/mailer";

import Global from "./global";

export default class MyProfilePage extends Global {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/user-profile");
  }

  fillNickname(nickname: string) {
    cy.get("#nickname")
      .should("be.visible")
      .clear()
      .wait(1000)
      .type(nickname, {});
  }

  checkNickname(nickname: string) {
    cy.get("#nickname").should("be.visible").and("have.value", nickname);
  }

  fillEmail(email: string) {
    cy.get("#email").should("be.visible").clear().wait(1000).type(email);
  }

  checkEmail(email: string) {
    cy.get("#email").should("be.visible").and("have.value", email);
  }

  submitMyProfileUpdate() {
    cy.get(`button:contains('UPDATE')`).should("be.visible").click();
  }

  pressChangePassword() {
    cy.get(`button:contains('CHANGE PASSWORD')`).should("be.visible").click();
  }

  fillCurrentPassword(currentPassword: string) {
    cy.get("#currentPassword").should("be.visible").type(currentPassword);
  }
  fillNewPassword(newPassword: string) {
    cy.get("#newPassword").should("be.visible").type(newPassword);
  }
  fillNewPasswordConfirm(newPasswordConfirm: string) {
    cy.get("#newPasswordConfirm").should("be.visible").type(newPasswordConfirm);
  }

  submitChangePassword() {
    cy.get(`button[type="submit"]:contains('Submit')`)
      .should("be.visible")
      .click();
  }

  pressConnectMetamaskWallet() {
    cy.get(`button:contains('Connect wallet')`).should("be.visible").click();
  }

  pressTransferToMetamask() {
    cy.get(`button:contains('transfer to metamask')`)
      .should("be.visible")
      .click();
  }

  checkTransferSuccessEmail() {
    cy.task("getEmailMessage", {
      subject: "transferred",
    }).should((email: unknown) => {
      expect((email as Email).text).to.be.a("string");
    });
  }
}
