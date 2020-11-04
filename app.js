const express = require('express');
const _ = require('lodash');
const app = express();
const serverList = require('./modules/get_server');
const allServer = require('./models/server_list');
const offline_server = require('./models/offline_server');



app.get('/',(req,res)=>{
      var serRes = serverList.findServer(allServer);
      serRes.then(data=>{
          if(_.isEmpty(data)){
              res.send(" All server are offline ");
          }
          else{
            res.send(data);
          }
          
      }).catch(err=>{
           res.send(err);
      })
})

app.listen(3000,()=>{
    console.log('Running on port 3000');
})

