import { Router } from 'express';
import { TourController } from '../controllers/tour.controller';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

const tourController = new TourController();
const authController = new AuthController();

router.get(
  '/',
  authController.protect.bind(authController),
  tourController.getTours.bind(tourController),
);
router.get(
  '/:id',
  authController.protect.bind(authController),
  tourController.getTourById.bind(tourController),
);
router.post(
  '/',
  authController.protect.bind(authController),
  tourController.createTour.bind(tourController),
);
router.delete(
  '/:id',
  authController.protect.bind(authController),
  tourController.deleteTour.bind(tourController),
);

export default router;
