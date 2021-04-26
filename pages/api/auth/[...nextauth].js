import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import Models from "../../../models";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: process.env.DASHBOARD_CLIENT_ID,
      clientSecret: process.env.DASHBOARD_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.TypeORM.Adapter(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3oqjy.mongodb.net/k9?retryWrites=true&w=majority`,
    {
      models: {
        User: Models.User,
      },
    }
  ),
  session: { jwt: true },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user?.roles) {
        token.roles = user.roles;
      }
      return token;
    },
    async session(session, token) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.roles) {
        session.user.roles = token.roles;
      }
      return session;
    },
  },
  // A database is optional, but required to persist accounts in a database
});
