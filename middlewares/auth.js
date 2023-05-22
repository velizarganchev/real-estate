import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";


const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const session = await getServerSession(req, res, authOptions)
    
    if (!session) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }
    req.user = session.user._doc;

    next();

})

// Handling user roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user._doc.role)) {
            return next(new ErrorHandler(`Role (${req.user._doc.role}) is not allowed to access this resource.`, 403))
        }

        next()
    }
}

export {
    isAuthenticatedUser,
    authorizeRoles
}
