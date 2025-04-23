import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmailtemplateModule } from './emailtemplate/emailtemplate.module';
import { PrismaService } from 'prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { TwilioModule } from './twilio/twilio.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerOrderModule } from './customer-order/customer-order.module';
import { CustomerFinishedProductModule } from './customer-finished-product/customer-finished-product.module';
import { RawMaterialModule } from './raw-material/raw-material.module';
import { SupplierModule } from './supplier/supplier.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailtemplateModule,
    EmailModule,
    PushNotificationModule,
    TwilioModule,
    UserModule,
    AuthModule,
    CustomerModule,
    CustomerOrderModule,
    CustomerFinishedProductModule,
    RawMaterialModule,
    SupplierModule,
    WarehouseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
