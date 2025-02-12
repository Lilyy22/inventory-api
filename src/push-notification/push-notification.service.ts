import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PushNotificationService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
  }

  // async sendPushNotification(userId: string, message: string): Promise<void> {
  //   const userToken = await this.getUserPushToken(userId); // Fetch the user's push token from the DB or cache.

  //   const messagePayload = {
  //     token: userToken,
  //     notification: {
  //       title: 'New Notification',
  //       body: message,
  //     },
  //   };

  //   try {
  //     await admin.messaging().send(messagePayload);
  //   } catch (error) {
  //     console.error('Error sending push notification:', error);
  //   }
  // }

  // private async getUserPushToken(userId: string): Promise<string> {
  // Fetch the push token from the database for the given user ID
  // const user = await this.userRepository.findOne({ userId });
  // return user.pushToken;
  // }
}
