// create function to calculate shipping cost
// if the total price is greater than 28999, shipping is free
// if total price is less than 9999 and province is Gauteng, shipping is 500
// if total price is less than 9999 and province is not Gauteng, shipping is 700

export const calculateShippingCost = (totalPrice: number, province: string) => {
  if (totalPrice > 28999 && province === "Gauteng") {
    return 0;
  } else if (totalPrice > 28999 && province !== "Gauteng") {
    return 950;
  } else if (totalPrice < 9999 && province === "Gauteng") {
    return 500;
  } else if (totalPrice < 9999 && province !== "Gauteng") {
    return 700;
  } else if (totalPrice > 9999 && totalPrice < 28999 && province === "Gauteng") {
    return 300;
  } else if (totalPrice > 9999 && totalPrice < 28999 && province !== "Gauteng") {
    return 900;
  }
};