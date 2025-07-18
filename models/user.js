import knex from '../knex.js';

const User = {
    getAll() {
        return knex('user').select('*');
    },
    getById(id) {
        return knex('user').where({ id }).first();
    },
    async create(user) {
        const [id] = await knex('user').insert(user);
        return User.getById(id);
    },
    // Add more methods as needed
};

export default User;
