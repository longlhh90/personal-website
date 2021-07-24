import { element, by, ElementFinder } from 'protractor';

export class EducationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-education div table .btn-danger'));
  title = element.all(by.css('jhi-education div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EducationUpdatePage {
  pageTitle = element(by.id('jhi-education-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  institutionInput = element(by.id('field_institution'));
  countryNameInput = element(by.id('field_countryName'));
  yearGraduateInput = element(by.id('field_yearGraduate'));
  majorInput = element(by.id('field_major'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setInstitutionInput(institution: string): Promise<void> {
    await this.institutionInput.sendKeys(institution);
  }

  async getInstitutionInput(): Promise<string> {
    return await this.institutionInput.getAttribute('value');
  }

  async setCountryNameInput(countryName: string): Promise<void> {
    await this.countryNameInput.sendKeys(countryName);
  }

  async getCountryNameInput(): Promise<string> {
    return await this.countryNameInput.getAttribute('value');
  }

  async setYearGraduateInput(yearGraduate: string): Promise<void> {
    await this.yearGraduateInput.sendKeys(yearGraduate);
  }

  async getYearGraduateInput(): Promise<string> {
    return await this.yearGraduateInput.getAttribute('value');
  }

  async setMajorInput(major: string): Promise<void> {
    await this.majorInput.sendKeys(major);
  }

  async getMajorInput(): Promise<string> {
    return await this.majorInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EducationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-education-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-education'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
