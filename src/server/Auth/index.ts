import * as express from 'express';

import registerRouter from './register';
import loginRouter from './login';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);


export default router;
