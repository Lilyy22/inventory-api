import { Module } from '@nestjs/common';
import { EmailtemplateService } from './emailtemplate.service';
import { EmailTemplateController } from './emailtemplate.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [EmailTemplateController],
  providers: [EmailtemplateService],
  exports: [EmailtemplateService],
  imports: [PrismaModule],
})
export class EmailtemplateModule {}
