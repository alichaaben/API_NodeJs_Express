const mongoose=require('mongoose')
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')






let filed=mongoose.Schema({
    nom:String,
    email:String,
    password:String
})


var user=mongoose.model('user',filed)
var url=process.env.URL

/****************************Registre*********************** */

exports.Registre=(Nom,Email,Password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return user.findOne({email:Email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('email rahou mawjoud')
            }else{
                //hash pour crypter MDP:
                bcrypt.hash(Password,10).then((cryptpass)=>{

                    let NewUser=new user({
                        nom:Nom,
                        email:Email,
                        password:cryptpass
                    })

                    NewUser.save().then((user)=>{
                        mongoose.disconnect()
                        resolve(user)
                    }).catch((error)=>{
                        mongoose.disconnect()
                        reject(error)
                    })

                }).catch((error)=>{
                    mongoose.disconnect()
                    reject(error)
                })

            }
        })
    })
}


/**************************Login**************************** */

 var privateKey=process.env.PRIVATE_KEY


exports.Login=(Email,Password)=>{
    return new Promise((resolve,reject)=>{
       mongoose.connect(url).then(()=>{
        return user.findOne({email:Email})
       }).then((user)=>{
        if(!user){
            mongoose.disconnect()
            reject('email 5alti')
        }else{
            bcrypt.compare(Password,user.password).then((test)=>{
                if(test==true){
                    //sign:==> bech n5azin id ou nom ou privateKey fi browser ou y5alithom ou yasna3li minhom token
                    let token=jwt.sign({id:user._id,nom:user.nom},privateKey,{
                        expiresIn:'1h',//modit soulou7iya ta3 token
                    })
                    mongoose.disconnect()
                    resolve(token)
                }else{
                    mongoose.disconnect()
                    reject('pass 5alti')
                }

            })
        }
       })
    })
}