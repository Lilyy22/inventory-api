import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';

@Module({
  exports: [PushNotificationService],
  providers: [PushNotificationService],
})
export class PushNotificationModule {}
