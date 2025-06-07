import Knex from "knex";
const knexfile = require('./knexfile');
const knex = Knex(knexfile["testing"]);

describe("usersDB test",()=>{
    it('test',async ()=>{
        await knex.transaction(async trx=>{
            await trx.migrate.latest();
        })
    })
    afterAll(()=>{
        knex.destroy();
    });
})
