import React from 'react';
import { RotateCw } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: { name: string; category: string; price: string; stock: string; status: string }) => void;
  isAdding: boolean; // New prop to indicate if the product is being added
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, isAdding }) => {
  const [product, setProduct] = React.useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'In Stock',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      const updatedProduct = {
        ...prevProduct,
        [name]: value,
      };

      // Automatically update status based on stock
      if (name === 'stock') {
        const stockValue = parseInt(value, 10);
        updatedProduct.status = stockValue > 0 ? 'In Stock' : 'Out of Stock';
      }

      return updatedProduct;
    });
  };

  const handleSave = () => {
    onSave(product);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={product.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled // Disable the select, as the status is now managed automatically
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            disabled={isAdding} // Disable the button while adding
          >
            {isAdding ? (
              <RotateCw className="animate-spin w-5 h-5" /> // Show spinner
            ) : (
              'Save' // Show "Save" text
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
