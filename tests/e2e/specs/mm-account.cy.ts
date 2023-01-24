import { v4 as uuidV4 } from "uuid";

import MyProfilePage from "../pages/my-profile-page";
import Auth from "../pages/auth";
import HomePage from "../pages/home-page";
import { generateNewWallet } from "../helpers/wallet";
import Global from "../pages/global";

const myProfile = new MyProfilePage();

const home = new HomePage();
const auth = new Auth();
const global = new Global();

const config = {
  nickname: "uniqly",
  email: `test+${uuidV4()}@gmail.com`,
};

const login = (name: string, callback: () => void) => {
  cy.session(name, () => {
    home.visit();
    auth.pressLoginButton();
    auth.pressConnectMetamask();

    callback();

    auth.isLoggedIn();
  });
};

describe("MM account", () => {
  before(() => {
    const wallet = generateNewWallet();
    cy.importMetamaskAccount(wallet.privateKey);
  });

  after(() => {
    cy.switchMetamaskAccount("Account 1");
  });

  it(`should sign up user`, () => {
    login("metamask-session-register", () => {
      global.acceptMetamaskAccessRequest(true);
    });
  });

  it(`should log in user`, () => {
    cy.clearCookies();

    login("metamask-session-login", () => {
      cy.confirmMetamaskSignatureRequest();
    });
  });

  it(`should update user profile`, () => {
    login("metamask-session-login", () => {
      cy.confirmMetamaskSignatureRequest();
    });

    myProfile.visit();

    myProfile.fillNickname(config.nickname);
    myProfile.fillEmail(config.email);
    myProfile.submitMyProfileUpdate();

    cy.waitForResources();
    cy.reload();

    myProfile.checkNickname(config.nickname);
    myProfile.checkEmail(config.email);
  });
});
