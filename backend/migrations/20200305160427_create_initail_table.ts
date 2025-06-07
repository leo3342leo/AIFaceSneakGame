import * as Knex from "knex";




export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('users',(table)=>{
        table.increments();
        table.string('username');
        table.string('password');
        table.integer('elo')
        table.integer('hi_score');
        table.integer('gold').unsigned()
        table.timestamps(false,true);
    })

    await knex.schema.createTable('skins',(table)=>{ 
        table.increments();
        table.string('skin_image')
        table.integer('price')
        table.timestamps(false,true);
    });

    await knex.schema.createTable('maps',(table)=>{
        table.increments();
        table.string('map_image')
        table.integer('price')
        table.timestamps(false,true);
    });

    await knex.schema.createTable('match',(table)=>{
        table.increments();
        table.integer('p1_id');
        table.foreign('p1_id').references("users.id")
        table.integer('p2_id');
        table.foreign('p2_id').references("users.id")
        table.timestamps(false,true);
    });
    
    await knex.schema.createTable('match_result',(table)=>{
        table.increments();
        table.integer("match_id");
        table.foreign('match_id').references('match.id')
        table.integer("user_id");
        table.foreign('user_id').references('users.id')
        table.integer('elo').notNullable()
        table.integer('gold').unsigned().notNullable()
        table.integer('score').unsigned().notNullable()
        table.timestamps(false,true);
    });

    await knex.schema.createTable('purchased',(table)=>{
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references("users.id")
        table.integer('skin_id');
        table.foreign('skin_id').references("skins.id")
        table.integer('map_id');
        table.foreign('map_id').references("maps.id")
        table.timestamps(false,true);
    });
}



export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('purchased');
    await knex.schema.dropTable('match_result');
    await knex.schema.dropTable('match');
    await knex.schema.dropTable('maps');
    await knex.schema.dropTable('skins');
    await knex.schema.dropTable('users');
}

