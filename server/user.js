const express = require('express');
const Router = express.Router();
const model = require('./model.js');
const User = model.getModel('user');
const utils = require('utility');
const _filter = {'password':0,'_v':0};
const Chat = model.getModel('chat');


Router.post('/getmessagelist',function (req,res) {

    const myselfid = req.cookies.user;

    Chat.find({'$or':[{myselfid:myselfid, anotherid:myselfid}]},function (err,doc) {
        if(!err){
            return res.json({code:0,messages:doc})
        }
    })


})

Router.get('/list',function (req,res) {
    const sex = req.query.sex;
    //console.log('user.js-list-req.query:',req.query);
    User.find({sex:sex},function (err,doc) {
        return res.json({code:0,data:doc});
    })
})

Router.post('/register',function (req,res) {

    const {username,password,sex} = req.body;
    User.findOne({username:username},function (err,doc) {

        if (doc){
            return res.json({code:1, msg:'Username is already taken'})
        }

        const userModel = new User({username,sex, password:md5Password(password)});
        //console.log(userModel)
        userModel.save(function (e,d) {
            if (e){
                return res.json({code:1, msg:'Error'})
            }
            const {username,sex,_id} = d;
            res.cookie('userid',_id);
            return res.json({code:0, data:{username, sex, _id}})
        })
    })
})

Router.post('/login',function (req, res) {
    const{username,password} = req.body;
    User.findOne({username:username,password:md5Password(password)},_filter,function (err,doc) {
        if (!doc){
            return res.json({code:1, msg:'Invalid login or password'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0, data:doc});
    })
})

Router.get('/info',function (req,res) {
    const {userid} = req.cookies;
    if (!userid){
        return res.json({code:1});
    }

    User.findOne({_id:userid},_filter,function (err,doc) {
        if (err){
            return res.json({code:1,msg:'Error'})
        }
        if (doc){
            return res.json({code:0, data:doc})
        }
    })
})

Router.post('/update',function (req,res) {

    const userid = req.cookies.userid;
    if (!userid){
        return res.json({code:1})
    }
    const body = req.body;
    //console.log('user.js-update',body); age country desc

    User.findByIdAndUpdate(userid,body, function (err,doc) {
        if(err){
            console.log('user.js update Error');
        }
        const data = Object.assign({},{
            username:doc.username,
            sex:doc.sex
        },body)
        console.log('user.js-update',data);//username sex age country desc
        return res.json({code:0, data})
    })
})

function md5Password(password){
    const secret = 'you_can_not_decrypt';
    return utils.md5(utils.md5(password + secret));
}

module.exports = Router