/**
 * Email Service for HotStack
 *
 * Handles user notifications, deployment confirmations, and system alerts
 * for HotStack Omnidrop deployments.
 */

export interface EmailConfig {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
  }>;
}

export interface DeploymentEmail {
  userId: string;
  userEmail: string;
  appName: string;
  appId: string;
  domain: string;
  claimRootLicense: string;
  deployedAt: Date;
}

export class EmailService {
  private fromEmail: string;
  private apiKey?: string;
  private provider: 'resend' | 'sendgrid' | 'smtp';

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'hotstack@faa.zone';
    this.apiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
    this.provider = (process.env.EMAIL_PROVIDER as any) || 'resend';
  }

  /**
   * Send deployment success email to user
   */
  async sendDeploymentSuccessEmail(deployment: DeploymentEmail): Promise<boolean> {
    console.log(`📧 Sending deployment success email to ${deployment.userEmail}`);

    const html = this.generateDeploymentSuccessHTML(deployment);
    const text = this.generateDeploymentSuccessText(deployment);

    const emailConfig: EmailConfig = {
      to: deployment.userEmail,
      from: this.fromEmail,
      subject: `🎉 Your site is live! ${deployment.appName} deployed successfully`,
      html,
      text
    };

    return await this.sendEmail(emailConfig);
  }

  /**
   * Send email via configured provider
   */
  private async sendEmail(config: EmailConfig): Promise<boolean> {
    try {
      if (this.provider === 'resend' && this.apiKey) {
        return await this.sendViaResend(config);
      } else if (this.provider === 'sendgrid' && this.apiKey) {
        return await this.sendViaSendGrid(config);
      } else {
        // Simulate email sending for development
        return await this.simulateEmailSend(config);
      }
    } catch (error) {
      console.error('❌ Email send failed:', error);
      return false;
    }
  }

  /**
   * Send email via Resend API
   */
  private async sendViaResend(config: EmailConfig): Promise<boolean> {
    console.log('📮 Sending via Resend...');

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: config.from || this.fromEmail,
          to: config.to,
          subject: config.subject,
          html: config.html,
          text: config.text
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Resend API error:', error);
        return false;
      }

      const result = await response.json();
      console.log('✅ Email sent via Resend:', result.id);
      return true;
    } catch (error) {
      console.error('❌ Resend send failed:', error);
      return false;
    }
  }

  /**
   * Send email via SendGrid API
   */
  private async sendViaSendGrid(config: EmailConfig): Promise<boolean> {
    console.log('📮 Sending via SendGrid...');

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: config.to }],
            subject: config.subject
          }],
          from: { email: config.from || this.fromEmail },
          content: [
            { type: 'text/plain', value: config.text || config.html },
            { type: 'text/html', value: config.html }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('❌ SendGrid API error:', error);
        return false;
      }

      console.log('✅ Email sent via SendGrid');
      return true;
    } catch (error) {
      console.error('❌ SendGrid send failed:', error);
      return false;
    }
  }

  /**
   * Simulate email sending for development
   */
  private async simulateEmailSend(config: EmailConfig): Promise<boolean> {
    console.log('🔧 Simulating email send (development mode)...');
    console.log(`📧 To: ${config.to}`);
    console.log(`📧 Subject: ${config.subject}`);
    console.log(`📧 Preview: ${config.text?.substring(0, 100)}...`);
    return true;
  }

  /**
   * Generate deployment success HTML email
   */
  private generateDeploymentSuccessHTML(deployment: DeploymentEmail): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deployment Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #0d1117; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #ffcc00; font-size: 32px; margin: 0; font-weight: 900;">
        🚀 HotStack™
      </h1>
      <p style="color: #a0a0a0; margin-top: 10px;">Omnidrop Deployment System</p>
    </div>

    <!-- Main Card -->
    <div style="background-color: #1a1a1d; border: 1px solid #ffcc00; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(255, 204, 0, 0.2);">
      <h2 style="color: #ffcc00; margin-top: 0; font-size: 24px;">
        🎉 Your Site is Live!
      </h2>

      <p style="color: #e2e8f0; line-height: 1.6; font-size: 16px;">
        Congratulations! Your deployment <strong>${deployment.appName}</strong> has been successfully processed and is now live.
      </p>

      <!-- Deployment Details -->
      <div style="background-color: #2a2a2e; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #ffcc00; margin-top: 0; font-size: 18px;">Deployment Details</h3>

        <div style="margin: 10px 0;">
          <strong style="color: #a0a0a0;">App Name:</strong>
          <span style="color: #e2e8f0;">${deployment.appName}</span>
        </div>

        <div style="margin: 10px 0;">
          <strong style="color: #a0a0a0;">App ID:</strong>
          <span style="color: #e2e8f0; font-family: monospace;">${deployment.appId}</span>
        </div>

        <div style="margin: 10px 0;">
          <strong style="color: #a0a0a0;">Domain:</strong>
          <a href="https://${deployment.domain}" style="color: #3b82f6; text-decoration: none;">${deployment.domain}</a>
        </div>

        <div style="margin: 10px 0;">
          <strong style="color: #a0a0a0;">ClaimRoot™ License:</strong>
          <span style="color: #22c55e; font-family: monospace;">${deployment.claimRootLicense}</span>
        </div>

        <div style="margin: 10px 0;">
          <strong style="color: #a0a0a0;">Deployed:</strong>
          <span style="color: #e2e8f0;">${deployment.deployedAt.toLocaleString()}</span>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://${deployment.domain}" style="display: inline-block; background-color: #ffcc00; color: #1a1a1d; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 16px;">
          Visit Your Site →
        </a>
      </div>

      <!-- Features -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3a3a3e;">
        <h3 style="color: #ffcc00; font-size: 18px; margin-bottom: 15px;">What's Included:</h3>
        <ul style="color: #e2e8f0; line-height: 1.8; padding-left: 20px;">
          <li>✅ <strong>SSL Certificate:</strong> Automatic HTTPS encryption</li>
          <li>✅ <strong>DNS Configuration:</strong> Global DNS propagation</li>
          <li>✅ <strong>VaultMesh™ Sync:</strong> 9-second pulse synchronization</li>
          <li>✅ <strong>ClaimRoot™ Verified:</strong> Secure site ownership</li>
          <li>✅ <strong>Treaty-Linked:</strong> FAA ecosystem integration</li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; color: #666;">
      <p style="font-size: 14px;">
        Powered by <a href="https://hotstack.faa.zone" style="color: #ffcc00; text-decoration: none;">HotStack™</a> |
        <a href="https://fruitful.faa.zone" style="color: #ffcc00; text-decoration: none;">Fruitful Global</a>
      </p>
      <p style="font-size: 12px; margin-top: 10px;">
        ScrollSynced | Vault-Verified | Treaty-Bound
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate deployment success plain text email
   */
  private generateDeploymentSuccessText(deployment: DeploymentEmail): string {
    return `
🎉 YOUR SITE IS LIVE!

Congratulations! Your deployment "${deployment.appName}" has been successfully processed.

DEPLOYMENT DETAILS:
- App Name: ${deployment.appName}
- App ID: ${deployment.appId}
- Domain: https://${deployment.domain}
- ClaimRoot™ License: ${deployment.claimRootLicense}
- Deployed: ${deployment.deployedAt.toLocaleString()}

VISIT YOUR SITE:
https://${deployment.domain}

WHAT'S INCLUDED:
✅ SSL Certificate - Automatic HTTPS encryption
✅ DNS Configuration - Global DNS propagation
✅ VaultMesh™ Sync - 9-second pulse synchronization
✅ ClaimRoot™ Verified - Secure site ownership
✅ Treaty-Linked - FAA ecosystem integration

---
Powered by HotStack™ | Fruitful Global
ScrollSynced | Vault-Verified | Treaty-Bound
    `.trim();
  }

  /**
   * Send ClaimRoot™ license email
   */
  async sendClaimRootLicenseEmail(
    email: string,
    appName: string,
    licenseId: string,
    pdfUrl: string
  ): Promise<boolean> {
    console.log(`📧 Sending ClaimRoot™ license to ${email}`);

    const emailConfig: EmailConfig = {
      to: email,
      from: this.fromEmail,
      subject: `🔒 Your ClaimRoot™ License for ${appName}`,
      html: `
        <h2>ClaimRoot™ License Issued</h2>
        <p>Your license for <strong>${appName}</strong> has been generated.</p>
        <p><strong>License ID:</strong> ${licenseId}</p>
        <p><a href="${pdfUrl}">Download License PDF</a></p>
      `,
      text: `ClaimRoot™ License Issued\n\nYour license for "${appName}" has been generated.\nLicense ID: ${licenseId}\nDownload: ${pdfUrl}`
    };

    return await this.sendEmail(emailConfig);
  }

  /**
   * Send system alert email
   */
  async sendSystemAlert(
    to: string,
    subject: string,
    message: string
  ): Promise<boolean> {
    console.log(`🚨 Sending system alert to ${to}`);

    const emailConfig: EmailConfig = {
      to,
      from: this.fromEmail,
      subject: `🚨 HotStack Alert: ${subject}`,
      html: `<h2>${subject}</h2><p>${message}</p>`,
      text: `${subject}\n\n${message}`
    };

    return await this.sendEmail(emailConfig);
  }
}

// Export singleton instance
export const emailService = new EmailService();
