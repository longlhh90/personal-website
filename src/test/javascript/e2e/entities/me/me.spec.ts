import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MeComponentsPage, MeDeleteDialog, MeUpdatePage } from './me.page-object';

const expect = chai.expect;

describe('Me e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let meComponentsPage: MeComponentsPage;
  let meUpdatePage: MeUpdatePage;
  let meDeleteDialog: MeDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Us', async () => {
    await navBarPage.goToEntity('me');
    meComponentsPage = new MeComponentsPage();
    await browser.wait(ec.visibilityOf(meComponentsPage.title), 5000);
    expect(await meComponentsPage.getTitle()).to.eq('personalWebsiteApp.me.home.title');
    await browser.wait(ec.or(ec.visibilityOf(meComponentsPage.entities), ec.visibilityOf(meComponentsPage.noResult)), 1000);
  });

  it('should load create Me page', async () => {
    await meComponentsPage.clickOnCreateButton();
    meUpdatePage = new MeUpdatePage();
    expect(await meUpdatePage.getPageTitle()).to.eq('personalWebsiteApp.me.home.createOrEditLabel');
    await meUpdatePage.cancel();
  });

  it('should create and save Us', async () => {
    const nbButtonsBeforeCreate = await meComponentsPage.countDeleteButtons();

    await meComponentsPage.clickOnCreateButton();

    await promise.all([
      meUpdatePage.setFormalNameInput('formalName'),
      meUpdatePage.setLegalNameInput('legalName'),
      meUpdatePage.setEmailInput('email'),
      meUpdatePage.setLinkedinInput('linkedin'),
      meUpdatePage.setFacebookInput('facebook'),
      meUpdatePage.setInstagramInput('instagram'),
      meUpdatePage.setGithubInput('github'),
      meUpdatePage.setResumeInput('resume'),
      meUpdatePage.setAboutMeInput('aboutMe'),
      meUpdatePage.setAboutMeShortInput('aboutMeShort'),
    ]);

    expect(await meUpdatePage.getFormalNameInput()).to.eq('formalName', 'Expected FormalName value to be equals to formalName');
    expect(await meUpdatePage.getLegalNameInput()).to.eq('legalName', 'Expected LegalName value to be equals to legalName');
    expect(await meUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await meUpdatePage.getLinkedinInput()).to.eq('linkedin', 'Expected Linkedin value to be equals to linkedin');
    expect(await meUpdatePage.getFacebookInput()).to.eq('facebook', 'Expected Facebook value to be equals to facebook');
    expect(await meUpdatePage.getInstagramInput()).to.eq('instagram', 'Expected Instagram value to be equals to instagram');
    expect(await meUpdatePage.getGithubInput()).to.eq('github', 'Expected Github value to be equals to github');
    expect(await meUpdatePage.getResumeInput()).to.eq('resume', 'Expected Resume value to be equals to resume');
    expect(await meUpdatePage.getAboutMeInput()).to.eq('aboutMe', 'Expected AboutMe value to be equals to aboutMe');
    expect(await meUpdatePage.getAboutMeShortInput()).to.eq('aboutMeShort', 'Expected AboutMeShort value to be equals to aboutMeShort');

    await meUpdatePage.save();
    expect(await meUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await meComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Me', async () => {
    const nbButtonsBeforeDelete = await meComponentsPage.countDeleteButtons();
    await meComponentsPage.clickOnLastDeleteButton();

    meDeleteDialog = new MeDeleteDialog();
    expect(await meDeleteDialog.getDialogTitle()).to.eq('personalWebsiteApp.me.delete.question');
    await meDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(meComponentsPage.title), 5000);

    expect(await meComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
