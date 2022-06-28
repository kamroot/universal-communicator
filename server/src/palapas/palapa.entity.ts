import { Column, Entity } from 'typeorm';

@Entity()
export class Palapa {
  constructor(name, id, description) {
    this.name = name;
    this.description = description ? description : '-';
    this.id = id;

    if (name.includes('Event Room')) {
      this.palapaType = 'event room';
    } else if (name.includes('Phone Booth')) {
      this.palapaType = 'phone booth';
    } else if (name.includes('Meeting Room')) {
      this.palapaType = 'meeting room';
    }
  }
  id: string;
  name: string;
  description: string;
  palapaType: 'event room' | 'phone booth' | 'meeting room';
}
