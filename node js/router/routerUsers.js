const server=require('express')
const router=server.Router()

//const bodyPerser=require('body-pareser').urlencoded({extended:true})

/***************** create data base***********************/
const mongo=require('mongodb').MongoClient
var url='mongodb://localhost:27017'
router.get('/users',(req,res,next)=>{
    mongo.connect(url,(err,result)=>{
        if(err) throw err
       var bd=result.db('ESEN')//ya tsami wa7da jdida ou titsna3  sinon ta3ti ism l9dima ou te5dim 3liyha  
       bd.createCollection('user',(err,result)=>{
           if(err) throw err
           else console.log('collection created !')

       })
    })
db.close()
})
//sna3na db ou 3malna collection ema moch m3ibi
/************************************************************* */

/***********************insert filed*************************** */
var user={Nom:'ali',prenom:'chaaben',password:'12345ali'}
router.get('/user/createdFiled',(req,res,next)=>{
    mongo.connect(url,(err,result)=>{
        if(err) throw err
        var db=result.db('ESEN')
        db.createCollection('user',(err,result)=>{
            if(err) throw err
            else{
                result.insertOne(user,(err,result)=>{//insertOne :we7id barka || insertMany:tableau des filed
                    if(err) throw err
                    else console.log('filed created :)')
                })

            }
        })
    })
})

/************************************************************* */





module.exports=router