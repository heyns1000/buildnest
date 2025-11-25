/**
 * Infrastructure API Routes for HotStack
 *
 * Provides API endpoints for DNS provisioning, email notifications,
 * and domain management for HotStack deployments.
 */

import type { Express, Request, Response } from "express";
import { dnsHookService } from "./dns-hook-service";
import { emailService } from "./email-service";

export function registerInfrastructureRoutes(app: Express) {
  /**
   * Provision a complete domain setup for HotStack deployment
   * POST /api/infrastructure/provision-domain
   */
  app.post("/api/infrastructure/provision-domain", async (req: Request, res: Response) => {
    try {
      const { appId, userId, customDomain } = req.body;

      if (!appId || !userId) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: appId, userId"
        });
      }

      console.log(`🌐 Provisioning domain for app ${appId} (user: ${userId})`);

      const userDomain = await dnsHookService.provisionUserDomain(
        appId,
        userId,
        customDomain
      );

      res.json({
        success: true,
        mode: "REAL_INFRASTRUCTURE",
        message: "Domain provisioned successfully",
        domain: userDomain.fullDomain,
        data: {
          subdomain: userDomain.subdomain,
          fullDomain: userDomain.fullDomain,
          dnsRecords: userDomain.dnsRecords,
          sslEnabled: userDomain.sslEnabled,
          status: userDomain.status,
          createdAt: userDomain.createdAt
        }
      });
    } catch (error) {
      console.error("❌ Domain provisioning failed:", error);
      res.status(500).json({
        success: false,
        error: "Domain provisioning failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Send deployment success email to user
   * POST /api/infrastructure/send-deployment-email
   */
  app.post("/api/infrastructure/send-deployment-email", async (req: Request, res: Response) => {
    try {
      const { userId, userEmail, appName, appId, domain, claimRootLicense } = req.body;

      if (!userEmail || !appName || !domain) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: userEmail, appName, domain"
        });
      }

      console.log(`📧 Sending deployment email to ${userEmail}`);

      const emailSent = await emailService.sendDeploymentSuccessEmail({
        userId: userId || "unknown",
        userEmail,
        appName,
        appId: appId || "unknown",
        domain,
        claimRootLicense: claimRootLicense || "PENDING",
        deployedAt: new Date()
      });

      if (emailSent) {
        res.json({
          success: true,
          mode: "REAL_INFRASTRUCTURE",
          message: "Deployment email sent successfully",
          recipient: userEmail
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Email sending failed"
        });
      }
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      res.status(500).json({
        success: false,
        error: "Email sending failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Check DNS status for a domain
   * GET /api/infrastructure/dns-status/:domain
   */
  app.get("/api/infrastructure/dns-status/:domain", async (req: Request, res: Response) => {
    try {
      const { domain } = req.params;

      console.log(`🔍 Checking DNS status for ${domain}`);

      const dnsStatus = await dnsHookService.getDNSStatus(domain);

      res.json({
        success: true,
        mode: "REAL_INFRASTRUCTURE",
        domain,
        status: dnsStatus
      });
    } catch (error) {
      console.error("❌ DNS status check failed:", error);
      res.status(500).json({
        success: false,
        error: "DNS status check failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Setup email forwarding for a domain
   * POST /api/infrastructure/setup-email-forwarding
   */
  app.post("/api/infrastructure/setup-email-forwarding", async (req: Request, res: Response) => {
    try {
      const { domain, forwardTo } = req.body;

      if (!domain || !forwardTo) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: domain, forwardTo"
        });
      }

      console.log(`📧 Setting up email forwarding for ${domain} → ${forwardTo}`);

      const success = await dnsHookService.setupEmailForwarding(domain, forwardTo);

      if (success) {
        res.json({
          success: true,
          mode: "REAL_INFRASTRUCTURE",
          message: "Email forwarding configured successfully",
          domain,
          forwardTo
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Email forwarding setup failed"
        });
      }
    } catch (error) {
      console.error("❌ Email forwarding setup failed:", error);
      res.status(500).json({
        success: false,
        error: "Email forwarding setup failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Delete DNS records for a domain
   * DELETE /api/infrastructure/delete-domain
   */
  app.delete("/api/infrastructure/delete-domain", async (req: Request, res: Response) => {
    try {
      const { domain } = req.body;

      if (!domain) {
        return res.status(400).json({
          success: false,
          error: "Missing required field: domain"
        });
      }

      console.log(`🗑️  Deleting DNS records for ${domain}`);

      const success = await dnsHookService.deleteDNSRecords(domain);

      if (success) {
        res.json({
          success: true,
          mode: "REAL_INFRASTRUCTURE",
          message: "DNS records deleted successfully",
          domain
        });
      } else {
        res.status(500).json({
          success: false,
          error: "DNS record deletion failed"
        });
      }
    } catch (error) {
      console.error("❌ DNS record deletion failed:", error);
      res.status(500).json({
        success: false,
        error: "DNS record deletion failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Enable SSL for a domain
   * POST /api/infrastructure/enable-ssl
   */
  app.post("/api/infrastructure/enable-ssl", async (req: Request, res: Response) => {
    try {
      const { domain } = req.body;

      if (!domain) {
        return res.status(400).json({
          success: false,
          error: "Missing required field: domain"
        });
      }

      console.log(`🔒 Enabling SSL for ${domain}`);

      const success = await dnsHookService.enableSSL(domain);

      if (success) {
        res.json({
          success: true,
          mode: "REAL_INFRASTRUCTURE",
          message: "SSL enabled successfully",
          domain
        });
      } else {
        res.status(500).json({
          success: false,
          error: "SSL enablement failed"
        });
      }
    } catch (error) {
      console.error("❌ SSL enablement failed:", error);
      res.status(500).json({
        success: false,
        error: "SSL enablement failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Send ClaimRoot license email
   * POST /api/infrastructure/send-claimroot-email
   */
  app.post("/api/infrastructure/send-claimroot-email", async (req: Request, res: Response) => {
    try {
      const { email, appName, licenseId, pdfUrl } = req.body;

      if (!email || !appName || !licenseId) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: email, appName, licenseId"
        });
      }

      console.log(`🔒 Sending ClaimRoot license to ${email}`);

      const emailSent = await emailService.sendClaimRootLicenseEmail(
        email,
        appName,
        licenseId,
        pdfUrl || "#"
      );

      if (emailSent) {
        res.json({
          success: true,
          mode: "REAL_INFRASTRUCTURE",
          message: "ClaimRoot license email sent successfully",
          recipient: email
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Email sending failed"
        });
      }
    } catch (error) {
      console.error("❌ ClaimRoot email sending failed:", error);
      res.status(500).json({
        success: false,
        error: "ClaimRoot email sending failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Complete HotStack deployment (provision domain + send email)
   * POST /api/infrastructure/complete-deployment
   */
  app.post("/api/infrastructure/complete-deployment", async (req: Request, res: Response) => {
    try {
      const {
        appId,
        userId,
        userEmail,
        appName,
        customDomain,
        claimRootLicense
      } = req.body;

      if (!appId || !userId || !userEmail || !appName) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: appId, userId, userEmail, appName"
        });
      }

      console.log(`🚀 Completing HotStack deployment for ${appName}`);

      // Step 1: Provision domain
      const userDomain = await dnsHookService.provisionUserDomain(
        appId,
        userId,
        customDomain
      );

      if (userDomain.status === 'failed') {
        return res.status(500).json({
          success: false,
          error: "Domain provisioning failed"
        });
      }

      // Step 2: Send deployment email
      const emailSent = await emailService.sendDeploymentSuccessEmail({
        userId,
        userEmail,
        appName,
        appId,
        domain: userDomain.fullDomain,
        claimRootLicense: claimRootLicense || "PENDING",
        deployedAt: new Date()
      });

      res.json({
        success: true,
        mode: "REAL_INFRASTRUCTURE",
        message: "HotStack deployment completed successfully",
        deployment: {
          appId,
          appName,
          domain: userDomain.fullDomain,
          subdomain: userDomain.subdomain,
          sslEnabled: userDomain.sslEnabled,
          emailSent,
          status: userDomain.status,
          deployedAt: userDomain.createdAt
        }
      });
    } catch (error) {
      console.error("❌ Complete deployment failed:", error);
      res.status(500).json({
        success: false,
        error: "Complete deployment failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  /**
   * Get infrastructure status
   * GET /api/infrastructure/status
   */
  app.get("/api/infrastructure/status", (req: Request, res: Response) => {
    res.json({
      success: true,
      mode: "REAL_INFRASTRUCTURE",
      status: "active",
      services: {
        dns: {
          enabled: true,
          provider: "cloudflare",
          configured: !!(process.env.CLOUDFLARE_API_KEY && process.env.CLOUDFLARE_ZONE_ID),
          baseDomain: "faa.zone"
        },
        email: {
          enabled: true,
          provider: process.env.EMAIL_PROVIDER || "resend",
          configured: !!(process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY),
          fromEmail: process.env.EMAIL_FROM || "hotstack@faa.zone"
        }
      },
      endpoints: [
        "POST /api/infrastructure/provision-domain",
        "POST /api/infrastructure/send-deployment-email",
        "GET /api/infrastructure/dns-status/:domain",
        "POST /api/infrastructure/setup-email-forwarding",
        "DELETE /api/infrastructure/delete-domain",
        "POST /api/infrastructure/enable-ssl",
        "POST /api/infrastructure/send-claimroot-email",
        "POST /api/infrastructure/complete-deployment",
        "GET /api/infrastructure/status"
      ]
    });
  });

  console.log("✅ Infrastructure routes registered");
}
