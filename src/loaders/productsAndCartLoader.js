import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
  // get products
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  //get cart
  const savedCart = getStoredCart();
  const storedCart = [];

  for (const id in savedCart) {
    const addedProduct = products.find(product => product.id === id);

    if (addedProduct) {
      addedProduct.quantity = savedCart[id];
      storedCart.push(addedProduct);
    }
  }

  return { products, storedCart };
};
