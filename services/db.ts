// FIX: Separated the Dexie class import from the Table type import to resolve a TypeScript type inference issue with class inheritance.
import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { PersonalContact, UserProfile } from '../types';

// FIX: Corrected a TypeScript type resolution error with Dexie inheritance.
// Using explicit type-only imports helps the compiler correctly infer the
// types from the base Dexie class, making instance methods like .version() available.
class AapdaMitraDB extends Dexie {
  personalContacts!: Table<PersonalContact, number>;
  userProfile!: Table<UserProfile, number>;

  constructor() {
    super('aapdaMitraDB');
    this.version(1).stores({
      personalContacts: '++id, name, number',
      userProfile: '&id, name, phone, age, gender',
    });
  }
}

export const db = new AapdaMitraDB();