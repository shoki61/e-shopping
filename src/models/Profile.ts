export interface Profile {
  name: string;

  _id: string;

  email: string;

  emailVerified: boolean;

  isAdmin?: boolean;
}
