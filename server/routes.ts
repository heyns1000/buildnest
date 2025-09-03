import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import preBuildCheck from "../protocols/LaundroAI/pre-build-check";
import metadataWasher from "../protocols/OmniGrid/metadata-washer";
import "./types"; // Import extended types

export async function registerRoutes(app: Express): Promise<Server> {
  // FAA ScrollStack API Routes
  
  // FruitfulPlanetChange: App registration endpoint
  app.post('/api/register-app', async (req, res) => {
    try {
      console.log('🍃 FruitfulPlanetChange: App registration initiated');
      
      // The intake middleware has already processed the request
      const fareContext = req.fareContext;
      
      res.json({
        success: true,
        message: 'App registration processed through FruitfulPlanetChange intake',
        fareContext,
        intakeStatus: req.intakeStatus
      });
    } catch (error) {
      res.status(500).json({ error: 'App registration failed' });
    }
  });

  // LaundroAI: Build validation endpoint
  app.post('/api/validate-build', async (req, res) => {
    try {
      console.log('🧺 LaundroAI: Build validation requested');
      
      const buildContext = {
        buildId: req.body.buildId || 'build-' + Date.now(),
        source: req.body.source || 'unknown',
        authenticated: req.body.authenticated || false,
        hasLintErrors: req.body.hasLintErrors || false,
        hasSecurityIssues: req.body.hasSecurityIssues || false,
        compliant: req.body.compliant !== false
      };
      
      const validationResult = preBuildCheck(buildContext);
      
      res.json({
        success: true,
        message: 'Build validation completed through LaundroAI',
        buildContext,
        validationResult
      });
    } catch (error) {
      res.status(500).json({ error: 'Build validation failed' });
    }
  });

  // OmniGrid: Metadata washing endpoint
  app.post('/api/wash-metadata', async (req, res) => {
    try {
      console.log('🔄 OmniGrid: Metadata washing requested');
      
      const metadata = req.body.metadata || {};
      const paymentContext = {
        verified: req.body.paymentVerified || false
      };
      const treatySync = {
        synchronized: req.body.treatySynchronized || true,
        status: req.body.treatyStatus || 'active'
      };
      
      const cleanedMetadata = metadataWasher(metadata, paymentContext, treatySync);
      
      res.json({
        success: true,
        message: 'Metadata washing completed through OmniGrid',
        cleanedMetadata
      });
    } catch (error) {
      res.status(500).json({ error: 'Metadata washing failed' });
    }
  });

  // FAA ScrollStack status endpoint
  app.get('/api/scroll-status', async (req, res) => {
    try {
      res.json({
        success: true,
        message: '🔒 FAA ScrollStack Active',
        status: {
          fareTradeCheckpoint: 'ACTIVE - Non-global enforcement layer',
          fruitfulPlanetChange: 'LINKED - Intake middleware operational',
          laundroAI: 'LINKED - Pre-build check operational', 
          omniGrid: 'LINKED - Metadata washer operational'
        },
        protocols: {
          fareCheckpoint: '✅ Encoded into FAA ScrollStack',
          enforcement: '🧱 Active but non-destructive',
          realignment: '📜 Checkpointed scroll realignment',
          vaultStatus: '🔓 Vault stays open, glyphs flow clean'
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Status check failed' });
    }
  });

  // Demo scenario update endpoint
  app.post('/api/scenario-update', async (req, res) => {
    try {
      const { scenario, step, metrics } = req.body;
      
      console.log(`🎮 Demo Scenario Update: ${scenario} - Step ${step}`);
      if (metrics) {
        console.log('📊 Metrics Update:', metrics);
      }
      
      // Here you could update real system metrics, trigger alerts, etc.
      // For now, we'll just acknowledge the update
      
      res.json({
        success: true,
        message: 'Scenario metrics updated',
        scenario,
        step,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Scenario update failed:', error);
      res.status(500).json({ error: 'Scenario update failed' });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
