import express from 'express';
import { userRoles } from '../database/models/user.model.js';
import useAuth from '../middleware/useAuth.middleware.js';
import { addAddress, deleteAddress, getAllAddresses, getAllUsers, update, updateAddress } from '../controllers/user.controller.js';
import useZod from '../middleware/useZod.js';
import { addUserAddressSchema, updateUserSchema, updateUserAddressSchema } from '../lib/zod/user.zod.js';
const router = express.Router();

// Get all users for admin only
router.get('/', useAuth([userRoles.user]), getAllUsers);

// get my profile
router.get('/me', useAuth([userRoles.admin, userRoles.user]), async (req, res) => {
  res.json(req.user);
});

// update profile
router.patch('/me', useAuth([userRoles.admin, userRoles.user]), useZod(updateUserSchema), update);

// get all address
router.get('/me/address', useAuth([userRoles.admin, userRoles.user]), getAllAddresses);

// add new address
router.post('/me/address', useAuth([userRoles.admin, userRoles.user]), useZod(addUserAddressSchema), addAddress);

// update address
router.patch('/me/address/:id', useAuth([userRoles.admin, userRoles.user]), useZod(updateUserAddressSchema), updateAddress);

// delete address
router.delete('/me/address/:id', useAuth([userRoles.admin, userRoles.user]), deleteAddress);

export default router;
