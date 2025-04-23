import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailtemplateModule } from 'src/emailtemplate/emailtemplate.module';

@Module({
  exports: [EmailService],
  providers: [EmailService],
  imports: [EmailtemplateModule],
})
export class EmailModule {}
