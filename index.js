const fs = require('fs')
module.exports = function (src = 0) {

    var module = {};
    if (src != 0) {
        module.src_path = src
    }
    module.setSrc = function (path) {

        module.src_path = path;
    }
    module.getSrc = function () {
        return module.src_path
    }
    module.buildToString = async function (obj) {
       let data =  await build(obj)
        return data

    }

    module.buildToFile = async function (obj, end_path) {
        let data = await build(obj)
        return new Promise((resolve, reject) => {
            end_path = end_path || getDateString() + ".html"
            console.log(end_path)
            fs.writeFile(end_path, data, 'utf8', (err) => {
                if (err) {

                    reject(err);
                } else {

                    resolve({
                        Status: "File built at " + end_path,
                        src_path: end_path,
                        Data: data
                    })
                }
            });
        })
    }

    function getDateString() {
        var today = new Date();
        var time =today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()+'-'+ today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        return time;
    }

    async function build(obj) {
        return new Promise((resolve, reject) => {
            if(module.src_path==null){
                throw new EBRError("Path not defined, please use setSrc() to define the path")
           
            }

            fs.readFile(module.src_path, (err, data) => {
                if (err != null) {
                    throw new EBRError(err.message)
           
                }
                let raw = data.toString()
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        fkey = "{{" + key + "}}";
                        raw = raw.replace(new RegExp(fkey, 'gi'), obj[key])
                    }
                }

                resolve(raw)

            })
        })
    }
    return module;

};

class EBRError extends Error {
    constructor(message) {
      super(message);
      this.name = "EBRError";
    }
  }