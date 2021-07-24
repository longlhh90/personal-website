import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WorkingComponentsPage, WorkingDeleteDialog, WorkingUpdatePage } from './working.page-object';

const expect = chai.expect;

describe('Working e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workingComponentsPage: WorkingComponentsPage;
  let workingUpdatePage: WorkingUpdatePage;
  let workingDeleteDialog: WorkingDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Workings', async () => {
    await navBarPage.goToEntity('working');
    workingComponentsPage = new WorkingComponentsPage();
    await browser.wait(ec.visibilityOf(workingComponentsPage.title), 5000);
    expect(await workingComponentsPage.getTitle()).to.eq('personalWebsiteApp.working.home.title');
    await browser.wait(ec.or(ec.visibilityOf(workingComponentsPage.entities), ec.visibilityOf(workingComponentsPage.noResult)), 1000);
  });

  it('should load create Working page', async () => {
    await workingComponentsPage.clickOnCreateButton();
    workingUpdatePage = new WorkingUpdatePage();
    expect(await workingUpdatePage.getPageTitle()).to.eq('personalWebsiteApp.working.home.createOrEditLabel');
    await workingUpdatePage.cancel();
  });

  it('should create and save Workings', async () => {
    const nbButtonsBeforeCreate = await workingComponentsPage.countDeleteButtons();

    await workingComponentsPage.clickOnCreateButton();

    await promise.all([
      workingUpdatePage.setPositionInput('position'),
      workingUpdatePage.setCompanyInput('company'),
      workingUpdatePage.setCountryNameInput('countryName'),
      workingUpdatePage.setStartMonthInput('5'),
      workingUpdatePage.setStartYearInput('5'),
      workingUpdatePage.setEndMonthInput('5'),
      workingUpdatePage.setEndYearInput('5'),
      workingUpdatePage.setWorkDutyInput('workDuty'),
    ]);

    expect(await workingUpdatePage.getPositionInput()).to.eq('position', 'Expected Position value to be equals to position');
    expect(await workingUpdatePage.getCompanyInput()).to.eq('company', 'Expected Company value to be equals to company');
    expect(await workingUpdatePage.getCountryNameInput()).to.eq('countryName', 'Expected CountryName value to be equals to countryName');
    expect(await workingUpdatePage.getStartMonthInput()).to.eq('5', 'Expected startMonth value to be equals to 5');
    expect(await workingUpdatePage.getStartYearInput()).to.eq('5', 'Expected startYear value to be equals to 5');
    expect(await workingUpdatePage.getEndMonthInput()).to.eq('5', 'Expected endMonth value to be equals to 5');
    expect(await workingUpdatePage.getEndYearInput()).to.eq('5', 'Expected endYear value to be equals to 5');
    const selectedIsPresent = workingUpdatePage.getIsPresentInput();
    if (await selectedIsPresent.isSelected()) {
      await workingUpdatePage.getIsPresentInput().click();
      expect(await workingUpdatePage.getIsPresentInput().isSelected(), 'Expected isPresent not to be selected').to.be.false;
    } else {
      await workingUpdatePage.getIsPresentInput().click();
      expect(await workingUpdatePage.getIsPresentInput().isSelected(), 'Expected isPresent to be selected').to.be.true;
    }
    expect(await workingUpdatePage.getWorkDutyInput()).to.eq('workDuty', 'Expected WorkDuty value to be equals to workDuty');

    await workingUpdatePage.save();
    expect(await workingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await workingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Working', async () => {
    const nbButtonsBeforeDelete = await workingComponentsPage.countDeleteButtons();
    await workingComponentsPage.clickOnLastDeleteButton();

    workingDeleteDialog = new WorkingDeleteDialog();
    expect(await workingDeleteDialog.getDialogTitle()).to.eq('personalWebsiteApp.working.delete.question');
    await workingDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(workingComponentsPage.title), 5000);

    expect(await workingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
