/**
 * Created by Chaitu on 10/2/2016.
 */
var express=require('express');
var mysql=require('mysql');
/*
    var connection= mysql.createConnection(
        {

            host:'localhost',
            user: 'root',
            password: 'root',
            database:'ebaydatabase',
            port:3306
        }
    );
    return connection;*/

// using pool
   var pool= mysql.createPool({
       connectionLimit:10,
       host:'localhost',
       user: 'root',
       password: 'root',
       database:'ebaydatabase',
       port:3306

   });
//fetching data from sql server
function fetchData(callback,sqlQuery) {

    console.log("sql query is " + sqlQuery);
    pool.getConnection(function (err, connection) {
        connection.query(sqlQuery, function (err, rows) {
            if (err) {
                console.log("error is" + err);
            }
            else {
                console.log(" result is" + JSON.stringify(rows));
                callback(err, rows);
            }
            console.log("connection closed");
            connection.release();
        });

    });
}



//posting signup data into database

function insertData(sqlQuery,post) {

      pool.getConnection(function(err,connection){
    console.log(post);
    connection.query(sqlQuery, post, function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('success');
            console.log(res);
        }
        console.log("connection closed from signup page");
        connection.release();

    })

});
}

//to retrieve data from products table

    function fetchHomePageData(callback,sqlQuery) {
        console.log("query is " + sqlQuery);
        pool.getConnection(function(err, connection) {
            connection.query(sqlQuery, function (err, rows) {
                if (err) {
                    console.log("error is" + err);
                }
                else {
                    var result = JSON.stringify(rows);
                    callback(err, result);
                }
                connection.release();
                console.log("connection closed from loading  homepage");
            })
        });
    }


  function insertBidData(bidQuery,post){
       pool.getConnection(function(err,connection){
           console.log(post);
           connection.query(bidQuery,post,function(err,res){
               if(err)
               {
                   console.log(err);
               }
               else
               {
                   console.log("suceess");
                   console.log(res);
               }
           })

       })
  }


  function insertAddFun(postQuery,post){
      console.log("inside function");
        pool.getConnection(function(err,connection){
            console.log(post);
             connection.query(postQuery,post,function(err,res){
                 if(err)
                 {
                     console.log(err);
                 }
                 else
                 {
                     console.log("success");
                     console.log(res);
                 }
             })

        })

  }


  function insertOrder(postorderQuery,post){
      pool.getConnection(function(err,connection){
          connection.query(postorderQuery,post,function (err,res) {
              if(err)
              {
                  console.log(err);
              }
              else
              {
                  console.log(res);
                  console.log("success");
              }

          })
      })
  }

  function fetchOrderData(callback,orderQuery){
      console.log("query of orders is"+orderQuery);
      pool.getConnection(function (err,connection) {
         connection.query(orderQuery,function (error,rows){
             if(error)
             {
                 console.log(error);
             }
             else
             {
                 callback(err,rows);
             }

         })
      })

  }

//fetching sold products
  function fetchSoldProducts(callback,query){

      console.log("query is"+query);
      pool.getConnection(function (err,connection) {
          connection.query(query,function(error,rows){
              if(err)
              {
                  console.log(error);
              }
              else
              {
                  callback(error,rows);
              }
          })

      })
  }




exports.fetchSoldProducts=fetchSoldProducts;
exports.fetchOrderData=fetchOrderData;
exports.insertOrder=insertOrder;
exports.insertAddFun=insertAddFun;
exports.insertBidData=insertBidData;
exports.fetchData=fetchData;
exports.insertData=insertData;
exports.fetchHomePageData=fetchHomePageData;









