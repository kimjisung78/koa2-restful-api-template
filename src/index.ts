import "reflect-metadata";
import {ConnectionOptions, createConnection} from "typeorm";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import * as dotenv from 'dotenv';
import router from "./routers";


dotenv.config();

const bootstrap = async () => {
    try {
        // create koa app
        const app = new Koa();
        // const router = new Router();

        /* const currentDir = __dirname; // 현재 디렉터리 경로

        const IS_PRODUCTION = process.env.NODE_ENV == "production"; // 운영 환경 여부
        const IS_TEST = process.env.NODE_ENV == "test"; // 테스트 환경 여부
        const dirExt = IS_PRODUCTION || IS_TEST ? 'js' : 'ts'; */

        //const entitiesDir = '/entities';
        //const entitiesPath: string[] = [
            //`${currentDir}/${entitiesDir}/*.${dirExt}`,
            //`${currentDir}/${entitiesDir}/**/*.${dirExt}`,
            //`${currentDir}/${entitiesDir}/**/**/*.${dirExt}`,
        //]

        /* TypeORM 설정 */
        /* const connectionOptions: ConnectionOptions[] = [
            {
                type: "mysql", // DBMS 종류
                host: process.env.DB_HOST, // 접속 URL
                port: 3306, // 접속 포트
                username: process.env.DB_USERNAME, // 접속 아이디
                password: process.env.DB_PASSWORD, // 접속 비밀번호
                database: process.env.DB_DATABASE, // 데이터베이스명
                charset: process.env.DB_CHARSET, // 문자열
                synchronize: false, // 동기화 - 절대 true로 사용하지 마시오!!
                logging: 'all', // Query 로그 종류
                connectTimeout: 3000, // Connection 타임아웃
                maxQueryExecutionTime: 1000, // Query 최대 실행시간
                entities: entitiesPath, // Entity 경로들
                //migrations: migrationsPath, // Migration 경로들
                //subscribers: subscribersPath, // Subscriber 경로들
                cli: {
                    entitiesDir: `${currentDir}/${entitiesDir}`,
                    //migrationsDir: `${currentDir}/${migrationsDir}`,
                    //subscribersDir: `${currentDir}/${subscribersDir}`,
                },
                extra: {
                    connectionLimit: 5, // 최대 Connection Pool 개수
                },
            },
        ];

        await createConnection(connectionOptions[0]); 
        console.log('Success connected to Database') */

        app.use(bodyParser());

        app.use(async (ctx, next) => {
            try{
                await next()
            } catch (err) {
                const { statusCode, status } = err;
                const currentStatus = statusCode || status || 500;

                // ctx.type = 'json';
                console.log(err);
                ctx.status = currentStatus;
                ctx.body = {
                    status: currentStatus,
                    ...err
                };

                ctx.app.emit('error', err, ctx);
            }
        });

        
        app.use(router.routes())
            .use(router.allowedMethods());

        const PORT_NUMBER = process.env.PORT || 4000;
        app.listen(PORT_NUMBER as number, '0.0.0.0', () => console.log(`Server running on port ${PORT_NUMBER}`));
        // app.on('error', console.error);
    } catch (err) {
      console.log(`Bootstrap Error\n${err}`);
      process.exit(1);
    }
}

bootstrap();