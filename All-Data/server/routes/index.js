var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');
var jwt = require('jsonwebtoken');
const uuidV1 = require('uuid/v1');

var users = {};
var session = {};
var products = {};
var collections = {};
var categories = {};
var offers = {};
var orders = {};

init();

/* GET home page. */
router.post('/login', function(req, res){
	var aadharNum = req.body.aadharNum;
	var data = JSON.stringify(req.body);
	request.post({
		url : 'http://localhost:8080/login', body: data}, function(err, httpResponse, body){
		var data =JSON.parse(body);
		if(data.status && data.status != "Success"){
			res.json(data);
		}else{
			var id = data.mobile;
			var token = jwt.sign({ aadharNum: aadharNum,  id : id}, config.secret, {
      			expiresIn: 86400 // expires in 24 hours
   			 });
			if(users[id] == undefined){
				users[id] = {adresses : [], orders : [], mobile : id, name : data.name,
					interests : {}};
			}
			session[aadharNum] = token;
			data["token"] = token;
			data["personalList"] = getInterets(id);
			res.json(data);
		}
	})
});

function getInterets(userId){
	var user = users[userId];
	var interests = user.interests;
	var keysSorted = Object.keys(interests).sort(function(a,b){return interests[b]-interests[a]})

	var res = [];
	if(keysSorted.length < 4){

			var oKeys = Object.keys(offers);
			for(var z=0;z<oKeys.length;z++){
				var found = false;
				for(var k=0;k<keysSorted.length;k++){
					if(oKeys[z] == keysSorted[k]){
						found = true;
						break;
					}
				}
				if(!found){
					keysSorted.push(oKeys[z]);
				}
				if(keysSorted.length == 4){
					break;
				}
			}

	}
	for(var i=0;i<keysSorted.length;i++){
		var obj = {name : keysSorted[i]};
		obj["offer"] = offers[keysSorted[i]];
		obj['r'] = "/ecom/electronics/collection/mobile-phones/";
		res.push(obj);
		if(i == 3){
			break;
		}
	}
	return res;
}

router.post('/bank', function(req, res){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    var aadharNum = decoded.aadharNum;
    if(session[aadharNum] == token){
    	var url = "http://localhost:8080/"+req.body.url;
    	delete req.body["url"];
		var data = JSON.stringify(req.body);
    	request.post({
    		url : url,
    		body: data
    	}, function(err, resp, body){
    		res.send(body);
    	})
    }else{
    	return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
  });

})

router.post('/getNearbyLocation', function(req, res){
	var coords = req.body.coords;
	var store1 = {lat: 19.228825, lng: 72.854118};
  	var store2 = {lat: 19.226825, lng: 72.853118};
  	var store3 = {lat: 19.224825, lng: 72.855118};
  	res.json({msg : "success", stores : [store1, store2, store3]});
})

router.post('/logout', function(req, res){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		var aadharNum = decoded.aadharNum;
		if(session[aadharNum] == token){
			delete session[aadharNum];
		}
		res.json({msg : "success"});
});

});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getSubCategories/:cId', function(req, res, next){
	var cId = req.params.cId;
	if(cId.toLowerCase() == "electronics"){
		var subCategories = categories[cId.toLowerCase()];
	}
	res.json({msg : "success", name : cId, bannerUrl : "", subCategories : subCategories});
})

router.get('/collection/:cId', function(req, res, next){
	var cId = req.params.cId;
	if(req.headers['x-access-token'] != undefined){
		var token = req.headers['x-access-token'];
		jwt.verify(token, config.secret, function(err, decoded) {
			console.log(decoded);
			var id = decoded.id;
			var user = users[id];
			var interests = user.interests;
			if(interests[cId] != undefined){
				var score = interests[cId];
				score = score + 0.1;
			}else{
				var score = 0.1;
			}
			interests[cId] = score;
			user.interests = interests;
			users[id] = user;
		})
	}
	if(cId == "mobile-phones"){
		var collection = {};
		collection["name"] = "Mobile Phones";
		collection["productList"] = collections[cId];
		res.json({msg : "success", data : collection});
	}else{
		res.json({msg : "success", data : []});
	}
});

router.get('/collection/:cId/product/:pId', function(req, res, next){
	var cId = req.params.cId;
	var pId = req.params.pId;


	res.json({msg : "success", productDetails : products[pId]});
});

router.post('/updateRating', function(req, res, next){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		var pId = req.body.pId;
		var rating = req.body.rating;
		var product = products[pId];
		var currentRating = product.rating;
		var currentRaters = product.ratingNum;
		currentRating = currentRating * currentRaters;
		currentRaters = currentRaters + 1;
		currentRating = currentRating + rating;
		currentRating = Math.round(currentRating/currentRaters);
		// update rating in db
		return res.json({msg : 'success', rating : currentRating});
	});
});

