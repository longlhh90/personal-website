import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExperienceComponentsPage, ExperienceDeleteDialog, ExperienceUpdatePage } from './experience.page-object';

const expect = chai.expect;

describe('Experience e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let experienceComponentsPage: ExperienceComponentsPage;
  let experienceUpdatePage: ExperienceUpdatePage;
  let experienceDeleteDialog: ExperienceDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Experiences', async () => {
    await navBarPage.goToEntity('experience');
    experienceComponentsPage = new ExperienceComponentsPage();
    await browser.wait(ec.visibilityOf(experienceComponentsPage.title), 5000);
    expect(await experienceComponentsPage.getTitle()).to.eq('personalWebsiteApp.experience.home.title');
    await browser.wait(ec.or(ec.visibilityOf(experienceComponentsPage.entities), ec.visibilityOf(experienceComponentsPage.noResult)), 1000);
  });

  it('should load create Experience page', async () => {
    await experienceComponentsPage.clickOnCreateButton();
    experienceUpdatePage = new ExperienceUpdatePage();
    expect(await experienceUpdatePage.getPageTitle()).to.eq('personalWebsiteApp.experience.home.createOrEditLabel');
    await experienceUpdatePage.cancel();
  });

  it('should create and save Experiences', async () => {
    const nbButtonsBeforeCreate = await experienceComponentsPage.countDeleteButtons();

    await experienceComponentsPage.clickOnCreateButton();

    await promise.all([
      experienceUpdatePage.setTitleInput('title'),
      experienceUpdatePage.setMajorInput('major'),
      experienceUpdatePage.setOrganizationInput('organization'),
      experienceUpdatePage.setLocationInput('location'),
      experienceUpdatePage.setStartMonthInput('5'),
      experienceUpdatePage.setStartYearInput('5'),
      experienceUpdatePage.setEndMonthInput('5'),
      experienceUpdatePage.setEndYearInput('5'),
      experienceUpdatePage.setDetailsInput('details'),
      experienceUpdatePage.setExpTypeInput('expType'),
    ]);

    expect(await experienceUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await experienceUpdatePage.getMajorInput()).to.eq('major', 'Expected Major value to be equals to major');
    expect(await experienceUpdatePage.getOrganizationInput()).to.eq(
      'organization',
      'Expected Organization value to be equals to organization'
    );
    expect(await experienceUpdatePage.getLocationInput()).to.eq('location', 'Expected Location value to be equals to location');
    expect(await experienceUpdatePage.getStartMonthInput()).to.eq('5', 'Expected startMonth value to be equals to 5');
    expect(await experienceUpdatePage.getStartYearInput()).to.eq('5', 'Expected startYear value to be equals to 5');
    expect(await experienceUpdatePage.getEndMonthInput()).to.eq('5', 'Expected endMonth value to be equals to 5');
    expect(await experienceUpdatePage.getEndYearInput()).to.eq('5', 'Expected endYear value to be equals to 5');
    const selectedIsPresent = experienceUpdatePage.getIsPresentInput();
    if (await selectedIsPresent.isSelected()) {
      await experienceUpdatePage.getIsPresentInput().click();
      expect(await experienceUpdatePage.getIsPresentInput().isSelected(), 'Expected isPresent not to be selected').to.be.false;
    } else {
      await experienceUpdatePage.getIsPresentInput().click();
      expect(await experienceUpdatePage.getIsPresentInput().isSelected(), 'Expected isPresent to be selected').to.be.true;
    }
    expect(await experienceUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');
    expect(await experienceUpdatePage.getExpTypeInput()).to.eq('expType', 'Expected ExpType value to be equals to expType');

    await experienceUpdatePage.save();
    expect(await experienceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await experienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Experience', async () => {
    const nbButtonsBeforeDelete = await experienceComponentsPage.countDeleteButtons();
    await experienceComponentsPage.clickOnLastDeleteButton();

    experienceDeleteDialog = new ExperienceDeleteDialog();
    expect(await experienceDeleteDialog.getDialogTitle()).to.eq('personalWebsiteApp.experience.delete.question');
    await experienceDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(experienceComponentsPage.title), 5000);

    expect(await experienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
