import { Entity } from 'typeorm';

@Entity()
export class MeetingspaceEntity {
  constructor(name, id, description, dateCreated, dateUpdated) {
    this.name = name;
    this.description = description ? description : '-';
    this.id = id;
    this.meetingspaceType = 'event room';
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
  }
  id: string;
  name: string;
  description: string;
  meetingspaceType: 'event room' | 'phone booth' | 'meeting room';
  dateCreated: Date;
  dateUpdated: Date;
  // to add meeting space sessions in progress
}
