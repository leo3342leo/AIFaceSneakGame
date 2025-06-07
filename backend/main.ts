import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Knex from 'knex';
import * as http from 'http';
import { UsersService } from './services/UsersService';
import { UsersRouter } from './routers/UsersRouter';
import {LeaderService} from './services/leaderService';
import {LeaderRouter} from './routers/leaderRoute';
import { GameService } from './services/GameService';
import { GameRouter } from './routers/GameRouter';
import { isLoggedIn } from './guard';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
const app = express();
const server = new http.Server(app);
// const io = socketIO(server);
app.use(bodyParser.json());
app.use(cors());


export const usersService = new UsersService(knex);
const usersRouter = new UsersRouter(usersService);

const leaderService = new LeaderService(knex);
const leaderRoute = new LeaderRouter(leaderService);

const gameService = new GameService(knex);
const gameRouter = new GameRouter(gameService)


// io.on('connection',function (socket){
//     console.log(socket)
// });

app.use('/',usersRouter.router());
app.use('/legend',leaderRoute.router());
app.use('/score',isLoggedIn,gameRouter.router())



// io.on('connection',function(socket){});
const PORT = process.env.PORT || 8080;
server.listen(PORT, function(){
    console.log(`server listening at http://localhost:${PORT}`)
})