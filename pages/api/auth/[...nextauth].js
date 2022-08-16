import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../src/models/user";
import bcrypt from "bcrypt";
import { validateAll } from "../../../src/utils/common";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      //credentials: {
      // username: { label: "Username", type: "text", placeholder: "jsmith" },
      //password: { label: "Password", type: "password" },
      //},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        try {
          const { email, password } = credentials;
          console.log({ email, password });

          validateAll({ email, password });

          const user = await User.findOne({ email }).exec();
          if (!user) {
            throw new Error("Something went wrong");
          }
          const userDoc = user._doc;
          const isMatched = await bcrypt.compare(password, userDoc.password);
          //console.log({ user });

          if (user && isMatched) {
            // Any object returned will be saved in `user` property of the JWT
            delete userDoc.password;
            return userDoc;
          } else {
            // If you return null or false then the credentials will be rejected
            // return null;
            // You can also Reject this callback with an Error or with a URL:
            throw new Error("invalid user"); // Redirect to error page
            // throw '/path/to/redirect'        // Redirect to a URL
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      console.log("session", { session, user });
      if (user && user.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log("jwt", { token, user });
      if (user && user._id) {
        token.id = user._id;
      }
      return token;
    },
  },
});
