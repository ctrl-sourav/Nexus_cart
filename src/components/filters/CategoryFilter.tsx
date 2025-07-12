
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange
}: CategoryFilterProps) => {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700 p-6 hover:bg-gray-900/70 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={`capitalize transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0'
                      : 'border-gray-600 bg-gray-900/50 text-gray-300 hover:bg-gray-800/80 hover:text-white hover:border-gray-500 backdrop-blur-sm'
                  }`}
                >
                  All
                </Button>
              </motion.div>
              {categories.map((category) => (
                <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0'
                        : 'border-gray-600 bg-gray-900/50 text-gray-300 hover:bg-gray-800/80 hover:text-white hover:border-gray-500 backdrop-blur-sm'
                    }`}
                  >
                    {category.replace(/'s /, "'s ")}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
