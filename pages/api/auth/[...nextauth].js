import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'

import User from '../../../models/User';
import db from '../../../utils/mongodb'

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                db.dbConnect();

                const { email, password } = credentials;

                // Check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email or password');
                }

                // Find user in the database
                const user = await User.findOne({ email }).select('+password')

                if (!user) {
                    throw new Error('Invalid Email or Password')
                }

                // Check if password is correct or not
                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    throw new Error('Invalid Email or Password')
                }

                return Promise.resolve(user)

            }
        }),
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        }
    }
}

export default NextAuth(authOptions)

