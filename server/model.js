const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/testchat'
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
    console.log('mongoose connected')
})

const models = {
    user:{
        'username':{'type':String,'require':true },
        'password':{'type':String,'require':true },
        'sex':{'type':String,'require':true },
        'avatar':{'type':String,'require':true},
        'desc':{'type':String,'require':true},
        'age':{'type':Number,'require':true},
        'country':{'type':String, 'require':true}
    },

    chat:{
        'chatid':{'type':String,'require':true},
        'myselfid':{'type':String,'require':true},
        'anotherid':{'type':String,'require':true},
        'content':{'type':String, 'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
}
//build database
for (let n in models){
    mongoose.model(n, new mongoose.Schema(models[n]))
}
module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}






















