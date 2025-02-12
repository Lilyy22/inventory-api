import { Controller, Post, Body } from '@nestjs/common';
import { TwilioService } from 'src/twilio/twilio.service';
import { EmailService } from 'src/email/email.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {}

  @Post('email')
  async sendEmail(
    @Body()
    body: {
      email: string;
      templateName: string;
      variables: Record<string, string>;
    },
  ) {
    return await this.emailService.sendEmail(
      body.email,
      body.templateName,
      body.variables,
    );
  }

  @Post('send-sms')
  async sendSms(@Body() body: { to: string; message: string }) {
    const { to, message } = body;

    try {
      await this.twilioService.sendSms(to, message);
      return { status: 'success', message: 'SMS sent successfully' };
    } catch (error) {
      return { status: 'error', message: 'Failed to send SMS' };
    }
  }
}
