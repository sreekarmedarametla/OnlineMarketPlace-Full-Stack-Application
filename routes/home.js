/**
 * Created by Chaitu on 10/2/2016.
 */

var mysql=require('./mysql');
var winston=require('winston');
var logger1 = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './bi' +
        'n/logs/a.log' })
    ]
});

//validating  signin functionality
function checksignin(req,res){
    console.log(req.body);
    var email=req.body.email;
    var password=req.body.password;
    var getUser="select * from users where email='"+email+"' and password='"+password+"'";
    console.log("query is "+getUser);
    mysql.fetchData(function(err,results){
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(results.length>0)
            {

                 console.log(results[0].firstname);
                 req.session.userid=results[0].email;
                 console.log(req.session.userid+" is the session");
                  var json_response={ "data" : results[0].firstname };
                  logger1.log('info',"Landed on signin");
                  res.send('json_response');
            }
            else{

                console.log("invalid login");
                var data={"statusCode":401};
                res.send(data);

            }
        }


    },getUser);

}

//validating signup functionality

function checksignup(req,res)
{
    // console.log(req.body);
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;
    var password=req.body.password;
      var json_response;

    if(firstname&&lastname&&email&&password)
    {
          var pattern=/^[a-zA-Z0-9!@#$%^&*\/]{6,}$/;
            if(password.match(pattern))
            {
                  // inserting data into database
                   var post={
                       firstname:firstname,
                       lastname:lastname,
                       email:email,
                       password:password
                   }
                var signupquery="INSERT INTO users SET ? ";
                logger1.log('info',"checking the signup page");
                 mysql.insertData(signupquery,post);
            }
            else
            {

                json_response={"data": "password should be atleast 6 characters"};
                res.send(json_response);
            }

    }
    else
    {
        json_response={"data":"please enter all the fields"};
        res.send(json_response);

    }
}


//function load home pagefrom database


function homePageLoad(req,res){
    var fetchHomepageQuery="select * from products";
     mysql.fetchHomePageData(function(err,result){
         if(err){
             console.log("error is "+err);
         }
         else
         {
             logger1.log('info',"loaded onto homepage");
             res.send(result);

             console.log(result);

         }

     },fetchHomepageQuery);
}

//doing bid business
 function postUserBid(req,res){
        // inserting bid values into database
     var d = new Date();

     var curr_date = d.getDate();

     var curr_month = d.getMonth();

     var curr_year = d.getFullYear();

     var date=curr_year + "-" + curr_month + "-" +curr_date+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
     console.log(date);
        var post= {
            userid: req.session.userid,
            productid: req.body.productid,
            userbidprice: req.body.userbidprice,
            date:date
        }
         logger1.log('info',"posting user bid");
         var bidQuery='INSERT INTO bidtable set ?'
         mysql.insertBidData(bidQuery,post);

 }

//posting adds into products database

function postAdd(req,res){
    var post={
        productname:req.body.productname,
        productdescription:req.body.productdescription,
        sellerinformation:req.body.sellerinformation,
        productprice:req.body.productprice,
        quantity:req.body.quantity,
        selleremail:req.body.selleremail
    }
    var postaddQuery='INSERT INTO products set ?'
    mysql.insertAddFun(postaddQuery,post);
    logger1.log('info',"Posting add");
}




function postOrder(req,res){

    console.log(req.body);
    console.log(req.session.userid);
    var d = new Date();

    var curr_date = d.getDate();

    var curr_month = d.getMonth();

    var curr_year = d.getFullYear();

    var date=curr_year + "-" + curr_month + "-" +curr_date;
    var post={
             orderdate:date,
             productid:req.body.productid,
             productdescription:req.body.productdescription,
             orderedquantity: req.body.quantity,
             useremail: req.session.userid
    }

     var postOrderquery='INSERT INTO orders set?'
     mysql.insertOrder(postOrderquery,post);
    logger1.log('info',"user is ordering the product");
}



function getOrders(req,res){
    var email=req.session.userid;
    var fetchOrdersQuery="select * from orders where useremail='"+email+"'";
    mysql.fetchOrderData(function(err,results){
        if(err)
        {
            console.log(error);
        }
        else
        {
            console.log(JSON.stringify(results));
            res.send(results);

        }
    },fetchOrdersQuery);
    logger1.log('info',"user order history");

}

function getsoldProducts(req,res){
    var email=req.session.userid;
    var fetchsoldProductsquery="select * from products where selleremail='"+email+"'";
    mysql.fetchSoldProducts(function(err,result) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);
        }

    },fetchsoldProductsquery);
    logger1.log('info',"User Selling Products");
}


exports.getsoldProducts=getsoldProducts;
exports.getOrders=getOrders;
exports.postOrder=postOrder;
exports.postAdd=postAdd;
exports.postUserBid=postUserBid;
exports.homePageLoad=homePageLoad;
exports.checksignin=checksignin;
exports.checksignup=checksignup;





