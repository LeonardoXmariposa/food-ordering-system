import express from 'express';
import { Restaurant, FoodItem, Orders, Cart } from './Schema.js';

const router = express.Router();

// Delete restaurant by id and cascade delete related data
router.delete('/delete-restaurant/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Delete related food items
    await FoodItem.deleteMany({ restaurantId: id });

    // Delete related orders
    await Orders.deleteMany({ restaurantId: id });

    // Delete related cart items
    await Cart.deleteMany({ restaurantId: id });

    // Delete the restaurant
    await Restaurant.deleteOne({ _id: id });

    res.json({ message: 'Restaurant and related data deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant and related data:', error);
    res.status(500).json({ message: 'Server error deleting restaurant and related data' });
  }
});

export default router;
