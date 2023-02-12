import {faker} from "@faker-js/faker";

export const data = Array.from({length: 100}, () => {
    return {
        name: faker.name.firstName(),
        surname: faker.name.lastName()
    }
})