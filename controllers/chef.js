/*
* This Controller handles all request from the usertype 'Chef'
*/

const Order = require('../models/order')
const Receipt = require('../models/receipt')
const {checkAuth} = require('../controllers/login')

exports.getChefPanel = function (req, res) {
    //rendering chefpanel, which is the control panel for the Chef usertype
    checkAuth(req,res,'chef').then(result => {if(result){
        Order.find({}).then(items =>{
            res.render('chefpanel.ejs', {items: items})
        })}else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})
}

exports.postChefPanel = function (req, res) {
    checkAuth(req,res,'chef').then(result => {if(result){
        if (req.body.changestatus) {
            //Change status in MongoDB if the changestatus input is submitted
            Order.updateOne({_id: req.body._id}, {$set: {'status': req.body.status}}).catch(err => console.log('An error occurred: ', err))
            //res.redirect('/chef/chefpanel')
        } else {
            //Create a Receipt and delete the corresponding order otherwise
            //THIS OPERATION MUST BE ATOMIC
            Order.findOneAndDelete({_id: req.body._id})
                .then(deletedOrder => {
                    const receipt = new Receipt({
                        username: deletedOrder.username,
                        itemNameArray: deletedOrder.itemNameArray,
                        total: deletedOrder.total
                    })
                    receipt.save().then(savedOrder => {
                        console.log('The order: ', savedOrder)
                        console.log('##Receipt Registered Successfully!')
                        console.log('##The corresponding Order was deleted!')
                    })
                }).catch(err => console.log('An error occurred: ', err))}
    }else if(result===null){res.redirect('/auth/redirectingLogin')}else{res.render('failure.ejs')}})
}

exports.getChefStream = async function (req, res) {
    //handling eventSource for Order change in database
    const changeStream = await Order.collection.watch()
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    })
    changeStream.on('change', () => {
        console.log('im here', req.params.id)
        Order.findOne({_id: req.params.id}).then(result => {
            //ping the EventSource, for debug purposes we use the status
            res.write(`data: ${result.status}\n\n\ `)
        }).catch(err => console.log('An error occurred:', err))
        console.log("Updating the page..")
    })
}