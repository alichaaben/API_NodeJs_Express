const mongoose=require('mongoose')
const joi=require('joi')
//const mysql=require('mysql2')
require('dotenv').config()



/******************validation de la form*************** */


let filedValid=joi.object({
    NomValid:joi.string().alphanum().min(3).max(20).required(),
    PrenomValid:joi.string().alphanum().min(3).max(20).required(),
    //email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
    AgeValid:joi.number().required()
})



/************************************************************ */


let filed=mongoose.Schema({
    nom:String,
    prenom:String,
    age:Number
})




var student=mongoose.model('student',filed)
var url=process.env.URL




exports.testConnection=()=>{
return new Promise((resolve,reject)=>{
    mongoose.connect(url).then(()=>{
        mongoose.disconnect()
        resolve('DB connect !')
    }).catch((error)=>reject(error))
})
} 



exports.addStudent=(Nom,Prenom,Age)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            /**** validation de la donner ily jeya mil form ******/ 
            let test=  filedValid.validate({NomValid:Nom,PrenomValid:Prenom,AgeValid:Age})
            if(test.error){
                mongoose.disconnect()
                reject(test.error.details[0].message)
            }
            /************************ */

      let Student = new student({
        nom:Nom,
        prenom:Prenom,
        age:Age
      })

      Student.save().then((doc)=>{
        mongoose.disconnect()
        resolve(doc)
      }).catch((error)=>{
        mongoose.disconnect()
        reject(error)
      })
    }).catch((error)=>{
        mongoose.disconnect()
        reject(error)})
})
}



exports.GetAllStudent=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return student.find()
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((error)=>reject(error))
    })
}



exports.GetStudent=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return student.findById(id)//t7ib tlawij bil ism araja iktib find({nom:ism ily 7achtik biyh})
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((error)=>reject(error))
    })
}



exports.DeleteStudent=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return student.deleteOne({_id:id})
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((error)=>reject(error))
    })
}




exports.UpdateStudent=(id,Nom,Prenom,Age)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return student.updateOne({_id:id},{nom:Nom,prenom:Prenom,age:Age})
        }).then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
        }).catch((error)=>reject(error))
    })
}





/*****************************MYSQL********************************* */

// const connection=mysql.createConnection({
//     host:"127.0.0.1",
//     user:"root",
//     password:"",
//     database:"testAPI"
// })

// exports.addStudentSql=(Nom,Prenom,Age)=>{
//     return new Promise((resolve,reject)=>{
//             /**** validation de la donner ily jeya mil form ******/ 
//             let test=  filedValid.validate({NomValid:Nom,PrenomValid:Prenom,AgeValid:Age})
//             if(test.error){
//                 reject(test.error.details[0].message)
//             }
//             /************************ */
//             connection.query("INSERT INTO student(id,nom,prenom,age)values(?,?,?,?)",[null,Nom,Prenom,Age],(error,result,fieds)=>{
//                 if(error){
//                     reject('error insert .. :(')
//                 }
//                 if(result){
//                     resolve('inserted ..!!')
//                 }
//             })
//     })
// }






// exports.GetStudentSql=(id)=>{
//     return new Promise((resolve,reject)=>{
//             return connection.query("SELECT * FROM student WHERE id=?",[id],(error,result,fieds)=>{
//                 if(error){
//                     reject('error views Data ..  :(')
//                 }
//                 if(result){
//                     resolve(result)
//                 }
//             })
//         })
//     }


/********************************************************************** */
















