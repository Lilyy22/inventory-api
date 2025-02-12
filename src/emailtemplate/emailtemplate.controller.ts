import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { EmailtemplateService } from './emailtemplate.service';
import { CreateEmailTemplateDto } from './dto/createEmailTemplateDto';
import { UpdateEmailTemplateDto } from './dto/updateEmailTemplateDto';

@Controller('email-templates')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailtemplateService) {}

  @Post('create')
  async create(@Body() createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.emailTemplateService.createTemplate(createEmailTemplateDto);
  }

  @Put('update')
  async update(@Body() updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.emailTemplateService.updateTemplate(updateEmailTemplateDto);
  }

  @Get(':name')
  async getTemplate(@Param('name') name: string) {
    return this.emailTemplateService.getTemplate(name);
  }

  @Get()
  async getAllTemplates() {
    return this.emailTemplateService.getAllTemplates();
  }
}
