const router=require('express').Router()
const ModelStudent=require('../Model/student.Model')
const jwt=require('jsonwebtoken')
require('dotenv').config()








/***********************function pour verif token ******************************* */
//tit7at fi le midelwear il 3andi bech na7miyhom :


var privateKey=process.env.PRIVATE_KEY

verifyToken=(req,res,next)=>{
    //si :  ken ma 3tanich token jimla bech ya3tiyha msg :rejected access ....!!

    let token=req.headers.authorization //authorization:adhika il ism ily nektbou fi postman fi header bech n7ot fiyha token
    if(!token){
        res.status(400).json({msg:'rejected access ....!!'})
    }

    //sinon: yverifi token ou privetKey ou yet3ada lil midllwere le5ir exmple:yafichilik AllStudetn sinon ya3tik exception !
    try{
        jwt.verify(token,privateKey)
        next()
    }catch(ex){
        res.status(400).json({msg:ex})
    }
}

/**************************************************************************** */



//just pour tester le serveur :
router.get('/home',(req,res,next)=>{
    res.send('<h1>Homme page</h1>')
})





router.get('/',(req,res,next)=>{
    ModelStudent.testConnection()
    .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(404).json(error))
})


router.post('/AddStudent',(req,res,next)=>{//verifyToken: ==> ken 3andou token ynajim yaksedi lil AllStudent
    ModelStudent.addStudent(req.body.nom,req.body.prenom,req.body.age)//nom ou prenom ou age houma ily fi <form name='nom'>
    .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))
})




router.get('/AllStudent',verifyToken,(req,res,next)=>{
    ModelStudent.GetAllStudent()
    .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))
})


router.get('/student/:id',(req,res)=>{
    ModelStudent.GetStudent(req.params.id)
    .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))
    /*ken beh t3adi quary iktib haka
    ModelStudent.GetStudent(req.quary.id)
    */

})


router.delete('/Delete/:id',(req,res,next)=>{
    ModelStudent.DeleteStudent(req.params.id)
    .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))
})


router.patch('/update/:id',(req,res,next)=>{
    ModelStudent.UpdateStudent(req.params.id,req.body.nom,req.body.prenom,req.body.age) //lasemi iny fi form 
    .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))
})






/*************************MYSQL******************************** */

// router.post('/AddStudentSql',(req,res,next)=>{//verifyToken: ==> ken 3andou token ynajim yaksedi lil AllStudent
//     ModelStudent.addStudentSql(req.body.nom,req.body.prenom,req.body.age)//nom ou prenom ou age houma ily fi <form name='nom'>
//     .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))


// })


// router.get('/studentSql/:id',(req,res)=>{
//     ModelStudent.GetStudentSql(req.params.id)
//     .then((msg)=>res.status(200).json(msg)).catch((error)=>res.status(400).json(error))
//     /*ken beh t3adi quary iktib haka
//     ModelStudent.GetStudent(req.quary.id)
//     */

// })
/************************************************************** */






module.exports=router
