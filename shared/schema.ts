import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Queen Bee Control Room Tables

export const queenBeeRepos = pgTable("queen_bee_repos", {
  id: serial("id").primaryKey(),
  repoName: text("repo_name").notNull().unique(),
  repoOwner: text("repo_owner").notNull(),
  language: text("language"),
  lastAudit: timestamp("last_audit"),
  healthStatus: text("health_status").default("unknown"),
  hooksDeployed: boolean("hooks_deployed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const codenestAudits = pgTable("codenest_audits", {
  id: serial("id").primaryKey(),
  auditHash: text("audit_hash").notNull().unique(),
  repoId: integer("repo_id").references(() => queenBeeRepos.id),
  findingType: text("finding_type").notNull(),
  severity: text("severity").notNull(),
  filePath: text("file_path"),
  details: jsonb("details"),
  resolved: boolean("resolved").default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const safeguardDeployments = pgTable("safeguard_deployments", {
  id: serial("id").primaryKey(),
  repoId: integer("repo_id").references(() => queenBeeRepos.id),
  deploymentType: text("deployment_type").notNull(),
  prUrl: text("pr_url"),
  status: text("status").default("pending"),
  deployedAt: timestamp("deployed_at").defaultNow()
});

export const insertQueenBeeRepoSchema = createInsertSchema(queenBeeRepos);
export const insertCodenestAuditSchema = createInsertSchema(codenestAudits);
export const insertSafeguardDeploymentSchema = createInsertSchema(safeguardDeployments);

export type QueenBeeRepo = typeof queenBeeRepos.$inferSelect;
export type InsertQueenBeeRepo = z.infer<typeof insertQueenBeeRepoSchema>;
export type CodenestAudit = typeof codenestAudits.$inferSelect;
export type InsertCodenestAudit = z.infer<typeof insertCodenestAuditSchema>;
export type SafeguardDeployment = typeof safeguardDeployments.$inferSelect;
export type InsertSafeguardDeployment = z.infer<typeof insertSafeguardDeploymentSchema>;
