/**
 * Real Data API Routes
 *
 * API endpoints for fetching REAL data from repositories
 * instead of generating fake AI data.
 *
 * These endpoints are called by HotStack when a user uploads a file,
 * and by CodeNest when polishing user requests with authentic data.
 */

import type { Express } from "express";
import { realDataService } from "./real-data-service";

export function registerRealDataRoutes(app: Express) {
  /**
   * GET /api/data/fetch-real-brands
   * Fetch real brand data from BuildNest ecosystem
   */
  app.get("/api/data/fetch-real-brands", async (req, res) => {
    try {
      const brands = await realDataService.fetchRealBrands();
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        source: 'buildnest',
        count: brands.length,
        data: brands,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * GET /api/data/fetch-real-projects
   * Fetch real project templates from BuildNest components
   */
  app.get("/api/data/fetch-real-projects", async (req, res) => {
    try {
      const projects = await realDataService.fetchRealProjects();
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        source: 'buildnest:components',
        count: projects.length,
        data: projects,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * GET /api/data/fetch-real-templates
   * Fetch real HTML templates from attached_assets
   */
  app.get("/api/data/fetch-real-templates", async (req, res) => {
    try {
      const templates = await realDataService.fetchRealTemplates();
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        source: 'buildnest:attached_assets',
        count: templates.length,
        data: templates,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * GET /api/data/fetch-real-protocols
   * Fetch real protocol implementations from protocols directory
   */
  app.get("/api/data/fetch-real-protocols", async (req, res) => {
    try {
      const protocols = await realDataService.fetchRealProtocols();
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        source: 'buildnest:protocols',
        count: protocols.length,
        data: protocols,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * GET /api/data/component/:name
   * Fetch real component data by name
   */
  app.get("/api/data/component/:name", async (req, res) => {
    try {
      const componentName = req.params.name;
      const component = await realDataService.fetchComponentData(componentName);

      if (!component) {
        return res.status(404).json({
          success: false,
          error: `Component '${componentName}' not found`
        });
      }

      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        source: `buildnest:components/${componentName}`,
        data: component,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * POST /api/data/sync-repositories
   * Sync and cache data from all repositories
   */
  app.post("/api/data/sync-repositories", async (req, res) => {
    try {
      const dataSources = await realDataService.syncAllRepositories();
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        message: 'Repository data synchronized successfully',
        sources: dataSources,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * POST /api/data/polish-user-request
   * Polish user request with REAL data from repositories
   * This is called when HotStack user uploads a file
   */
  app.post("/api/data/polish-user-request", async (req, res) => {
    try {
      const { userRequest, uploadedFile } = req.body;

      // Fetch all relevant real data
      const realData = await realDataService.getRealDataForRequest(userRequest);

      // Return real data for AI to use instead of generating fake data
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        message: 'Real data fetched for polishing user request',
        userRequest: userRequest,
        uploadedFile: uploadedFile,
        realData: realData,
        instructions: {
          forAI: 'USE THIS REAL DATA ONLY. DO NOT GENERATE FAKE DATA.',
          workflow: 'HotStack Upload → BuildNest Fetch Real Data → AI Polish with Real Data → CodeNest Deploy',
          dataSources: realData.sources
        },
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * GET /api/data/omnidrop-context
   * Get complete context with REAL data for Omnidrop processing
   */
  app.get("/api/data/omnidrop-context", async (req, res) => {
    try {
      const brands = await realDataService.fetchRealBrands();
      const projects = await realDataService.fetchRealProjects();
      const protocols = await realDataService.fetchRealProtocols();
      const templates = await realDataService.fetchRealTemplates();

      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        context: {
          brands: {
            count: brands.length,
            data: brands
          },
          projects: {
            count: projects.length,
            data: projects
          },
          protocols: {
            count: protocols.length,
            data: protocols
          },
          templates: {
            count: templates.length,
            data: templates
          }
        },
        sources: [
          'buildnest:components',
          'buildnest:protocols',
          'buildnest:attached_assets',
          'codenest:projects',
          'fruitfulplanetchange:data'
        ],
        workflow: 'HotStack Upload → BuildNest Fetch Real Data → AI Polish with Real Data → CodeNest Deploy',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  /**
   * GET /api/data/integration-status
   * Check status of data integration with all repositories
   */
  app.get("/api/data/integration-status", async (req, res) => {
    try {
      res.json({
        success: true,
        mode: 'REAL_DATA_ONLY',
        status: 'active',
        repositories: {
          buildnest: {
            status: 'connected',
            url: 'https://github.com/heyns1000/buildnest',
            dataTypes: ['components', 'protocols', 'assets', 'schemas']
          },
          codenest: {
            status: 'connected',
            url: 'https://github.com/heyns1000/codenest',
            dataTypes: ['projects', 'apiKeys', 'templates']
          },
          fruitfulplanetchange: {
            status: 'ready',
            url: 'https://github.com/fruitful-global-planet/fruitfulplanetchange',
            dataTypes: ['brands', 'registrations', 'protocols', 'treaties']
          }
        },
        dataIntegration: {
          enabled: true,
          description: 'Using REAL data from repositories instead of AI-generated fake data',
          workflow: 'HotStack Upload → BuildNest Fetch Real Data → AI Polish with Real Data → CodeNest Deploy'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  console.log('✅ Real Data API routes registered');
  console.log('   📊 /api/data/fetch-real-brands');
  console.log('   📊 /api/data/fetch-real-projects');
  console.log('   📊 /api/data/fetch-real-templates');
  console.log('   📊 /api/data/fetch-real-protocols');
  console.log('   📊 /api/data/component/:name');
  console.log('   📊 /api/data/sync-repositories');
  console.log('   📊 /api/data/polish-user-request');
  console.log('   📊 /api/data/omnidrop-context');
  console.log('   📊 /api/data/integration-status');
}
