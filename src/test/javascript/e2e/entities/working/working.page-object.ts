import { element, by, ElementFinder } from 'protractor';

export class WorkingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-working div table .btn-danger'));
  title = element.all(by.css('jhi-working div h2#page-heading span')).first();
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

export class WorkingUpdatePage {
  pageTitle = element(by.id('jhi-working-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  positionInput = element(by.id('field_position'));
  companyInput = element(by.id('field_company'));
  countryNameInput = element(by.id('field_countryName'));
  startMonthInput = element(by.id('field_startMonth'));
  startYearInput = element(by.id('field_startYear'));
  endMonthInput = element(by.id('field_endMonth'));
  endYearInput = element(by.id('field_endYear'));
  isPresentInput = element(by.id('field_isPresent'));
  workDutyInput = element(by.id('field_workDuty'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setPositionInput(position: string): Promise<void> {
    await this.positionInput.sendKeys(position);
  }

  async getPositionInput(): Promise<string> {
    return await this.positionInput.getAttribute('value');
  }

  async setCompanyInput(company: string): Promise<void> {
    await this.companyInput.sendKeys(company);
  }

  async getCompanyInput(): Promise<string> {
    return await this.companyInput.getAttribute('value');
  }

  async setCountryNameInput(countryName: string): Promise<void> {
    await this.countryNameInput.sendKeys(countryName);
  }

  async getCountryNameInput(): Promise<string> {
    return await this.countryNameInput.getAttribute('value');
  }

  async setStartMonthInput(startMonth: string): Promise<void> {
    await this.startMonthInput.sendKeys(startMonth);
  }

  async getStartMonthInput(): Promise<string> {
    return await this.startMonthInput.getAttribute('value');
  }

  async setStartYearInput(startYear: string): Promise<void> {
    await this.startYearInput.sendKeys(startYear);
  }

  async getStartYearInput(): Promise<string> {
    return await this.startYearInput.getAttribute('value');
  }

  async setEndMonthInput(endMonth: string): Promise<void> {
    await this.endMonthInput.sendKeys(endMonth);
  }

  async getEndMonthInput(): Promise<string> {
    return await this.endMonthInput.getAttribute('value');
  }

  async setEndYearInput(endYear: string): Promise<void> {
    await this.endYearInput.sendKeys(endYear);
  }

  async getEndYearInput(): Promise<string> {
    return await this.endYearInput.getAttribute('value');
  }

  getIsPresentInput(): ElementFinder {
    return this.isPresentInput;
  }

  async setWorkDutyInput(workDuty: string): Promise<void> {
    await this.workDutyInput.sendKeys(workDuty);
  }

  async getWorkDutyInput(): Promise<string> {
    return await this.workDutyInput.getAttribute('value');
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

export class WorkingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-working-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-working'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
