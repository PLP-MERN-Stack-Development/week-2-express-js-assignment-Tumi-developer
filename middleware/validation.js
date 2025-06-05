const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Description is required and must be a string' });
  }

  if (!price || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price is required and must be a positive number' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category is required and must be a string' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'inStock must be a boolean' });
  }

  next();
};

module.exports = { validateProduct }; 