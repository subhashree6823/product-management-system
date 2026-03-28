const validateProduct = (data) => {
  const { name, price, description, image, category, stock } = data;

  if (
    !name ||
    price === "" ||
    !description ||
    !image ||
    !category ||
    stock === ""
  ) {
    return "All fields are required";
  }

  if (isNaN(price) || Number(price) <= 0) {
    return "Price must be a valid positive number";
  }

  if (isNaN(stock) || Number(stock) < 0) {
    return "Stock must be a valid non-negative number";
  }

  return null;
};

module.exports = { validateProduct };