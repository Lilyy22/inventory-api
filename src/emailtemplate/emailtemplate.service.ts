import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmailTemplateDto } from './dto/createEmailTemplateDto';
import { UpdateEmailTemplateDto } from './dto/updateEmailTemplateDto';

@Injectable()
export class EmailtemplateService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  // Create an Email Template
  async createTemplate(createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.prismaService.emailTemplate.create({
      data: {
        name: createEmailTemplateDto.name,
        subject: createEmailTemplateDto.subject,
        body: createEmailTemplateDto.body,
        footer: createEmailTemplateDto.footer,
      },
    });
  }

  // Update an Email Template
  async updateTemplate(updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.prismaService.emailTemplate.update({
      where: { name: updateEmailTemplateDto.name },
      data: {
        subject: updateEmailTemplateDto.subject,
        body: updateEmailTemplateDto.body,
        footer: updateEmailTemplateDto.footer,
      },
    });
  }

  // Fetch Email Template by Name
  async getTemplate(name: string) {
    // Try fetching from cache first
    // const cachedTemplate = await this.cacheManager.get(name);
    // if (cachedTemplate) {
    //   console.log('Template found in cache');
    //   return cachedTemplate;
    // }

    try {
      // If not in cache, fetch from database
      const template = await this.prismaService.emailTemplate.findFirst({
        where: { name: name },
      });

      // await this.cacheManager.set(name, template); // TTL of 1 day (24 hours)
      return template;
    } catch (err) {
      throw new Error(`Template "${name}" not found`);
    }
  }

  // Get All Templates
  async getAllTemplates() {
    return this.prismaService.emailTemplate.findMany();
  }

  // Remove a template by ID or Name
  async RemoveTemplates(nameOrId: string) {
    return this.prismaService.emailTemplate.deleteMany({
      where: {
        OR: [{ id: nameOrId }, { name: nameOrId }],
      },
    });
  }
}
