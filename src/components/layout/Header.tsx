
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const Header = ({ searchQuery, setSearchQuery, sortBy, setSortBy }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user } = useAuthStore();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <motion.header 
        className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              NEXUS
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 hover:bg-gray-900/70 focus:bg-gray-900/80 transition-all duration-300"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800/80 focus:bg-gray-800/90 transition-all duration-300 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-gray-700 backdrop-blur-md shadow-xl">
                  <SelectItem value="default" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Default</SelectItem>
                  <SelectItem value="price-low" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Price: High to Low</SelectItem>
                  <SelectItem value="rating" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative text-gray-300 hover:text-white hover:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 rounded-full"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {wishlistItems.length}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-gray-300 hover:text-white hover:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 rounded-full"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsAuthOpen(true)}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 rounded-full"
                >
                  <User className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all duration-300 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 hover:bg-gray-900/70 focus:bg-gray-900/80 transition-all duration-300"
                  />
                </div>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800/80 focus:bg-gray-800/90 transition-all duration-300 backdrop-blur-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 border-gray-700 backdrop-blur-md shadow-xl">
                    <SelectItem value="default" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Default</SelectItem>
                    <SelectItem value="price-low" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Price: Low to High</SelectItem>
                    <SelectItem value="price-high" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Price: High to Low</SelectItem>
                    <SelectItem value="rating" className="text-gray-200 hover:bg-gray-800/80 focus:bg-gray-800/80 cursor-pointer transition-all duration-200">Rating</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex justify-center space-x-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 rounded-full">
                      <Heart className="w-5 h-5" />
                      {wishlistItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsCartOpen(true)}
                      className="relative text-gray-300 hover:text-white hover:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 rounded-full"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsAuthOpen(true)}
                      className="text-gray-300 hover:text-white hover:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 rounded-full"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
