export const validUser = {
  name: "Daria",
  email: "info11@gmail.com",
  password: "1234",
  firstName: "Daria",
  lastName: "Smith",
  company: null,
  address: "123 Main St",
  address2: "Apt 5B",
  state: "NEW YORK",
  city: "Brooklyn",
  zipcode: 90001,
  mobile: 9876543210,
};

export const invalidUser = {
  ...validUser,
  email: validUser.email + "com",
  password: validUser.password + "11",
};
