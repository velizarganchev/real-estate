export { default } from 'next-auth/middleware'

export const config = {
    matcher: ["/api/me", "/api/me/update", "/me/profile"]
}