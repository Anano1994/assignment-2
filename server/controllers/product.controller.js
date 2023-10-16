import Product from "../models/product.model.js";
import extend from "lodash/extend.js";


const create = async (req, res) => {
  console.log("pppppp create req.body = ", req.body);
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: 'Product created successfully',
    });
  } catch (err) {
    console.log("0000000000000 ", err);
    return res.status(400).json({
     
    });
  }
};

const list = async (req, res) => {
  console.log('list:' + req.query.name);
  try {
    let products;
    if (req.query.name === undefined) {
      products = await Product.find();
    } else {
      products = await Product.find({ "name": req.query.name });
    }
    res.json(products);
  }
  catch (err) {
    console.error(err);
    return res.status(400).json({
      error: 'Failed to retrieve products',
    });
  }
};

const read = (req, res) => {
  console.log('read');
  return res.json(req.product);
};

const update = async (req, res) => {
  console.log('update');
  try {
    let product = req.product;
    product = extend(product, req.body);
    product.updated = Date.now();
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: 'Failed to update product',
    });
  }
};
const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id); 
    if (!product)
      return res.status(404).json({
        error: "Product not found",
      });
    req.product = product;
    next();
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to find product',
    });
  }
};


const remove = async (req, res) => {
  try {
    let product =req.product;
    let deletedproduct = await product.deleteOne();
    res.json(deletedproduct);
  } catch(err) {
    console.log(err)
    return res.status(400).json({
      error: 'Failed to remove products',
    });
  }
};

const removeAll = async (req, res) => {
  try {
     await roduct.deleteMany({});
    res.json({ message: 'Products removed successfully',});
  } catch(err) {
    console.log(err)
    return res.status(400).json({
      error: 'Failed to removeall products',
    });
  }
};






export default { create, productByID, read, list, remove, update, removeAll };
