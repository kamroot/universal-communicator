import { Entity } from 'typeorm';

@Entity()
export class MeetingspaceEntity {
  constructor(name, id, description) {
    this.name = name;
    this.description = description ? description : '-';
    this.id = id;
    this.meetingspaceType = 'event room';
  }
  id: string;
  name: string;
  description: string;
  meetingspaceType: 'event room' | 'phone booth' | 'meeting room';
}
