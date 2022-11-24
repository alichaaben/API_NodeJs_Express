const server=require('express')
const router=server.Router()


//import mongoose:
const mongoose=require('mongoose')

var url='mongodb://localhost:27017/ESEN'


/*******************connection******************** */
router.get('/',(req,res,next)=>{
    mongoose.connect(url).then(res=>{
        console.log('data base connected !')
    })
    mongoose.disconnect()
})
/************************************************* */







/********************insert*********************** */

var schemaCollection=mongoose.Schema({
    Nom:String,
    prenom:String,
    age:Number
})

var user=mongoose.model('toutou',schemaCollection)

//-------------------------------------
router.get('/user',(req,res,next)=>{
  
mongoose.connect(url).then(res=>{
    user.insertMany({Nom:'ali',prenom:'chaabane',age:23}).then(res=>{
        console.log('inserted !')
    })

})
mongoose.disconnect()
})
/*************************************************************** */

/***************************getAll************************************* */
router.get('/getAll',(req,Res,next)=>{
  mongoose.connect(url).then( (res)=>{
    /********getAll**** */
    //   user.find((err,result)=>{
    //     console.log(result)
    // })
/*********getId ou nom ou ...*********** */
  //   user.findById({_id:'629c34124fa66c0f4ea9d6f5'},(err,result)=>{
  //     console.log(result)
  // })
     user.findOne({Nom:'ali'},(err,result)=>{
      console.log(result)
     
  })
  /******************** */
})

})


/***************************Update************************************* */
router.get('/updateUser',(req,Res,next)=>{
  mongoose.connect(url).then( (res)=>{
  
     user.updateMany({_id:'629c34124fa66c0f4ea9d6f5'},{prenom:'hhhhhhhhh'},(err,result)=>{
      console.log('updated !')
     
  })
  /******************** */
})

})





/***************************Update************************************* */
router.get('/DeleteUser',(req,Res,next)=>{
  mongoose.connect(url).then( (res)=>{
  
     user.deleteOne({_id:'629c34124fa66c0f4ea9d6f5'},(err)=>{
      if(err) throw err
      else console.log('deleted !')
     
  })
})

})

 /******************** */




mongoose.disconnect().then(res=>{
  console.log('data base closed !')
})
module.exports=router



/*
Remarque async ou await bech tofridh 3liyh inou ye5dimha function adhika ou ma yet3adech ou ba3d yarj3ilha 
*/