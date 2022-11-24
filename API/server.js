const express=require('express')
const app=express()

const RouterStudent=require('./router/student.router')
const RouterUser=require('./router/user.router')



app.use(express.json()) //pour travailler avec un donner json
app.use(express.urlencoded({extended:true}))//pour les donner vient avec un formulaire



/***********************CORS*********************** */
//bech ynajim serveur ye5dim m3a port e5ir kima 3000 ou 80 ta3 xampp wila front end angular:
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-origin',"*")//chnouwa il sit ily bech ye5dim m3ah serveur
    res.setHeader('Access-Control-Request-Method',"*")//chnouma les method ily bech t5aliyh ye5dim biyhom exmple: post ou get ou patch...
    res.setHeader('Access-Control-Allow-Headers',"*")//ay 7aja tab3ithihelou min wist browser kim authorization 
    next()//yt3ada lil router ily ba3dhom 
    })

/***************************************************** */    




app.use('/',RouterStudent)

/********************User*********** */

app.use('/',RouterUser)










app.listen(3000,()=>{console.log('server is runnign in port 3000')})













