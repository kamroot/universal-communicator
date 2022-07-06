import { Entity } from 'typeorm';

@Entity()
export class VideoHistoryEntity {
  constructor(
    id,
    source,
    type,
    name,
    status,
    started_at,
    ended_at,
    charge,
    created_at,
  ) {
    this.id = name;
    this.source = source;
    this.type = type;
    this.name = name;
    this.status = status;
    this.started_at = started_at;
    this.ended_at = ended_at;
    this.charge = charge;
    this.created_at = created_at;
  }

  id: string;
  source: 'realtime_api';
  type: 'video_conference_session';
  name: string;
  status: 'completed' | 'cancelled' | 'failed';
  started_at: Date;
  ended_at: Date;
  charge: number;
  created_at: Date;
}

@Entity()
export class VoiceHistoryEntity {
  constructor(
    id,
    source,
    type,
    name,
    status,
    started_at,
    ended_at,
    charge,
    created_at,
  ) {
    this.id = name;
    this.source = source;
    this.type = type;
    this.name = name;
    this.status = status;
    this.started_at = started_at;
    this.ended_at = ended_at;
    this.charge = charge;
    this.created_at = created_at;
  }
  id: string;
  source: 'realtime_api';
  type: 'video_conference_session';
  name: string;
  status: 'completed' | 'cancelled' | 'failed';
  started_at: Date;
  ended_at: Date;
  charge: number;
  created_at: Date;
}

@Entity()
export class MessageHistoryEntity {
  constructor(
    id,
    source,
    type,
    name,
    status,
    started_at,
    ended_at,
    charge,
    created_at,
  ) {
    this.id = name;
    this.source = source;
    this.type = type;
    this.name = name;
    this.status = status;
    this.started_at = started_at;
    this.ended_at = ended_at;
    this.charge = charge;
    this.created_at = created_at;
  }

  id: string;
  source: 'realtime_api';
  type: 'video_conference_session';
  name: string;
  status: 'completed' | 'cancelled' | 'failed';
  started_at: Date;
  ended_at: Date;
  charge: number;
  created_at: Date;
}