router.get('/getAddress', function(req, res, next){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

	    var userId = decoded.id;
	    var user = users[userId];

		var userAddresses = user.adresses;
		res.json({msg : "success", addresses : userAddresses});
	});
});

router.post('/saveAddress', function(req, res, next){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    	var userId = decoded.id;
	    var user = users[userId];

		var name = req.body.name;
		var address1 = req.body.address1;
		var address2 = req.body.address2;
		var city = req.body.city;
		var state = req.body.state;
		var pincode = req.body.pincode;
		var addressId = "a1002";
		var address = address1 + ", " + address2 + ", " + city + ", " + state + ", " + pincode;
		var completeAddress = {};
		completeAddress["name"] = name;
		completeAddress["address"] = address;
		completeAddress["mobile"] = "0000000000";

		var userAddresses = user.adresses;
		userAddresses.push(completeAddress);
		user.adresses = userAddresses;

		users[userId] = user;
		res.json({msg : "success", addressId : addressId});
	});
});

router.get('/applyCoupon', function(req, res, next){
	res.json({msg : "success"});
});

router.post('/completeOrder', function(req, res, next){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

		var cart = req.body.cart;
		var addressId = req.body.addressId;
		var payMode = req.body.payMode;
		var isPaySuccess = true;
		orders["OD001"] = {orderId: "OD001", cart : cart, addressId : addressId, payMode : payMode, date : new Date(), status : "Received"};
		res.json({msg : "success", orderId : "OD001"});
		setTimeout(function(){
			var order = orders["OD001"];
			order['status'] = "Shipped";
		}, 5000)
	});
});

router.post('/trackOrder', function(req, res, next){
	var orderId = req.body.orderId;
	var order = orders[orderId];
	return res.json({msg : "success", "order": order});
});

function init(){

	offers["mobile-phones"] = "30% Off";
	offers["grocery"] = "Rs. 400 Off";
	offers["perfumes"] = "Rs. 1000 Off";
	offers["men-tshirt"] = "20% Cashback";
	offers["trousers"] = "10% Off";
	offers["sports"] = "20% Cashback";
	offers["shoes"] = "50% Cashback";


	var productList = [];
	productList[0] = {pId:"mobileP1", name : "Mobile 1", aPrice : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off",
						imgUrl : "mobile.jpg", r: "/ecom/electronics/collection/mobile-phones/product/mobileP1",
  						rating: 1};
	productList[1] = {pId:"mobileP2", name : "Mobile 2", aPrice : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off",
  						imgUrl : "mobile.jpg", r: "/ecom/electronics/collection/mobile-phones/product/mobileP1",
  						rating: 2};
	productList[2] = {pId:"mobileP3", name : "Mobile 3", aPrice : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off",
  						imgUrl : "mobile.jpg", r: "/ecom/electronics/collection/mobile-phones/product/mobileP1",
  						rating: 3};
	productList[3] = {pId:"mobileP4", name : "Mobile 4", aPrice : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off",
  						imgUrl : "mobile.jpg", r: "/ecom/electronics/collection/mobile-phones/product/mobileP1", rating: 4};
	productList[4] = {pId:"mobileP5", name : "Mobile 5", aPrice : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off",
  						imgUrl : "mobile.jpg", r: "/ecom/electronics/collection/mobile-phones/product/mobileP1", rating: 4};
	productList[5] = {pId:"mobileP6", name : "Mobile 6", aPrice : "Rs. 500", dPrice : "Rs. 400", offer : "30% Off",
						imgUrl : "mobile.jpg", r: "/ecom/electronics/collection/mobile-phones/product/mobileP1", rating: 4};
	collections["mobile-phones"] = productList;

	var subCategories = [];
	subCategories[0] = {name : "Mobile Phones", imgUrl : "mobile.jpg", offer: "30% Off", r: "/ecom/electronics/collection/mobile-phones"};
	subCategories[1] = {name : "Pendrives", imgUrl : "pendrive.jpg", offer: "30% Off", r: "/ecom/electronics/collection/pendrives"};
	subCategories[2] = {name : "Cameras", imgUrl : "camera.jpg", offer: "30% Off", r: "/ecom/electronics/collection/cameras"};
	subCategories[3] = {name : "Headphones", imgUrl : "headphones.jpeg", offer: "30% Off", r: "/ecom/electronics/collection/headphones"};

	categories["electronics"] = subCategories;

	var productDetials = {title : "Mobile Phone - XYZ - Grey Color"};
	productDetials["dPrice"] = 1000;
	productDetials["aPrice"] = 2000;
	productDetials["discount"] = "50% Off";
	productDetials["details"] = ["6.1-inch Liquid Retina display (LCD)", "IP67 water and dust resistant", "Face ID for secure authentication"];
	productDetials["imgUrl"] = "mobile.jpg";
	productDetials["pId"] = "mobileP1";
	productDetials["rating"] = 0;
	productDetials["ratingNum"] = 0;
	products["mobileP1"] = productDetials;
};

function personalizationEngine(){

}

module.exports = router;
