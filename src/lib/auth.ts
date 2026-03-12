import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        deviceInfo: { label: 'Device Info', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email & password required')
        }

        const deviceInfo = credentials.deviceInfo
          ? JSON.parse(credentials.deviceInfo)
          : null

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              deviceInfo,
            }),
          },
        )

        const result = await res.json()
        console.log('Login result:', result)

        if (!res.ok || !result?.success) {
          throw new Error(result?.message || 'Login failed')
        }

        const { user, accessToken } = result.data

        return {
          id: String(user._id),
          email: user.email,
          name: user.schoolName || user.name || '',
          role: user.role,
          image: user.profileImage || '',
          shareLink: user.shareLink || '',
          accessToken: String(accessToken),
        }
      },
    }),
    CredentialsProvider({
      id: "google-login",
      name: "Google Login",
      credentials: {
        idToken: { label: "Google ID Token", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          throw new Error("Google ID Token is required");
        }

        const apiURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`;

        // Build request body — always send idToken, optionally send role
        const body: Record<string, string> = { idToken: credentials.idToken };
        if (credentials.role) {
          body.role = credentials.role;
        }

        console.log("🔐 Google Login →", apiURL, "| role:", credentials.role || "(none)");

        const res = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const resText = await res.text();
        let result;
        try {
          result = JSON.parse(resText);
          console.log("📥 Google Login API Result:", JSON.stringify(result, null, 2));
        } catch (e) {
          console.error("❌ Failed to parse Google Login API response:", resText);
          throw new Error(`Invalid response from server: ${resText.substring(0, 100)}`);
        }

        if (!res.ok || !result?.success) {
          if (result?.data?.needsRole) {
            throw new Error(JSON.stringify({ code: "ROLE_REQUIRED" }));
          }
          throw new Error(result?.message || result?.error || "Google Login failed");
        }

        // New user → needs role selection
        if (result?.data?.needsRole) {
          throw new Error(JSON.stringify({ code: "ROLE_REQUIRED" }));
        }

        // Existing user login or new user registered with role
        const { user, accessToken } = result.data;

        return {
          id: String(user._id),
          email: user.email,
          name: user.schoolName || `${user.firstName} ${user.lastName}`,
          role: user.role,
          image: user.profileImage || '',
          shareLink: user.shareLink || '',
          accessToken: String(accessToken),
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = (user as any).role
        token.image = user.image
        token.shareLink = (user as any).shareLink
        token.accessToken = (user as any).accessToken
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.image = token.image as string
        session.user.shareLink = token.shareLink as string
        session.accessToken = token.accessToken as string
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl + '/api/auth/signout') || url === baseUrl) {
        return baseUrl
      }
      if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  useSecureCookies: process.env.NODE_ENV === 'production',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
