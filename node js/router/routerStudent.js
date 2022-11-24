/*hedhi lkol kifech nasna3 server bil node-js*/

// const http=require('http')

// const server=http.createServer((req,res)=>{
//     // res.statusCode=404
//     // res.setHeader('content-type','text/html')
//     // res.write('Welcome to my server ')
//     // res.end()


//     //res.write(req.url) 
//     if(req.url=='/home'){
//         res.write('welcome to home ')
//     }else if(req.url=='/ali'){
//         res.write('welcome Mr Ali')
//     }else{
//         res.statusCode=404
//         res.write('error url')
//     }
//     res.end()
// })

// server.listen(5000,()=>{console.log('server  is runing')})


/************************************************************** */
const server=require('express')
const router=server.Router()

const bp=require('body-parser').urlencoded({extended:true})//body-parser ==> changer le data (string ==> Object)
//urlencoded({extended:true}) ====> urlencoding tjib data fi string ou extand tbadilha object


//midellwere

// router.use((req,res,next)=>{
//    res.send('hello world 1')
//     next()
// },(req,res,next)=>{
//     res.send('hello world 2')
    
// },(req,res,next)=>{
//     res.send('hello world 3')
// })
  /*all hiya i5tisar lil (get/post/patch/delete/put)*/
// router.all('/',(req,res,next)=>{
//        res.send('welcome to home')
//     })
//  router.all('/about',(req,res)=>{
//      res.send('welcome to about')
//  })

/*********************Post*********************** */

// router.get('/',(req,res)=>{
//     res.send('<form action="/test" method="post"> <input type="text" name="Nom" /> <button type="submit">post</button> </form>')
// })
 



// router.post('/test',bp,(req,res,next)=>{
//     res.send(req.body.Nom)
// })


/********************Params********************* */


// router.get('/home/:Nom/:id',(req,res)=>{
//     res.send(req.params.id+'<br>'+req.params.Nom)
// })


/********************Query **********************/


// router.get('/home',(req,res,next)=>{
//     res.send(req.query.id+'<br>'+req.query.Nom)
// })


/***************sendFile*************** */

// const path=require('path')
// router.use(server.static(path.join(__dirname,'assets')))//file static bech tnajim t3ayet il fichier css

// router.get('/',(req,res,next)=>{
//   res.sendFile(path.join(__dirname,'index.html'))
//  // res.sendFile('//home//ali//Bureau//node js//index.html')
// })


/**********************getAllStudent******************************** */
var tabStudent=[
  {id:0,Nom:'ali',prenom:'chaabane',age:23},
  {id:1,Nom:'mouhamed',prenom:'chaabane',age:60},
  {id:2,Nom:'tasnim',prenom:'chaabane',age:17},
  {id:3,Nom:'louay',prenom:'chaabane',age:15}
]
router.get('/home',(req,res,next)=>{
  res.send('page home')
})

router.get('/',(req,res,next)=>{
  res.send(tabStudent)
})
 
router.get('/:id',(req,res,next)=>{ 
let resulta=tabStudent.find(x=>x.id==req.params.id)
if(resulta){
  res.send(resulta)
}else{res.send("we don't have this studient")}

})


router.delete('/Delete/:id',(req,res,next)=>{
  let resulta=tabStudent.find(x=>x.id==req.params.id)
  let pos=tabStudent.indexOf(resulta)
  tabStudent.splice(pos,1)
  res.send(tabStudent)
})

//insert:(post)
router.post('/add/',bp,(req,res,next)=>{
  let newStudent={
    id:req.body.id,
    Nom:req.body.Nom,
    prenom:req.body.prenom,
    age:req.body.age
  }
  tabStudent.push(newStudent)
  res.send(tabStudent)
})

//update:(put ou patch)
router.patch('/update/:id',bp,(req,res,next)=>{
  let resultat=tabStudent.find(x=>x.id==req.params.id)
   //resultat.id=req.body.id
   resultat.Nom=req.body.Nom
   resultat.prenom=req.body.prenom
  resultat.age=req.body.age
  res.send(resultat)
})
//bech ta3rif mode mte3 5idma mte3ik ==> Fn.get('env')
//pour changer mode development et prodection:==>export NODE_ENV=prodiction || development



//lezimni niexportiyha sinon ma yemchich routerStudent*****
module.exports=router
