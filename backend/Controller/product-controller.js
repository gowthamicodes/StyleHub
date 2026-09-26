const Products = require("../Model/product-model");

const createProduct = async (req, res) => {

    const {
        name,
        category,
        subCategory,
        price,
        image,
        colors,
        sizes,
        description,
    } = req.body;

    try {
        const product = new Products({
            name,
            category,
            subCategory,
            price,
            image,
            colors,
            sizes,
            description
        })

        await product.save();

        return res.status(201).json({
            message: "Product created successfully"
        })
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Could not create product",
        })

    }

}

const getAllProducts = async (_req, res) => {
    try {
        const products = await Products.find();

        return res.status(200).json({
            products,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Could not fetch products",
        });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            })
        }

        return res.status(200).json({ product, })

    } catch (err) {
        return res.status(500).json({
            message: "Could not fetch product"
        })
    }
}

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    subCategory,
    price,
    image,
    colors,
    sizes,
    description,
  } = req.body;

  try {
    const product = await Products.findByIdAndUpdate(
      id,
      {
        name,
        category,
        subCategory,
        price,
        image,
        colors,
        sizes,
        description,
      },
{ returnDocument: "after", runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not update product",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not delete product",
    });
  }
};



module.exports = { createProduct, getAllProducts, getProductById, 
    updateProduct, deleteProduct }