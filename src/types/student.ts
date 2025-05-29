export interface Student {
  userId: string;
  name: string;
  grade: string;
  subscription: Subscription;
}

export enum Subscription {
  Basic = "basic",
  Premium = "premium",
  Advanced = "advanced"
}
