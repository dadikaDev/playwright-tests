import { faker } from "@faker-js/faker";

export function generateUser() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode("#####"),
    mobile: faker.phone.number("##########"),
  };
}

export function generateInvalidUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
  };
}