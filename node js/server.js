const server=require('express')
const FN=server()

//lezmik texporti router bech ye5dim
const routerStudent=require('./router/routerStudent')





// tawa bech ye5dim router lezmik ta3mil ues:
FN.use('/home/student',routerStudent)
//tnajim tna7iyh path ou te5dim blech path:==>FN.use(routerStudent) ema lezmik trja3 path lil routerStudent




const routerUsers=require('./router/routerUsers.js')
FN.use(routerUsers)



const routerUser2=require('./router/routerUserMongoose')
FN.use(routerUser2)


FN.listen(3000,()=>console.log('server is runing ==> port:3000'))