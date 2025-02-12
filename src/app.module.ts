import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { EmailtemplateModule } from './emailtemplate/emailtemplate.module';
import { PrismaService } from 'prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { TwilioModule } from './twilio/twilio.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
    EmailtemplateModule,
    EmailModule,
    PushNotificationModule,
    TwilioModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
