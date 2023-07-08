import type { Handle } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from '$env/static/private';

import { db } from '$lib/server/db';

// Check for existence of the env variables
if (!GITHUB_CLIENT_ID) {
  throw new Error('Missing GITHUB_CLIENT_ID secret');
}
if (!GITHUB_CLIENT_SECRET) {
  throw new Error('Missing GITHUB_CLIENT_SECRET secret');
}
if (!GOOGLE_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLIENT_ID secret');
}
if (!GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_SECRET secret');
}

const protectedPaths = ['/dashboard'];

const protect = (async ({ event, resolve }) => {
  const session = await event.locals.getSession();
  if (!protectedPaths.includes(event.url.pathname)) {
    return resolve(event);
  }

  if (!session?.user) {
    // Redirect to login page
    throw redirect(303, '/login');
  }

  return resolve(event);
}) satisfies Handle;

const authenticate = SvelteKitAuth({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login'
  },
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    })
  ]
});

export const handle = sequence(authenticate, protect);
