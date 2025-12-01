/**
 * License Management API Routes
 *
 * Provides API endpoints for ClaimRoot™ license generation and
 * LicenseVault™ storage operations
 *
 * Integrated Services:
 * - ClaimRoot™ (heyns1000/claimroot) - License generation
 * - LicenseVault™ (heyns1000/licensevault) - License storage
 */

import type { Express, Request, Response } from "express";
import { claimRootService } from "./claimroot-service";
import { licenseVaultService } from "./licensevault-service";

export function registerLicenseRoutes(app: Express) {
  // ============================================================
  // CLAIMROOT™ LICENSE GENERATION ENDPOINTS
  // ============================================================

  /**
   * Generate a new ClaimRoot™ license
   * POST /api/licenses/generate
   */
  app.post("/api/licenses/generate", async (req: Request, res: Response) => {
    try {
      const {
        appId,
        appName,
        userId,
        domain,
        issuedTo,
        sector,
        treatyType
      } = req.body;

      if (!appId || !appName || !userId || !domain || !issuedTo) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: appId, appName, userId, domain, issuedTo"
        });
      }

      console.log(`📜 Generating ClaimRoot™ license for ${appName}`);

      // Generate ClaimRoot license
      const license = await claimRootService.generateLicense({
        appId,
        appName,
        userId,
        domain,
        issuedTo,
        sector,
        treatyType: treatyType || 'STANDARD'
      });

      // Store in LicenseVault
      const vaultResult = await licenseVaultService.storeLicense(license, userId);

      res.json({
        success: true,
        mode: "REAL_LICENSE_GENERATION",
        message: "ClaimRoot™ license generated and stored",
        license: {
          licenseId: license.licenseId,
          appId: license.appId,
          appName: license.appName,
          domain: license.domain,
          scrollHash: license.scrollHash,
          treatyPosition: license.treatyPosition,
          issuedAt: license.issuedAt,
          expiresAt: license.expiresAt,
          pdfUrl: license.pdfUrl,
          complianceStatus: license.complianceStatus,
          scrollBound: license.scrollBound,
          vaultMeshSync: license.vaultMeshSync
        },
        vault: {
          vaultId: vaultResult.vaultId,
          stored: vaultResult.success,
          backupStatus: vaultResult.success ? 'SYNCED' : 'FAILED'
        }
      });
    } catch (error) {
      console.error("❌ License generation failed:", error);
      res.status(500).json({
        success: false,
        error: "License generation failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Verify a ClaimRoot™ license by scroll hash
   * POST /api/licenses/verify
   */
  app.post("/api/licenses/verify", async (req: Request, res: Response) => {
    try {
      const { scrollHash } = req.body;

      if (!scrollHash) {
        return res.status(400).json({
          success: false,
          error: "Missing required field: scrollHash"
        });
      }

      console.log(`🔍 Verifying license with scroll hash: ${scrollHash}`);

      const verification = await claimRootService.verifyLicense(scrollHash);

      res.json({
        success: verification.valid,
        mode: "REAL_LICENSE_VERIFICATION",
        verified: verification.valid,
        message: verification.message,
        scrollHash
      });
    } catch (error) {
      console.error("❌ License verification failed:", error);
      res.status(500).json({
        success: false,
        error: "License verification failed"
      });
    }
  });

  /**
   * Get ClaimRoot™ statistics
   * GET /api/licenses/claimroot/statistics
   */
  app.get("/api/licenses/claimroot/statistics", (req: Request, res: Response) => {
    try {
      const stats = claimRootService.getStatistics();

      res.json({
        success: true,
        mode: "REAL_LICENSE_STATISTICS",
        statistics: stats,
        service: "ClaimRoot™",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("❌ Statistics retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "Statistics retrieval failed"
      });
    }
  });

  /**
   * Get treaty log entry by position
   * GET /api/licenses/treaty-log/:position
   */
  app.get("/api/licenses/treaty-log/:position", (req: Request, res: Response) => {
    try {
      const position = parseInt(req.params.position, 10);

      if (isNaN(position)) {
        return res.status(400).json({
          success: false,
          error: "Invalid treaty position"
        });
      }

      const entry = claimRootService.getTreatyLogEntry(position);

      if (!entry) {
        return res.status(404).json({
          success: false,
          error: "Treaty log entry not found"
        });
      }

      res.json({
        success: true,
        mode: "REAL_TREATY_LOG",
        entry,
        position
      });
    } catch (error) {
      console.error("❌ Treaty log retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "Treaty log retrieval failed"
      });
    }
  });

  /**
   * Get treaty log (paginated)
   * GET /api/licenses/treaty-log
   */
  app.get("/api/licenses/treaty-log", (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 50;
      const offset = parseInt(req.query.offset as string, 10) || 0;

      const log = claimRootService.getTreatyLog(limit, offset);

      res.json({
        success: true,
        mode: "REAL_TREATY_LOG",
        log,
        pagination: {
          limit,
          offset,
          count: log.length
        }
      });
    } catch (error) {
      console.error("❌ Treaty log retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "Treaty log retrieval failed"
      });
    }
  });

  // ============================================================
  // LICENSEVAULT™ STORAGE ENDPOINTS
  // ============================================================

  /**
   * Retrieve a license from the vault
   * GET /api/licenses/vault/:licenseId
   */
  app.get("/api/licenses/vault/:licenseId", async (req: Request, res: Response) => {
    try {
      const { licenseId } = req.params;
      const userId = req.query.userId as string;

      console.log(`🔍 Retrieving license ${licenseId} from vault`);

      const result = await licenseVaultService.retrieveLicense(licenseId, userId);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          error: result.message
        });
      }

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        license: result.license,
        vaultId: result.vaultId,
        message: result.message
      });
    } catch (error) {
      console.error("❌ License retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "License retrieval failed"
      });
    }
  });

  /**
   * Get all licenses for a user
   * GET /api/licenses/vault/user/:userId
   */
  app.get("/api/licenses/vault/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      console.log(`👤 Retrieving all licenses for user: ${userId}`);

      const licenses = await licenseVaultService.getLicensesByUser(userId);

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        licenses,
        count: licenses.length,
        userId
      });
    } catch (error) {
      console.error("❌ User licenses retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "User licenses retrieval failed"
      });
    }
  });

  /**
   * Get all licenses for a domain
   * GET /api/licenses/vault/domain/:domain
   */
  app.get("/api/licenses/vault/domain/:domain", async (req: Request, res: Response) => {
    try {
      const { domain } = req.params;

      console.log(`🌐 Retrieving all licenses for domain: ${domain}`);

      const licenses = await licenseVaultService.getLicensesByDomain(domain);

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        licenses,
        count: licenses.length,
        domain
      });
    } catch (error) {
      console.error("❌ Domain licenses retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "Domain licenses retrieval failed"
      });
    }
  });

  /**
   * Get all licenses for an app
   * GET /api/licenses/vault/app/:appId
   */
  app.get("/api/licenses/vault/app/:appId", async (req: Request, res: Response) => {
    try {
      const { appId } = req.params;

      console.log(`📱 Retrieving all licenses for app: ${appId}`);

      const licenses = await licenseVaultService.getLicensesByApp(appId);

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        licenses,
        count: licenses.length,
        appId
      });
    } catch (error) {
      console.error("❌ App licenses retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "App licenses retrieval failed"
      });
    }
  });

  /**
   * Verify a license in the vault
   * GET /api/licenses/vault/verify/:licenseId
   */
  app.get("/api/licenses/vault/verify/:licenseId", async (req: Request, res: Response) => {
    try {
      const { licenseId } = req.params;

      console.log(`🔍 Verifying license ${licenseId} in vault`);

      const verification = await licenseVaultService.verifyLicenseInVault(licenseId);

      res.json({
        success: verification.valid,
        mode: "REAL_LICENSE_VAULT",
        valid: verification.valid,
        expired: verification.expired,
        vaultMeshSynced: verification.vaultMeshSynced,
        message: verification.message,
        licenseId
      });
    } catch (error) {
      console.error("❌ Vault verification failed:", error);
      res.status(500).json({
        success: false,
        error: "Vault verification failed"
      });
    }
  });

  /**
   * Export a license as JSON
   * GET /api/licenses/vault/export/:licenseId
   */
  app.get("/api/licenses/vault/export/:licenseId", async (req: Request, res: Response) => {
    try {
      const { licenseId } = req.params;
      const userId = req.query.userId as string;

      console.log(`📤 Exporting license ${licenseId}`);

      const exportResult = await licenseVaultService.exportLicense(licenseId, userId);

      if (!exportResult.success) {
        return res.status(404).json({
          success: false,
          error: exportResult.message
        });
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${licenseId}.json"`);
      res.send(exportResult.data);
    } catch (error) {
      console.error("❌ License export failed:", error);
      res.status(500).json({
        success: false,
        error: "License export failed"
      });
    }
  });

  /**
   * Get LicenseVault™ statistics
   * GET /api/licenses/vault/statistics
   */
  app.get("/api/licenses/vault/statistics", (req: Request, res: Response) => {
    try {
      const stats = licenseVaultService.getStatistics();

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        statistics: stats,
        service: "LicenseVault™",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("❌ Vault statistics retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "Vault statistics retrieval failed"
      });
    }
  });

  /**
   * Get audit log (paginated)
   * GET /api/licenses/vault/audit-log
   */
  app.get("/api/licenses/vault/audit-log", (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 50;
      const offset = parseInt(req.query.offset as string, 10) || 0;

      const auditLog = licenseVaultService.getAuditLog(limit, offset);

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        auditLog,
        pagination: {
          limit,
          offset,
          count: auditLog.length
        }
      });
    } catch (error) {
      console.error("❌ Audit log retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "Audit log retrieval failed"
      });
    }
  });

  /**
   * Get audit log for specific license
   * GET /api/licenses/vault/audit-log/:licenseId
   */
  app.get("/api/licenses/vault/audit-log/:licenseId", (req: Request, res: Response) => {
    try {
      const { licenseId } = req.params;

      const auditLog = licenseVaultService.getAuditLogForLicense(licenseId);

      res.json({
        success: true,
        mode: "REAL_LICENSE_VAULT",
        auditLog,
        licenseId,
        count: auditLog.length
      });
    } catch (error) {
      console.error("❌ License audit log retrieval failed:", error);
      res.status(500).json({
        success: false,
        error: "License audit log retrieval failed"
      });
    }
  });

  /**
   * Perform vault health check
   * GET /api/licenses/vault/health
   */
  app.get("/api/licenses/vault/health", async (req: Request, res: Response) => {
    try {
      const health = await licenseVaultService.healthCheck();

      res.json({
        success: health.healthy,
        mode: "REAL_LICENSE_VAULT",
        health,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("❌ Vault health check failed:", error);
      res.status(500).json({
        success: false,
        error: "Vault health check failed"
      });
    }
  });

  /**
   * Get license management status (combined ClaimRoot + LicenseVault)
   * GET /api/licenses/status
   */
  app.get("/api/licenses/status", (req: Request, res: Response) => {
    try {
      const claimRootStats = claimRootService.getStatistics();
      const vaultStats = licenseVaultService.getStatistics();

      res.json({
        success: true,
        mode: "REAL_LICENSE_MANAGEMENT",
        status: "active",
        services: {
          claimRoot: {
            enabled: true,
            repository: "heyns1000/claimroot",
            status: "operational",
            statistics: claimRootStats
          },
          licenseVault: {
            enabled: true,
            repository: "heyns1000/licensevault",
            status: "operational",
            statistics: vaultStats
          }
        },
        integration: {
          fullstack: true,
          vaultMeshSync: true,
          treatyLogActive: true
        },
        endpoints: {
          generation: [
            "POST /api/licenses/generate",
            "POST /api/licenses/verify",
            "GET /api/licenses/claimroot/statistics",
            "GET /api/licenses/treaty-log/:position",
            "GET /api/licenses/treaty-log"
          ],
          vault: [
            "GET /api/licenses/vault/:licenseId",
            "GET /api/licenses/vault/user/:userId",
            "GET /api/licenses/vault/domain/:domain",
            "GET /api/licenses/vault/app/:appId",
            "GET /api/licenses/vault/verify/:licenseId",
            "GET /api/licenses/vault/export/:licenseId",
            "GET /api/licenses/vault/statistics",
            "GET /api/licenses/vault/audit-log",
            "GET /api/licenses/vault/audit-log/:licenseId",
            "GET /api/licenses/vault/health"
          ],
          status: [
            "GET /api/licenses/status"
          ]
        }
      });
    } catch (error) {
      console.error("❌ License management status check failed:", error);
      res.status(500).json({
        success: false,
        error: "License management status check failed"
      });
    }
  });

  console.log("✅ License management routes registered (ClaimRoot™ + LicenseVault™)");
}
