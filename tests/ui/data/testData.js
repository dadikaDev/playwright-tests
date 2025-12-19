import { faker } from "@faker-js/faker";

export const productId = 1;
export const firstProductIndex = 0;
export const secondProductIndex = 1;
export const expectedProductCount = 1;
export const quantity = faker.number.int({ min: 1, max: 5});
export const expectedQuantity = quantity;
export const productName = "Dress";
export const paymentData = {
  name: faker.person.fullName(),
  number: "4111111111111111", 
  cvc: faker.string.numeric({ length: 3 }),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: (new Date().getFullYear() + 1).toString(),
};









