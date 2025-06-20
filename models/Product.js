import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    price: {
      type: Number,
      required: [true, "price is required!"],
      min: [1, "Price must be positive"],
    },
    category: {
      type: String,
      enum: ["electronics", "clothes", "food"],
      default: "food",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
