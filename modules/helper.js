// const { forEach } = require("../models/server_list");

module.exports = {
      getServerWithLowestPriority: (serverList)=>{
          
              result = serverList[0];
              for ( i in serverList){
                  obj = serverList[i];
                  if(parseInt(obj['priority'])<parseInt(result['priority'])){
                    result=obj;
                  }
              }
              return result;
             
      }
}