import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success('Added to cart!', {
      description: product.title,
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      toast.success('Added to wishlist!');
    }
  };

  return (
    <motion.div
      className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-900/60 w-full max-w-[220px] sm:max-w-[240px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      layout
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Badge className="absolute top-2 left-2 bg-gray-900/90 text-white border-0 text-[10px] capitalize hover:bg-gray-800/90">
          {product.category}
        </Badge>

        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <Button
            size="icon"
            variant="ghost"
            className="bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/90 text-white border-gray-600 h-8 w-8"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`}
            />
          </Button>

          <Button
            size="icon"
            className="bg-purple-600 hover:bg-purple-700 text-white h-8 w-8"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/90 text-white border-gray-600 h-8 w-8"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="absolute top-2 right-2 bg-gray-900/90 backdrop-blur-sm rounded-full px-2 py-[2px] flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-[10px] font-medium">
            {product.rating.rate.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-3 bg-gray-900/40">
        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        <p className="text-gray-300 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-gray-400">
              {product.rating.count} reviews
            </span>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="text-xs px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
