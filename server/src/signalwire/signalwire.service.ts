import { Injectable, HttpException } from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import {
  VideoHistoryEntity,
  VoiceHistoryEntity,
} from 'src/history/history.entity';
import { Video } from '@signalwire/realtime-api';
import { LoggerService } from 'src/logger/logger.service';
@Injectable()
export class SignalwireService {
  private AUTH =
    'Basic ' +
    Buffer.from(
      `${this.configService.get<string>(
        'SIGNALWIRE_PROJECT_ID',
      )}:${this.configService.get<string>('SIGNALWIRE_API_TOKEN')}`,
    ).toString('base64');

  private readonly logger = new LoggerService('SignalwireService');

  constructor(private configService: ConfigService) {
    // this.logger.setContext('SignalwireService');

    this.logger.debug(`SignalWire Auth: ${this.AUTH}`);
    const video = new Video.Client({
      project: this.configService.get<string>('SIGNALWIRE_PROJECT_ID'),
      token: this.configService.get<string>('SIGNALWIRE_API_TOKEN'),
    });

    video.on('room.started', async (roomSession) => {
      this.logger.debug(
        `Room started name - ${roomSession.name}, display name - ${roomSession.displayName}, id - ${roomSession.id}, layoutName - ${roomSession.layoutName}, preview URL - ${roomSession.previewUrl}, roomID - ${roomSession.roomId}`,
      );

      roomSession.on(`member.joined`, async (member) => {
        this.logger.debug(
          `Member joined: ${member.name} [${member.id}] - room ${roomSession.name} [${roomSession.id}]`,
        );
      });
      roomSession.on('room.ended', async (rs) => {
        this.logger.debug(
          `Room finished ${roomSession.name} [${roomSession.id}]`,
        );
        this.logger.debug(roomSession);
        this.logger.debug(rs);
      });
      roomSession.on('layout.changed', async (layout) => {
        this.logger.debug(
          `Layout changed ${layout.name} -  ${roomSession.name} [${roomSession.id}]`,
        );
      });
      roomSession.on('member.left', async (member) => {
        this.logger.debug(
          `Member left ${member.name} - ${roomSession.name} [${roomSession.id}]`,
        );
      });

      roomSession.on('member.updated', async (member) => {
        this.logger.debug(
          `Member updated ${member.name} - ${roomSession.name} [${roomSession.id}]`,
        );
      });
      roomSession.on('member.updated.meta', async (member) => {
        this.logger.debug(
          `Member updated meta ${member.name} - ${roomSession.name} [${roomSession.id}]`,
        );
      });
      roomSession.on('member.updated.deaf', async (member) => {
        this.logger.debug(
          `Member updated name ${member.name} - ${roomSession.name} [${roomSession.id}]`,
        );
      });
      roomSession.on('member.talking', async (member) => {
        this.logger.debug(
          `Member talking ${member.id}  - ${roomSession.name} [${roomSession.id}]`,
        );
      });
    });
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

  getHistory(type: 'video' | 'voice' | 'messaging' | 'fax'): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const url = `https://aseem.signalwire.com/api/${type}/logs`;
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
          const history: any[] = [];

          // console.log(json);
          for (const h of json.data) {
            if (type === 'video') {
              new VideoHistoryEntity(
                h.id,
                h.room_name,
                h.user_name,
                h.start_time,
                h.end_time,
                h.duration,
                h.type,
                h.status,
                h.created_at,
              );
            } else {
              new VoiceHistoryEntity(
                h.id,
                h.room_name,
                h.user_name,
                h.start_time,
                h.end_time,
                h.duration,
                h.type,
                h.status,
                h.created_at,
              );
            }

            // new HistoryLine(
            //   h.id,
            //   h.source,
            //   h.type,
            //   h.room_name,
            //   h.status,
            //   new Date(h.started_at),
            //   new Date(h.ended_at),
            //   h.charge,
            //   new Date(h.created_at),
            // ),

            history.push(h);
          }
          resolve(history);
        })
        .catch((err) => {
          reject(`Error: ${err}`);
          console.error('Error:' + err);
        });
    });
  }
}
