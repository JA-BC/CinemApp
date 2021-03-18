
export interface IEntity<TIdentity> {
  id: TIdentity;
}

export enum EServiceState {
  Browse,
  Update,
  Load,
  Cancel
}

export interface IUser {
  uid: string;
  username: string;
  email: string;
  password: string;
  fullname: string;
}
