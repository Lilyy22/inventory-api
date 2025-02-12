// twilio.service.ts
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    // Initialize Twilio client using ConfigService
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  // Method to send an SMS
  async sendSms(to: string, message: string): Promise<void> {
    try {
      // Sending SMS via Twilio
      await this.twilioClient.messages.create({
        body: message,
        from: this.configService.get<string>('TWILIO_PHONE_NUMBER'), // Twilio phone number from environment variables
        to,
      });
      console.log('SMS sent successfully');
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }
}
