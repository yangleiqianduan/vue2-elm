/**
 * @description
 * @date  2017/11/18.
 */


var path = require("path")
var fs = require("fs")
module.exports = function(destPath){
  return function(){
    this.plugin("done",function(stats){
      var statsJson = stats.toJson()
      var chunkName = statsJson.assetsByChunkName
      var result = {};
      for(var key in chunkName){
        var sourceMapping = chunkName[key];
        sourceMapping = [].concat(sourceMapping)
        sourceMapping.forEach && (
          sourceMapping.forEach(function(a){
            var extname = path.extname(a);
            var arr = a.split(".");
            if(arr.length== 3) {
              arr.pop();
              arr.pop();
            }
            else if(arr.length== 4) {
              arr.pop();
              arr.pop();
              arr.pop();
            }
            else if(arr.length== 2) {
              arr.pop();
            }
            arr.push(extname)
            var name = "/"+arr.join("");
            result[name] = "/"+a;
          })
        )
      }
      const iniContent = []
      for(var i in result){
        iniContent.push(`${i}=${result[i]}`)
      }
      try{
        fs.writeFileSync(
          path.join(destPath, "cdnResource.json"),
          JSON.stringify(result));
        fs.writeFileSync(
          path.join(destPath, "cdnResource.ini"),
          iniContent.join("\n"));
      }catch(e){}
    })
  }
}
