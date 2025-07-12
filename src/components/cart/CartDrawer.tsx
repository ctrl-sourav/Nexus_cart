import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const { name, phone, address, city, pincode } = billingDetails;
    if (!name || !phone || !address || !city || !pincode) {
      toast.error('Please fill in all billing details');
      return;
    }

    toast.success('Placing your order...', {
      description: `Payment: ${billingDetails.paymentMethod.toUpperCase()} | Total: $${getTotalPrice().toFixed(2)}`
    });

    setTimeout(() => {
      clearCart();
      onClose();
      toast.success('Order placed successfully!', {
        description: 'Thank you for shopping with us!',
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {items.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                        layout
                      >
                        <div className="flex gap-4">
                          <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h3 className="text-white text-sm font-medium line-clamp-2">{item.title}</h3>
                            <p className="text-purple-400 font-semibold mt-1">${item.price.toFixed(2)}</p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  className="w-8 h-8 bg-purple-600 hover:bg-purple-700 text-white"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Billing Section */}
                  <div className="space-y-4">
                    <h3 className="text-white text-lg font-semibold">Billing Details</h3>

                    <Input
                      name="name"
                      value={billingDetails.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <Input
                      name="phone"
                      value={billingDetails.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <Input
                      name="address"
                      value={billingDetails.address}
                      onChange={handleInputChange}
                      placeholder="Delivery Address"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <div className="flex gap-2">
                      <Input
                        name="city"
                        value={billingDetails.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      <Input
                        name="pincode"
                        value={billingDetails.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Payment Method</h4>
                      <label className="flex items-center gap-2 text-gray-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={billingDetails.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                        />
                        Cash on Delivery
                      </label>
                      <label className="flex items-center gap-2 text-gray-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={billingDetails.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                        />
                        UPI / Google Pay / PhonePe
                      </label>
                      <label className="flex items-center gap-2 text-gray-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={billingDetails.paymentMethod === 'card'}
                          onChange={handleInputChange}
                        />
                        Debit/Credit Card
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-800 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                >
                  Place Order
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => clearCart()}
                  className="w-full text-gray-400 hover:text-white"
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
