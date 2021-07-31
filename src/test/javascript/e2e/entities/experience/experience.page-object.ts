import { element, by, ElementFinder } from 'protractor';

export class ExperienceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-experience div table .btn-danger'));
  title = element.all(by.css('jhi-experience div h2#page-heading span')).first();
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

export class ExperienceUpdatePage {
  pageTitle = element(by.id('jhi-experience-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  titleInput = element(by.id('field_title'));
  majorInput = element(by.id('field_major'));
  organizationInput = element(by.id('field_organization'));
  locationInput = element(by.id('field_location'));
  startMonthInput = element(by.id('field_startMonth'));
  startYearInput = element(by.id('field_startYear'));
  endMonthInput = element(by.id('field_endMonth'));
  endYearInput = element(by.id('field_endYear'));
  isPresentInput = element(by.id('field_isPresent'));
  detailsInput = element(by.id('field_details'));
  expTypeInput = element(by.id('field_expType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setMajorInput(major: string): Promise<void> {
    await this.majorInput.sendKeys(major);
  }

  async getMajorInput(): Promise<string> {
    return await this.majorInput.getAttribute('value');
  }

  async setOrganizationInput(organization: string): Promise<void> {
    await this.organizationInput.sendKeys(organization);
  }

  async getOrganizationInput(): Promise<string> {
    return await this.organizationInput.getAttribute('value');
  }

  async setLocationInput(location: string): Promise<void> {
    await this.locationInput.sendKeys(location);
  }

  async getLocationInput(): Promise<string> {
    return await this.locationInput.getAttribute('value');
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

  async setDetailsInput(details: string): Promise<void> {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput(): Promise<string> {
    return await this.detailsInput.getAttribute('value');
  }

  async setExpTypeInput(expType: string): Promise<void> {
    await this.expTypeInput.sendKeys(expType);
  }

  async getExpTypeInput(): Promise<string> {
    return await this.expTypeInput.getAttribute('value');
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

export class ExperienceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-experience-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-experience'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
