import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailtemplateService } from 'src/emailtemplate/emailtemplate.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private emailTemplateService: EmailtemplateService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  // Send Email using a stored template
  async sendEmail(
    userEmail: string,
    templateName: string,
    variables: Record<string, string>,
  ) {
    try {
      const template =
        await this.emailTemplateService.getTemplate(templateName);
      if (!template) {
        throw new Error(`Template "${templateName}" not found`);
      }

      // Replace placeholders in email body
      let emailBody = template.body;

      Object.keys(variables).forEach((key) => {
        emailBody = emailBody.replace(
          new RegExp(`{{${key}}}`, 'g'),
          variables[key],
        );
      });
      await this.transporter.sendMail({
        from: `"Support" <${this.configService.get<string>('EMAIL_USER')}>`,
        to: userEmail,
        subject: template.subject,
        html: emailBody,
      });

      return { message: `Email sent successfully to ${userEmail}` };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
