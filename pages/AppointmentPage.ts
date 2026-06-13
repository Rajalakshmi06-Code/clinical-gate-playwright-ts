import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AppointmentPage extends BasePage {
  private facilityDropdown: Locator;
  private readmissionCheckbox: Locator;
  private medicaidRadio: Locator;
  private dateInput: Locator;
  private commentField: Locator;
  private bookButton: Locator;
  private confirmationHeader: Locator;

  private fbFacility = 'select#combo_facility';
  private fbReadmission = 'input#chk_hospotal_readmission';
  private fbMedicaid = 'input#radio_program_medicaid';
  private fbDate = 'input#txt_visit_date';
  private fbComment = 'textarea#txt-comment';
  private fbButton = 'button#btn-book-appointment';

  constructor(page: Page) {
    super(page);
    this.facilityDropdown = page.getByLabel('Facility');
    this.readmissionCheckbox = page.getByLabel('Apply for hospital readmission');
    this.medicaidRadio = page.getByLabel('Medicaid');
    this.dateInput = page.getByPlaceholder('dd/mm/yyyy');
    this.commentField = page.getByPlaceholder('Comment');
    this.bookButton = page.getByRole('button', { name: 'Book Appointment' });
    this.confirmationHeader = page.getByRole('heading', { name: 'Appointment Confirmation' });
  }

  async executeClinicalBooking(facility: string, date: string, notes: string): Promise<void> {
    await this.facilityDropdown.selectOption({ value: facility });
    await this.smartClick(this.readmissionCheckbox, this.fbReadmission);
    await this.smartClick(this.medicaidRadio, this.fbMedicaid);
    await this.smartFill(this.dateInput, this.fbDate, date);
    await this.smartFill(this.commentField, this.fbComment, notes);
    await this.smartClick(this.bookButton, this.fbButton);
  }

  async isBookingSuccessful(): Promise<boolean> {
    try {
      await this.confirmationHeader.waitFor({ state: 'visible', timeout: 4000 });
      return true;
    } catch {
      return false;
    }
  }
}