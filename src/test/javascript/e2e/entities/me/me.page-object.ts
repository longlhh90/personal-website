import { element, by, ElementFinder } from 'protractor';

export class MeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-me div table .btn-danger'));
  title = element.all(by.css('jhi-me div h2#page-heading span')).first();
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

export class MeUpdatePage {
  pageTitle = element(by.id('jhi-me-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  formalNameInput = element(by.id('field_formalName'));
  legalNameInput = element(by.id('field_legalName'));
  dobInput = element(by.id('field_dob'));
  emailInput = element(by.id('field_email'));
  linkedinInput = element(by.id('field_linkedin'));
  facebookInput = element(by.id('field_facebook'));
  instagramInput = element(by.id('field_instagram'));
  resumeInput = element(by.id('field_resume'));
  aboutMeInput = element(by.id('field_aboutMe'));
  aboutMeShortInput = element(by.id('field_aboutMeShort'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setFormalNameInput(formalName: string): Promise<void> {
    await this.formalNameInput.sendKeys(formalName);
  }

  async getFormalNameInput(): Promise<string> {
    return await this.formalNameInput.getAttribute('value');
  }

  async setLegalNameInput(legalName: string): Promise<void> {
    await this.legalNameInput.sendKeys(legalName);
  }

  async getLegalNameInput(): Promise<string> {
    return await this.legalNameInput.getAttribute('value');
  }

  async setDobInput(dob: string): Promise<void> {
    await this.dobInput.sendKeys(dob);
  }

  async getDobInput(): Promise<string> {
    return await this.dobInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setLinkedinInput(linkedin: string): Promise<void> {
    await this.linkedinInput.sendKeys(linkedin);
  }

  async getLinkedinInput(): Promise<string> {
    return await this.linkedinInput.getAttribute('value');
  }

  async setFacebookInput(facebook: string): Promise<void> {
    await this.facebookInput.sendKeys(facebook);
  }

  async getFacebookInput(): Promise<string> {
    return await this.facebookInput.getAttribute('value');
  }

  async setInstagramInput(instagram: string): Promise<void> {
    await this.instagramInput.sendKeys(instagram);
  }

  async getInstagramInput(): Promise<string> {
    return await this.instagramInput.getAttribute('value');
  }

  async setResumeInput(resume: string): Promise<void> {
    await this.resumeInput.sendKeys(resume);
  }

  async getResumeInput(): Promise<string> {
    return await this.resumeInput.getAttribute('value');
  }

  async setAboutMeInput(aboutMe: string): Promise<void> {
    await this.aboutMeInput.sendKeys(aboutMe);
  }

  async getAboutMeInput(): Promise<string> {
    return await this.aboutMeInput.getAttribute('value');
  }

  async setAboutMeShortInput(aboutMeShort: string): Promise<void> {
    await this.aboutMeShortInput.sendKeys(aboutMeShort);
  }

  async getAboutMeShortInput(): Promise<string> {
    return await this.aboutMeShortInput.getAttribute('value');
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

export class MeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-me-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-me'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
