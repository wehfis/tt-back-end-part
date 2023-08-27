const { ProductModel } = require('../initDBandSeed/db');

const getAllProducts = async (req, res) => {
  try {
        const products = await ProductModel.findAll();
        res.json(products);
  } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    getAllProducts
}