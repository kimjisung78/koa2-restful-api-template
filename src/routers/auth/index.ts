import Router from 'koa-router'

const auth = new Router();
auth.get('/', (ctx, _) => {
   ctx.throw(400, { message: "NICE", isDelete: true })
})

export default auth;

