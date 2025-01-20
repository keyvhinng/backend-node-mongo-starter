import { Router } from 'express';

import { errorController } from '../controllers/error.controller';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  next(err);
});

router.use(errorController);

export default router;
