import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EducationComponentsPage, EducationDeleteDialog, EducationUpdatePage } from './education.page-object';

const expect = chai.expect;

describe('Education e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let educationComponentsPage: EducationComponentsPage;
  let educationUpdatePage: EducationUpdatePage;
  let educationDeleteDialog: EducationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Educations', async () => {
    await navBarPage.goToEntity('education');
    educationComponentsPage = new EducationComponentsPage();
    await browser.wait(ec.visibilityOf(educationComponentsPage.title), 5000);
    expect(await educationComponentsPage.getTitle()).to.eq('personalWebsiteApp.education.home.title');
    await browser.wait(ec.or(ec.visibilityOf(educationComponentsPage.entities), ec.visibilityOf(educationComponentsPage.noResult)), 1000);
  });

  it('should load create Education page', async () => {
    await educationComponentsPage.clickOnCreateButton();
    educationUpdatePage = new EducationUpdatePage();
    expect(await educationUpdatePage.getPageTitle()).to.eq('personalWebsiteApp.education.home.createOrEditLabel');
    await educationUpdatePage.cancel();
  });

  it('should create and save Educations', async () => {
    const nbButtonsBeforeCreate = await educationComponentsPage.countDeleteButtons();

    await educationComponentsPage.clickOnCreateButton();

    await promise.all([
      educationUpdatePage.setInstitutionInput('institution'),
      educationUpdatePage.setCountryNameInput('countryName'),
      educationUpdatePage.setYearGraduateInput('5'),
      educationUpdatePage.setMajorInput('major'),
    ]);

    expect(await educationUpdatePage.getInstitutionInput()).to.eq('institution', 'Expected Institution value to be equals to institution');
    expect(await educationUpdatePage.getCountryNameInput()).to.eq('countryName', 'Expected CountryName value to be equals to countryName');
    expect(await educationUpdatePage.getYearGraduateInput()).to.eq('5', 'Expected yearGraduate value to be equals to 5');
    expect(await educationUpdatePage.getMajorInput()).to.eq('major', 'Expected Major value to be equals to major');

    await educationUpdatePage.save();
    expect(await educationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await educationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Education', async () => {
    const nbButtonsBeforeDelete = await educationComponentsPage.countDeleteButtons();
    await educationComponentsPage.clickOnLastDeleteButton();

    educationDeleteDialog = new EducationDeleteDialog();
    expect(await educationDeleteDialog.getDialogTitle()).to.eq('personalWebsiteApp.education.delete.question');
    await educationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(educationComponentsPage.title), 5000);

    expect(await educationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
