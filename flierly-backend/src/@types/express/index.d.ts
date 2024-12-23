declare namespace Express {
  interface Request {
    username?: string;
    id: UUID;
    userId: ObjectId;
  }
}
