const router=require('express').Router()
const ModelUser=require('../Model/user.Model')



router.post('/registre',(req,res,next)=>{
    ModelUser.Registre(req.body.nom,req.body.email,req.body.password)
    .then((user)=>res.status(200).json({user:user,msg:'inserted !'}))
    .catch((error)=>res.status(400).json(error))
})



router.post('/Login',(req,res,next)=>{
    ModelUser.Login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({token:token}))
    .catch((error)=>res.status(400).json(error))
})











module.exports=router