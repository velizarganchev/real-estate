import nc from 'next-connect';
import { sendEmail } from '../../../controllers/contactController';
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth';

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

export const config = { api: { bodyParser: { sizeLimit: '25mb' } } }

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .post(sendEmail)


export default handler;