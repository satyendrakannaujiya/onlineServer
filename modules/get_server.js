const helper = require('../modules/helper');
const https = require('https');
const express = require('express');
const app = express();
// const request = require('request');


module.exports = {
        // This function will return the server with lowest priority
       findServer:(serverList)=>{
                    length = serverList.length;
                    completed_request = 0;
                    const result = [];
                    return new Promise((resolve,reject)=>{
                       
                            for(i in serverList){

                             var req = https.get(serverList[i]['url'],(function(res){
                                        completed_request++;
                                        resposeCode = res.statusCode;
                                        if(resposeCode>=200 && resposeCode <=299){
                                                result.push(this);
                                        }
                                         
                                        if(completed_request>=length){
                                            var lowestPriority = helper.getServerWithLowestPriority(result);
                                            resolve(lowestPriority);
                                        }
                                }).bind(serverList[i]))
                                .on('error',function(err){
                                            completed_request++;
                                           
                                            if(completed_request>=length){
                                                var lowestPriority = helper.getServerWithLowestPriority(result);
                                                resolve(lowestPriority);
                                            }
                                })
                                .on('abort',(function(err){
                                     completed_request++;
                                }).bind(serverList[i]))

                                req.setTimeout(5000,(function(){
                                    req.abort();
                                }).bind(serverList[i]))


                            }  // loop end 

                })
                   
     } 


}
