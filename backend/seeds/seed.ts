import * as Knex from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    // return knex("table_name").del()
    //     .then(() => {
    //         // Inserts seed entries
    //         return knex("table_name").insert([
    //             { id: 1, colName: "rowValue1" },
    //             { id: 2, colName: "rowValue2" },
    //             { id: 3, colName: "rowValue3" }
    //         ]);
    //     });
    await knex("purchased").del()
    await knex("match_result").del()
    await knex("match").del()
    await knex("maps").del()
    await knex("skins").del()
    await knex("users").del()

    const users = await knex('users').insert([
        {username: 'Andy', password: await hashPassword("123"), elo:3, hi_score:99, gold:10000},
        {username: 'Leo', password:await hashPassword("123"), elo:4, hi_score:999, gold:100000},
        {username: 'Barry', password:await hashPassword("123"), elo:5, hi_score:9999, gold:1000000}
    ]).returning('id')


    const skins = await knex('skins').insert([
        {skin_image:'skin1'},
        {skin_image:'skin2'}
    ]).returning('id')

    const maps = await knex('maps').insert([
        {map_image:'map1'},
        {map_image:'map2'}
    ]).returning('id')

    await knex('purchased').insert([
        {user_id:users[0],skin_id:skins[0]},
        {user_id:users[0],skin_id:skins[1]},
        {user_id:users[1],skin_id:skins[0]},
        {user_id:users[2],skin_id:skins[1]},
        {user_id:users[0],map_id:maps[0]},
        {user_id:users[0],map_id:maps[1]},
        {user_id:users[1],map_id:maps[1]},
        {user_id:users[2],map_id:maps[0]},
        {user_id:users[2],map_id:maps[1]},
    ])
};
