import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/schema';

const DATABASE_URL = env.DATABASE_URL ? env.DATABASE_URL : "file:local.db";
const client = createClient({ url: DATABASE_URL });
export const db = drizzle(client, { schema });
