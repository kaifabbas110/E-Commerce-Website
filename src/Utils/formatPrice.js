export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
  return newNumber;
};

// console.log(formatPrice(12345));

// const coverUsdToPkr =()=>{
//   const convert = Intl.NumberFormat()
// }
