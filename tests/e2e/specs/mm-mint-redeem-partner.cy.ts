import Global from "../pages/global";
import Auth from "../pages/auth";
import HomePage from "../pages/home-page";
import ShopPage from "../pages/shop-page";
import MyItemsPage from "../pages/my-items-page";
import NftPage from "../pages/nft-page";
import RedeemPage from "../pages/redeem-page";

const global = new Global();
const auth = new Auth();
const home = new HomePage();
const shop = new ShopPage();
const myItems = new MyItemsPage();
const nft = new NftPage();
const redeem = new RedeemPage();

const config = {
  store: "partner-partner",
  bundle: "name",
  network: "Polygon",
  token: "UNIQ",
};

const login = (name = "session") => {
  cy.session(name, () => {
    home.visit();
    auth.pressLoginButton();
    auth.pressConnectMetamask();

    cy.confirmMetamaskSignatureRequest();

    auth.isLoggedIn();
  });
};

describe("MM mint and redeem partner store", () => {
  after(() => {
    cy.changeMetamaskNetwork(Cypress.env("NETWORK_NAME"));
  });

  it(`should mint product with success`, () => {
    login();

    shop.visit();
    shop.pressStore(config.store);

    cy.wait(2000);

    shop.pressBundle(config.bundle);
    auth.isLoggedIn();

    shop.pressCryptoPayment();
    shop.switchNetwork(config.network);
    cy.allowMetamaskToSwitchNetwork();

    cy.wait(3000);

    shop.selectToken("UNIQ");
    shop.checkTerms();
    shop.pressBuyButton();
    shop.pressBuyModalButton();

    global.confirmMetamaskTransaction();

    shop.checkThankYouModal();

    shop.closeThankYouModal();

    cy.wait(10000);
  });

  it(`should redeem minted item with success`, () => {
    login();

    myItems.visit();
    myItems.pressItemToRedeem(config.bundle);

    auth.isLoggedIn();

    nft.pressPhysical();
    nft.pressBuyButton();

    auth.isLoggedIn();

    redeem.fillRedeemForm("X");
    redeem.pressCryptoPayment();
    redeem.selectToken("UNIQ");
    redeem.checkTerms();
    redeem.pressRedeemButton();
    redeem.pressRedeemModalButton();

    global.confirmMetamaskTransaction();

    shop.checkThankYouModal();
  });
});
