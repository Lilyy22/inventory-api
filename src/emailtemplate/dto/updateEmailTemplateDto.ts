import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailTemplateDto } from './createEmailTemplateDto';

export class UpdateEmailTemplateDto extends PartialType(
  CreateEmailTemplateDto,
) {}
