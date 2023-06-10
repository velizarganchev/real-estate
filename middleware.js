export { default } from 'next-auth/middleware'

export const config = {
    matcher: ["/api/me/:path*", "/me/profile", "/bookings/me"]
}