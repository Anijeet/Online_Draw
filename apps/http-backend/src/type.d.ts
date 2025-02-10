import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; 
      // Add your custom property here
    }
    interface decoded{
        userId?: string;
    }
  }
}
