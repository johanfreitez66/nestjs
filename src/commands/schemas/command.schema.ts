import { EntitySchema } from 'typeorm';
import { User } from '../entities';

export const CommandSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
    },
  },
});
