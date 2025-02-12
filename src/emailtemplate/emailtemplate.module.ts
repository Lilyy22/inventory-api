import { Module } from '@nestjs/common';
import { EmailtemplateService } from './emailtemplate.service';
import { EmailTemplateController } from './emailtemplate.controller';

@Module({
  controllers: [EmailTemplateController],
  providers: [EmailtemplateService],
})
export class EmailtemplateModule {}
