import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PushNotificationService } from 'src/push-notification/push-notification.service';

@Injectable()
export class NotificationService {
  constructor(
    private emailService: EmailService,
    private pushNotificationService: PushNotificationService,
    private twilioService,
  ) {}

  // Delegate email sending to EmailService
  async sendEmail(
    userEmail: string,
    templateName: string,
    variables: Record<string, string>,
  ) {
    return await this.emailService.sendEmail(
      userEmail,
      templateName,
      variables,
    );
  }
}
