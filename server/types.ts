// Extended Express types for FAA ScrollStack
import { ScrollContext } from '../protocols/fare-checkpoint';

declare global {
  namespace Express {
    interface Request {
      fareContext?: ScrollContext;
      intakeStatus?: string;
    }
  }
}

export {};