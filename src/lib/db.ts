import { PrismaClient } from "@prisma/client";

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientInstance;
};

const prismaOptions: ConstructorParameters<typeof PrismaClient>[0] = {
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  errorFormat: process.env.NODE_ENV === "development" ? "pretty" : "minimal",
};

function createPrismaClient(): PrismaClientInstance {
  try {
    return new PrismaClient(prismaOptions);
  } catch (error) {
    throw new Error(
      "Prisma Client is not generated. Run `pnpm db:generate` before using database-backed routes.",
      { cause: error },
    );
  }
}

function getPrismaClient(): PrismaClientInstance {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

export const db = new Proxy({} as PrismaClientInstance, {
  get(_target, prop, receiver) {
    // Prevent Promise-like detection from treating the proxy as a thenable.
    if (prop === "then") return undefined;

    const client = getPrismaClient();
    const value = Reflect.get(client as object, prop, receiver);

    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default db;
