import { PrismaClient } from '@prisma/client';

import { NODE_ENV } from '$env/static/private';

const db = globalThis.prisma || new PrismaClient();

if (NODE_ENV === 'development') {
  globalThis.prisma = db;
}

export { db };
