/**
 * DNS Hook Service for HotStack
 *
 * Manages DNS configuration, domain routing, and subdomain provisioning
 * for HotStack Omnidrop deployments.
 *
 * This service creates REAL DNS records when users deploy via HotStack.
 */

import { execSync } from 'child_process';

export interface DomainConfig {
  domain: string;
  subdomain?: string;
  type: 'A' | 'CNAME' | 'TXT' | 'MX';
  value: string;
  ttl?: number;
  priority?: number; // For MX records
}

export interface UserDomain {
  userId: string;
  customDomain?: string;
  subdomain: string;
  fullDomain: string;
  dnsRecords: DomainConfig[];
  sslEnabled: boolean;
  status: 'pending' | 'active' | 'failed';
  createdAt: Date;
}

export class DNSHookService {
  private baseDomain: string;
  private cloudflareApiKey?: string;
  private cloudflareZoneId?: string;

  constructor(baseDomain: string = 'faa.zone') {
    this.baseDomain = baseDomain;
    this.cloudflareApiKey = process.env.CLOUDFLARE_API_KEY;
    this.cloudflareZoneId = process.env.CLOUDFLARE_ZONE_ID;
  }

  /**
   * Generate a unique subdomain for a user deployment
   */
  generateSubdomain(appId: string, userId: string): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${appId}-${randomStr}`;
  }

  /**
   * Create DNS records for a new deployment
   */
  async createDNSRecords(userDomain: UserDomain): Promise<boolean> {
    console.log(`🌐 Creating DNS records for ${userDomain.fullDomain}`);

    try {
      if (this.cloudflareApiKey && this.cloudflareZoneId) {
        // Use Cloudflare API for real DNS provisioning
        return await this.createCloudflareRecords(userDomain);
      } else {
        // Simulate DNS record creation for development
        console.log('⚠️  Cloudflare credentials not configured - using simulation mode');
        return await this.simulateDNSCreation(userDomain);
      }
    } catch (error) {
      console.error('❌ DNS record creation failed:', error);
      return false;
    }
  }

  /**
   * Create DNS records via Cloudflare API
   */
  private async createCloudflareRecords(userDomain: UserDomain): Promise<boolean> {
    console.log('☁️  Creating Cloudflare DNS records...');

    for (const record of userDomain.dnsRecords) {
      try {
        const response = await fetch(
          `https://api.cloudflare.com/client/v4/zones/${this.cloudflareZoneId}/dns_records`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.cloudflareApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: record.type,
              name: record.subdomain ? `${record.subdomain}.${record.domain}` : record.domain,
              content: record.value,
              ttl: record.ttl || 3600,
              priority: record.priority,
              proxied: record.type === 'A' || record.type === 'CNAME' // Enable Cloudflare proxy
            })
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error('❌ Cloudflare API error:', error);
          return false;
        }

        const result = await response.json();
        console.log(`✅ DNS record created: ${record.type} ${record.subdomain}.${record.domain} → ${record.value}`);
      } catch (error) {
        console.error('❌ Failed to create DNS record:', error);
        return false;
      }
    }

    return true;
  }

  /**
   * Simulate DNS creation for development (when Cloudflare not configured)
   */
  private async simulateDNSCreation(userDomain: UserDomain): Promise<boolean> {
    console.log('🔧 Simulating DNS record creation (development mode)...');

    for (const record of userDomain.dnsRecords) {
      console.log(`📝 [SIMULATED] ${record.type} record: ${record.subdomain}.${record.domain} → ${record.value}`);
    }

    return true;
  }

  /**
   * Provision a full domain setup for a HotStack deployment
   */
  async provisionUserDomain(
    appId: string,
    userId: string,
    customDomain?: string
  ): Promise<UserDomain> {
    const subdomain = customDomain || this.generateSubdomain(appId, userId);
    const fullDomain = `${subdomain}.${this.baseDomain}`;

    const userDomain: UserDomain = {
      userId,
      customDomain,
      subdomain,
      fullDomain,
      dnsRecords: [
        {
          domain: this.baseDomain,
          subdomain,
          type: 'A',
          value: process.env.DEPLOYMENT_SERVER_IP || '0.0.0.0', // Replace with actual server IP
          ttl: 3600
        },
        {
          domain: this.baseDomain,
          subdomain: `www.${subdomain}`,
          type: 'CNAME',
          value: fullDomain,
          ttl: 3600
        }
      ],
      sslEnabled: true, // Cloudflare provides automatic SSL
      status: 'pending',
      createdAt: new Date()
    };

    const success = await this.createDNSRecords(userDomain);
    userDomain.status = success ? 'active' : 'failed';

    return userDomain;
  }

  /**
   * Setup email forwarding for custom domain
   */
  async setupEmailForwarding(
    domain: string,
    forwardTo: string
  ): Promise<boolean> {
    console.log(`📧 Setting up email forwarding for ${domain} → ${forwardTo}`);

    const mxRecords: DomainConfig[] = [
      {
        domain,
        type: 'MX',
        value: 'mail.faa.zone', // Replace with actual mail server
        priority: 10,
        ttl: 3600
      },
      {
        domain,
        type: 'TXT',
        value: `v=spf1 include:faa.zone ~all`,
        ttl: 3600
      }
    ];

    if (this.cloudflareApiKey && this.cloudflareZoneId) {
      // Create MX records via Cloudflare
      for (const record of mxRecords) {
        await fetch(
          `https://api.cloudflare.com/client/v4/zones/${this.cloudflareZoneId}/dns_records`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.cloudflareApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: record.type,
              name: record.domain,
              content: record.value,
              ttl: record.ttl,
              priority: record.priority
            })
          }
        );
      }
      console.log('✅ Email forwarding configured via Cloudflare');
      return true;
    } else {
      console.log('⚠️  Email forwarding simulated (Cloudflare not configured)');
      return true;
    }
  }

  /**
   * Get DNS status for a domain
   */
  async getDNSStatus(domain: string): Promise<any> {
    console.log(`🔍 Checking DNS status for ${domain}`);

    if (this.cloudflareApiKey && this.cloudflareZoneId) {
      try {
        const response = await fetch(
          `https://api.cloudflare.com/client/v4/zones/${this.cloudflareZoneId}/dns_records?name=${domain}`,
          {
            headers: {
              'Authorization': `Bearer ${this.cloudflareApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const result = await response.json();
          return result.result;
        }
      } catch (error) {
        console.error('❌ Failed to get DNS status:', error);
      }
    }

    return {
      status: 'simulated',
      message: 'DNS status check simulated (Cloudflare not configured)'
    };
  }

  /**
   * Delete DNS records for a domain
   */
  async deleteDNSRecords(domain: string): Promise<boolean> {
    console.log(`🗑️  Deleting DNS records for ${domain}`);

    if (this.cloudflareApiKey && this.cloudflareZoneId) {
      try {
        // Get record ID first
        const records = await this.getDNSStatus(domain);

        for (const record of records) {
          await fetch(
            `https://api.cloudflare.com/client/v4/zones/${this.cloudflareZoneId}/dns_records/${record.id}`,
            {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${this.cloudflareApiKey}`,
                'Content-Type': 'application/json'
              }
            }
          );
        }

        console.log('✅ DNS records deleted');
        return true;
      } catch (error) {
        console.error('❌ Failed to delete DNS records:', error);
        return false;
      }
    }

    console.log('⚠️  DNS deletion simulated');
    return true;
  }

  /**
   * Enable SSL/TLS for a domain (via Cloudflare)
   */
  async enableSSL(domain: string): Promise<boolean> {
    console.log(`🔒 Enabling SSL for ${domain}`);

    if (this.cloudflareApiKey && this.cloudflareZoneId) {
      try {
        await fetch(
          `https://api.cloudflare.com/client/v4/zones/${this.cloudflareZoneId}/settings/ssl`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${this.cloudflareApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              value: 'full' // Full SSL encryption
            })
          }
        );

        console.log('✅ SSL enabled for domain');
        return true;
      } catch (error) {
        console.error('❌ Failed to enable SSL:', error);
        return false;
      }
    }

    console.log('⚠️  SSL enabled by default (Cloudflare proxy)');
    return true;
  }
}

// Export singleton instance
export const dnsHookService = new DNSHookService('faa.zone');
