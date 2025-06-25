import express from 'express';
import { Restaurant, FoodItem, Orders, Cart } from './Schema.js';

const router = express.Router();

// Update restaurant details by id and cascade update related data if needed
router.put('/update-restaurant/:id', async (req, res) => {
  const { id } = req.params;
  const { title, address, mainImg, description, pictureUrl } = req.body;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const oldTitle = restaurant.title;

    if (title !== undefined) restaurant.title = title;
    if (address !== undefined) restaurant.address = address;
    if (mainImg !== undefined) restaurant.mainImg = mainImg;
    if (description !== undefined) restaurant.description = description;
    if (pictureUrl !== undefined) restaurant.pictureUrl = pictureUrl;

    await restaurant.save();

    // If restaurant title changed, update related orders and cart items
    if (title && title !== oldTitle) {
      await Orders.updateMany({ restaurantId: id }, { restaurantName: title });
      await Cart.updateMany({ restaurantId: id }, { restaurantName: title });
    }

    res.json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Server error updating restaurant' });
  }
});

export default router;
