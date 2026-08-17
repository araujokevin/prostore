import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );

          // If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // If user does not exist or password does not match return null
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session, token, trigger }: any) {
      // Add custom JWT fields to the session
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;
      }

      return session;
    },

    async jwt({ token, user }: any) {
      // Runs during sign in
      if (user) {
        token.role = user.role;

        // If the user has no name, use the email username
        if (user.name === 'NO_NAME' && user.email) {
          token.name = user.email.split('@')[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        } else {
          token.name = user.name;
        }
      }

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
