import MyProfilePage from "../pages/my-profile-page";
import Auth from "../pages/auth";
import ShopPage from "../pages/shop-page";
import Global from "../pages/global";
import { generateNewWallet } from "../helpers/wallet";

const auth = new Auth();
const global = new Global();
const shop = new ShopPage();
const myProfile = new MyProfilePage();

const config = {
  password: "Qwertyui1!",

  store: "Uniqly x Bullieverse collection",
  bundle: "Genesis Streetwear Hoodie",
};

const signIn = (name = "cc-session") => {
  cy.session(name, () => {
    shop.visit();
    auth.pressLoginButton();

    auth.fillEmail();
    auth.fillPassword(config.password);
    auth.submitSignIn();

    auth.isLoggedIn();
  });
};

describe("CC mint old and transfer", () => {
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

  it(`should mint old store`, () => {
    signIn();

    shop.visit();
    shop.pressStore(config.store);

    cy.wait(2000);

    shop.pressBundle(config.bundle);
    auth.isLoggedIn();
    shop.pressFiatPayment();
    shop.saveFiatPrice();
    shop.checkTerms();

    shop.pressFiatBuyButton();

    shop.fillAri10Email();
    shop.submitAri10Email();

    shop.fillAri10PhoneNumber();
    shop.submitAri10PhoneNumber();

    shop.fillAri10Code();
    shop.submitAri10Code();

    shop.chooseTestPaymentMethod();
    shop.submitAri10PaymentMethod();
    shop.checkAri10Terms();

    shop.submitAri10Form();

    shop.checkAri10SuccessEmail();
  });

  it(`should connect metamask to the off-chain account`, () => {
    const wallet = generateNewWallet();

    cy.importMetamaskAccount(wallet.privateKey);

    cy.clearCookies();
    signIn("new-session");

    myProfile.visit();
    cy.wait(3000);
    myProfile.pressConnectMetamaskWallet();
    global.acceptMetamaskAccessRequest();

    myProfile.pressTransferToMetamask();

    myProfile.checkTransferSuccessEmail();

    cy.disconnectMetamaskWalletFromAllDapps();
    cy.switchMetamaskAccount("Account 1");
  });
});
