import { Injectable, HttpException } from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignalwireService {
  constructor(private configService: ConfigService) {}

  rooms = ['room1', 'room2', 'room3'];

  getRooms(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'https://aseem.signalwire.com/api/video/rooms';
      const auth = `Basic ${this.configService.get<string>('SIGNALWIRE_AUTH')}`;
      console.log(`auth is ${auth}`);
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: auth,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          console.log(`JSON res`, json);
          resolve(json);
        })
        .catch((err) => {
          reject(`Error: ${err}`);
          console.error('Error:' + err);
        });
    });
  }
}
