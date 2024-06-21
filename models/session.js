import knex from '../knex.js';

const Session = {
    async getByToken(token) {
        return knex('session').where({ sessionToken: token }).first();
    },
};

export default Session;
