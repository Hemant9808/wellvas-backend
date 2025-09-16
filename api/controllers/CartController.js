const Cart = require("../models/CartModel");

const calculateCartTotal = (items) => {
  // console.log("inside function items", items);

  let totalItems = 0;
  let totalPrice = 0;
  let totalDiscountPrice = 0;

  items.forEach((item) => {
    totalItems = totalItems+item.quantity;
    totalPrice = totalPrice+item.price * item.quantity;
    totalDiscountPrice = totalDiscountPrice+item.discountPrice * item.quantity;
    // console.log("inside funtion", item.quantity, item.price);
  });

  return { totalItems, totalPrice, totalDiscountPrice };
};

const addToCart = async (req, res) => {
  // console.log("entered");

  try {
    let { productId, quantity, price,discountPrice } = req.body;
    console.log(productId, quantity, price,discountPrice);
    
    const userId = req.user._id;
    // console.log("userId", req.user._id);

    var cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price name images brand"
    );   
     console.log("cart found or not");

    if (cart) {
      console.log("cart found",cart);

      const existingItemIndex = cart.items.findIndex((item) =>
        item.productId?._id?.equals(productId)
      );
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        console.log("pushing items", productId, price, quantity);

        cart.items.push({
          productId,
          price,
          quantity,
          discountPrice,
        });
        console.log("new cart after item pushed", cart);
      }
    } else {
      console.log("cart not found");

      cart = new Cart({
        userId,
        items: [
          {
            productId,
            price,
            quantity,
            discountPrice,
          },
        ],
      });
      console.log("new cart", cart);
    }
    // console.log("calculete");

    // console.log("totalDiscountPrice",totalDiscountPrice);

    const { totalItems, totalPrice, totalDiscountPrice } = calculateCartTotal(cart.items);
    console.log("kfmskf", totalItems, totalPrice,totalDiscountPrice);

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    cart.totalDiscountPrice = totalDiscountPrice;
    // console.log("update cart", cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price name images brand"
    );
    if (!cart) {
      return res.status(200).json([]);
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  // console.log("productId",productId);
  // console.log("UserId,",userId);
  
 
  try {
    const cart = await Cart.findOne({ userId }) 
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    console.log("cart found...........................................................",cart);
 
 
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    
    if (cart.items.length === 0) {
      await Cart.deleteOne({ userId });
      return res.status(200).json({ message: "Cart is empty now." });
    }

    const { totalItems, totalPrice, totalDiscountPrice } = calculateCartTotal(cart.items);
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    cart.totalDiscountPrice = totalDiscountPrice;

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message:error.message});
  }
};

module.exports = { addToCart, removeItemFromCart, getUserCart };
