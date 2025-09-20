// FIX: Corrected the import of Dexie and Table to resolve a type inference issue with class inheritance.
import Dexie, { Table } from 'dexie';
import type { PersonalContact, UserProfile } from '../types';

class AapdaMitraDB extends Dexie {
  personalContacts!: Table<PersonalContact, number>;
  userProfile!: Table<UserProfile, number>;

  constructor() {
    super('aapdaMitraDB');
    this.version(1).stores({
      personalContacts: '++id, name, number',
      userProfile: '&id, name, phone, age, gender',
    });
    this.version(2).stores({
      personalContacts: '++id, name, number, isSosContact',
    });
  }
}

export const db = new AapdaMitraDB();