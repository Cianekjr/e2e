import { v4 as uuidV4 } from "uuid";

import MyProfilePage from "../pages/my-profile-page";
import Auth from "../pages/auth";
import ShopPage from "../pages/shop-page";

const myProfile = new MyProfilePage();

const auth = new Auth();
const shop = new ShopPage();

const config = {
  nickname: "uniqly",
  newNickname: "uniqly2",
  newEmail: `test2+${uuidV4()}@gmail.com`,
  password: "Qwertyui1!",
  newPassword: "Qwertyui2!",
};

const signIn = (email = "", password = config.password, name = "sign-in") => {
  cy.session(name, () => {
    shop.visit();
    auth.pressLoginButton();

    auth.fillEmail(email);
    auth.fillPassword(password);
    auth.submitSignIn();

    auth.isLoggedIn();
  });
};

describe("CC account", () => {
  it(`should sign up user`, () => {
    shop.visit();
    auth.pressLoginButton();
    auth.pressSignUpTab();

    auth.fillEmail();
    auth.fillPassword(config.password);
    auth.fillConfirmPassword(config.password);
    auth.checkTerms();
    auth.submitSignUp();
    auth.checkSignUp();
  });

  it(`should sign in user`, () => {
    signIn();
  });

  it(`should change user's password`, () => {
    signIn();

    myProfile.visit();

    myProfile.pressChangePassword();
    myProfile.fillCurrentPassword(config.password);
    myProfile.fillNewPassword(config.newPassword);
    myProfile.fillNewPasswordConfirm(config.newPassword);
    myProfile.submitChangePassword();

    cy.clearCookies();

    signIn("", config.newPassword, "new-session");

    shop.visit();
    auth.isLoggedIn();
  });

  // TODO
  // it(`should remind forgot password`, () => {});

  it(`should update user profile`, () => {
    signIn("new-session");

    myProfile.visit();

    myProfile.fillNickname(config.newNickname);
    myProfile.fillEmail(config.newEmail);
    myProfile.submitMyProfileUpdate();

    cy.waitForResources();
    cy.reload();

    myProfile.checkNickname(config.newNickname);
    myProfile.checkEmail(config.newEmail);
  });
});
