import db from "@/lib/db";

type LogLevel = "info" | "warn" | "error" | "debug";
type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

class Logger {
  private formatMessage(entry: LogEntry): string {
    const timestamp = new Date().toISOString();
    const context = entry.context ? `[${entry.context}]` : "";
    return `${timestamp} ${entry.level.toUpperCase()} ${context} ${entry.message}`;
  }

  info(message: string, data?: Record<string, unknown>) {
    const entry: LogEntry = { level: "info", message, ...data };
    console.log(this.formatMessage(entry));
  }

  warn(message: string, data?: Record<string, unknown>) {
    const entry: LogEntry = { level: "warn", message, ...data };
    console.warn(this.formatMessage(entry));
  }

  error(message: string, data?: Record<string, unknown>) {
    const entry: LogEntry = { level: "error", message, ...data };
    console.error(this.formatMessage(entry));
  }

  debug(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      const entry: LogEntry = { level: "debug", message, ...data };
      console.debug(this.formatMessage(entry));
    }
  }

  // Database audit logging
  async audit(params: {
    userId: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: JsonObject;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      await db.auditLog.create({
        data: {
          userId: params.userId,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId,
          details: params.details,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
        },
      });
    } catch (error) {
      this.error("Failed to create audit log", { error, params });
    }
  }

  // Activity logging
  async activity(params: {
    userId: string;
    action: string;
    details?: string;
    metadata?: JsonObject;
  }) {
    try {
      await db.activityLog.create({
        data: {
          userId: params.userId,
          action: params.action,
          details: params.details,
          metadata: params.metadata,
        },
      });
    } catch (error) {
      this.error("Failed to create activity log", { error, params });
    }
  }

  // Security logging
  async security(params: {
    userId?: string;
    event: string;
    severity: "INFO" | "WARNING" | "DANGER" | "CRITICAL";
    ipAddress?: string;
    userAgent?: string;
    details?: JsonObject;
  }) {
    try {
      await db.securityLog.create({
        data: {
          userId: params.userId,
          event: params.event,
          severity: params.severity,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
          details: params.details,
        },
      });

      // Alert on critical security events
      if (params.severity === "CRITICAL") {
        this.error(`CRITICAL SECURITY EVENT: ${params.event}`, params.details);
        // In production, trigger alerting system here
      }
    } catch (error) {
      this.error("Failed to create security log", { error, params });
    }
  }
}

export const logger = new Logger();
export default logger;
