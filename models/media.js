import knex from '../knex.js';

const Media = {
    async getById(id) {
        return knex('media').where({ id }).first();
    },
};

export default Media;
