// FruitfulPlanetChange/intake-middleware.ts
import { fareTradeCheckpoint, initializeScrollContext } from '../fare-checkpoint';

export const intakeMiddleware = (req: any, res: any, next: any) => {
  // Initialize context for new app registration
  const context = initializeScrollContext();
  
  // Set actor as trusted for app registration flow
  context.actor = {
    isTrusted: true,
    id: req.sessionID || 'intake-session',
    role: 'app-registrant'
  };

  // Check for scroll deviation during intake
  context.scroll = {
    ...context.scroll,
    showsDeviation: req.body?.hasDeviation || false,
    realign: (status: string) => {
      console.log(`🌍 FruitfulPlanetChange: Intake realigned with status: ${status}`);
      req.intakeStatus = status;
    }
  };

  // Process through fare trade checkpoint
  const processedContext = fareTradeCheckpoint(context);
  
  // Attach processed context to request
  req.fareContext = processedContext;
  
  console.log('🍃 FruitfulPlanetChange: Intake middleware processed');
  next();
};

export default intakeMiddleware;