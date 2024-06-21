import knex from '../knex.js';

const User = {
    getAll() {
        return knex('user').select('*');
    },
    getById(id) {
        return knex('user').where({ id }).first();
    },
    create(user) {
        return knex('user').insert(user);
    },
    // Add more methods as needed
};

export default User;
