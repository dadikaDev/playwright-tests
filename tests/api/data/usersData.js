import { faker } from "@faker-js/faker";

export const VALID_USER = {
    email: "info11@gmail.com",
    password: "1234",
};

export const INVALID_USER = {
    ...VALID_USER,
    password: "12345",
};

const TITLES = ["Mr", "Mrs", "Ms"];

export const NEW_USER = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    title: TITLES[Math.floor(Math.random() * TITLES.length)],
    birth_date: faker.number
        .int({ min: 1, max: 28 })
        .toString()
        .padStart(2, "0"),
    birth_month: faker.number
        .int({ min: 1, max: 12 })
        .toString()
        .padStart(2, "0"),
    birth_year: faker.number.int({ min: 1950, max: 2005 }).toString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.location.country(),
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number("+1##########"),
};
