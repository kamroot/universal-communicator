import { Injectable, HttpException } from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import { HistoryLine } from 'src/history/history.entity';

@Injectable()
export class SignalwireService {
  private AUTH =
    'Basic ' +
    Buffer.from(
      `${this.configService.get<string>(
        'SIGNALWIRE_PROJECT_ID',
      )}:${this.configService.get<string>('SIGNALWIRE_API_TOKEN')}`,
    ).toString('base64');

  constructor(private configService: ConfigService) {
    const username = this.configService.get<string>('SIGNALWIRE_PROJECT_ID');

    const password = this.configService.get<string>('SIGNALWIRE_API_TOKEN');
    const auth =
      'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    console.log(`SignalWire Auth: ${auth}`);

    console.log(`SignalWire Auth: ${this.AUTH}`);
    console.log(
      `SignalWire SIGNALWIRE_API_TOKEN: ${this.configService.get<string>(
        'SIGNALWIRE_API_TOKEN',
      )}`,
    );
    console.log(
      `SignalWire SIGNALWIRE_PROJECT_ID: ${this.configService.get<string>(
        'SIGNALWIRE_PROJECT_ID',
      )}`,
    );
  }

  getRooms(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'https://aseem.signalwire.com/api/video/conferences';
      //  const auth = `Basic ${this.configService.get<string>('SIGNALWIRE_AUTH')}`;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: this.AUTH,
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(`Error: ${err}`);
          console.error('Error:' + err);
        });
    });
  }

  // not used till we fix 3939
  getToken1(roomName: string, visitorName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = 'https://aseem.signalwire.com/api/video/room_tokens';
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: this.AUTH,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_name: roomName,
          user_name: visitorName,
        }),
      };
      // console.log(`Calling getToken for ${roomName} and ${visitorName}`);

      fetch(url, options)
        .then((res) => {
          console.log(`Return from fetch: ${res.status} and ${res.statusText}`);
          if (!res.ok) {
            throw new HttpException(
              { status: res.status, message: res.statusText },
              res.status,
            );
          }
          return res.json();
        })
        .then((json) => {
          console.log(`Got token: ${json.token}`);
          resolve(json.token);
        })
        .catch((err) => {
          reject(`Error: ${err}`);
          console.error('Error:' + err);
        });
    });
  }

  // temporary solution for 3939
  getToken(roomName: string, visitorName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (roomName === 'Phone Booth') {
        resolve('vpt_802dcabe71cf4317ca9c585150872b6e');
      }
      if (roomName === 'Event Room') {
        resolve('vpt_742de9a491ce61d3ba7d1f6ad012f795');
      }
      if (roomName === 'Meeting Room') {
        resolve('vpt_a3f059fe11131ddd2f0e6917c43812ab');
      }
    });
  }

  getHistory(type: 'video' | 'voice'): Promise<HistoryLine[]> {
    return new Promise((resolve, reject) => {
      const url = 'https://aseem.signalwire.com/api/video/logs';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: this.AUTH,
          'Content-Type': 'application/json',
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          resolve(json);
        })
        .catch((err) => {
          reject(`Error: ${err}`);
          console.error('Error:' + err);
        });
    });
  }
}
