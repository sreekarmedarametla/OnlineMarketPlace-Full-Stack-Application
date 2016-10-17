/**3
 * Created by Chaitu on 10/7/2016.
 */
var myApp=angular.module('home',['ui.router','ngStorage']);
myApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $locationProvider.html5Mode(true);

    //state for homepage brought you here from index page in routes
    $stateProvider.state('homepage',{
        url:'/homepage',
        views:{
            'header':{
                templateUrl:'templates/headerhomepage.html',
            },
            'content':{
                templateUrl:'templates/homepage.html',
            }
        }
    })

    $stateProvider.state('cart',{
         url:'/cart',
          views:{
               'header':{
                    templateUrl:'templates/headerhomepage.html',
               },
                'content':{
                   templateUrl:'templates/cart.html',
                }
          }
    })

    //state for profile page takes you to profile from home page
     $stateProvider.state('profile',{
         url:'/profile',
         views:{
             'header':{
                 templateUrl:'templates/headerhomepage.html',
             },

             content:{
                 templateUrl:'templates/profile.html',
                     }
         }

     })
    $stateProvider.state('advertisement', {
        url: '/advertisement',
        views: {
            'header': {
                templateUrl: 'templates/headerhomepage.html',
            },
            'content': {
                templateUrl: 'templates/advertisement.html',
            }
        }
    })
    $stateProvider.state('checkout',{
        url:'/checkout',
        views:{

            'header':{
                    templateUrl:'templates/headerHomepage.html',
                      },
             'content':{
                       templateUrl:'templates/checkout.html'
                        }

        }

    })

    $stateProvider.state('orderhistory',{
        url:'/orderhistory',
        views:{
            'header':{
                templateUrl:'templates/headerHomepage.html',
            },
            'content':{
                templateUrl:'templates/orderhistory.html'
                     }
        }


    })

    $stateProvider.state('biddingproducts',{
        url:'/biddingproducts',
        views:{
            'header':{
                templateUrl:'templates/headerHomepage.html',
                    },
              'content':{
                        templateUrl:'templates/biddingproducts.html'
              }
        }
    })

})
 myApp.controller('home',function($scope, $http, $state,$localStorage) {

        $scope.data = [];
            $scope.loadData=function(){
            $http({
                method: 'get',
                url: '/loadhomepage',
            }).success(function (res) {
                $scope.data = res;
            });
        }
  })

//bidding workout
   myApp.controller('bidding',function($scope,$http,$localStorage){
       $scope.bidProduct=function(bidvalue){
             var baseprice=bidvalue.productprice;
             console.log(baseprice);
           $localStorage.bidProducts.push(bidvalue);
           var userbidprice= $scope.userbidprice;
           console.log("user bid price is"+userbidprice);
           console.log("checking local Storage stuff"+JSON.stringify($localStorage.bidProducts));
          /*  if(userbidprice>baseprice)
            {
                $http({
                    method:'post',
                    url:'/userbid',
                     data:{
                          "userbidprice":userbidprice,
                           "productid":bidvalue.productid

                     }
                     }).success(function(res) {
                    console.log(res);
                      }).error(function(error){
                         console.log(error);
                     })
            }*/
       }
   })

     myApp.controller('logoutcontroller',function($scope,$http){

      $scope.logout=function(){
          $http({
              method:'get',
              url:'/logout'

          }).success(function(res){
              console.log(res);
              if(res=="logout"){
                  window.location.assign('/');
              }
          })
      }


  })

//add controller
myApp.controller('add',function($scope,$http,$state){

    $scope.loadadvertisement=function(){

         $state.go('advertisement');

    }
})

myApp.controller('product',function($scope,$http,$localStorage){
    $scope.getProduct=function(product){
         $localStorage.cartProducts.push(product);
    }
})

myApp.controller('cartcontroller',function($scope,$localStorage){
    //for loading the cart
      $scope.loadCart=function(){
          console.log($localStorage.cartProducts);
          //console.log("value fucking is"+JSON.stringify($localStorage.cartProducts[0].productid));
          //console.log("testing looping");
          $localStorage.cartProducts.forEach(function(arrayItem){
              console.log(arrayItem.productid);
          })
          $scope.cartData=$localStorage.cartProducts;
          console.log("length of cart is"+$localStorage.cartProducts.length);
      }
      //for deleting from cart
     $scope.deleteItem=function(value){
          var id=value.productid;
         $localStorage.cartProducts.forEach(function(arrayItem){
             console.log(arrayItem.productid);
             if(id==arrayItem.productid){
                 console.log("inside if loop");
                 var index=$localStorage.cartProducts.indexOf(value);
                 console.log("index is"+ index);
                 $localStorage.cartProducts.splice(index,1);
             }
         })
         console.log(" after deletion cart length is"+$localStorage.cartProducts.length);

         /*$scope.calculateTotal(x)*/


     }
    $scope.totalprice=0;
    var arr=[];
    var i=0;
    var quantityArray=[];

    $scope.calculateTotal=function(x,value){
        console.log(value);
        $scope.quantitySelc = x;
        quantityArray[i]=x;
        arr[i]=value.productprice*$scope.quantitySelc;
        console.log("checking "+arr[i]);
        i=i+1;
        var sum=0;
        for(i=0;i<arr.length;i++)
        {
            sum=sum+arr[i];
        }
        console.log("total sum is "+sum);
        $scope.totalprice=sum;
        console.log("updating quantity");
        var index=$localStorage.cartProducts.indexOf(value);
        console.log($localStorage.cartProducts[index]);
        $localStorage.cartProducts[index].quantity=$localStorage.cartProducts[index].quantity-$scope.quantitySelc;
        console.log("updated value is "+$localStorage.cartProducts[index].quantity);
          //works but not effective
        /*$localStorage.cartProducts.forEach(function(arrayItem){
            console.log($scope.quantitySelc);
            $scope.totalprice= $scope.totalprice+arrayItem.productprice*$scope.quantitySelc;
            console.log($scope.totalprice);
        })*/

        console.log("checking quantity array" );
        for(i=0;i<quantityArray.length;i++)
        {
            console.log(quantityArray[i]);
        }

    }




})


//posting add to database
myApp.controller('advertisementcontainer',function($scope,$http){
    $scope.postadd=function(){
        $http({
            method:'post',
            url:'/postadd',
            data:{
                "productname":$scope.productname,
                 "productdescription":$scope.productdescription,
                 "sellerinformation":$scope.sellerinformation,
                 "productprice":$scope.productprice,
                  "quantity":$scope.quantity,
                  "selleremail":$scope.selleremail
            }
        }).success(function(res){
            console.log(res);
        }).error(function(err){
            console.log(err);
        })
    }

})






//validating card controller and posting data

myApp.controller('cardController',function($scope,$http,$state,$localStorage){

    $scope.validateCard=function(){
        console.log($scope.creditCardNumber);
        var number=$scope.creditCardNumber;
        var pattern=/^[0-9]{16,20}$/
        if(number.match(pattern)){
            var cvvpattern=/^[0-9]{3}$/
             if(($scope.cvv).match(cvvpattern)){
                console.log("card verified");
             }
              else{
                     $scope.cvvvalue="please check your cvv";
                  }
        }
        else{
                  $scope.cardnumbervalue="please check your entered card number";
        }



        //posting the order values  into database once the

        $localStorage.cartProducts.forEach(function(arrayItem)
        {
            $http({
                method: 'post',
                url: '/postorder',
                data: {
                    "productid": arrayItem.productid,
                     "productdescription":arrayItem.productdescription,
                     "productprice":arrayItem.productprice,
                      "quantity":arrayItem.quantity
                }
            }).success(function(res) {
                console.log(res);
                console.log("emptying the cart once the order is posted");
                $localStorage.cartProducts=[];

            }).error(function(err){
                console.log(err);
        })
        })
    }
})

myApp.controller('ordercontroller',function($scope,$http,$state,$localStorage){
    $scope.loadOrders=function(){
        $http({
            method:'get',
            url:'/retrieveOrders'
        }).success(function(res){
            console.log(res);
            console.log("over here");
            $scope.orderSummary=res;
        }).error(function(err){
            console.log(err);
        })

    }

    $scope.loadSoldProducts=function() {

        $http({
            method:'get',
            url:'/getSoldProducts'
        }).success(function(res){
            console.log(res);
            $scope.soldproducts=res;
        }).error(function(error){
            console.log(error);
        })

    }

})

myApp.controller('bidpage',function($scope,$http,$localStorage){

    $scope.getBidProducts=function() {
        var d = new Date();

        var curr_date = d.getDate()-4;
        var curr_date1 = d.getDate();

        var curr_month = d.getMonth();

        var curr_year = d.getFullYear();

        var date=curr_year + "-" + curr_month + "-" +curr_date+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        var date1=curr_year + "-" + curr_month + "-" +curr_date1+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        $scope.bidstartdate=date;
        $scope.bidenddate=date1;

        console.log("in here");
        console.log($localStorage.bidProducts);
        $scope.bidProductdata = $localStorage.bidProducts;
    }

    $scope.bidProduct=function(bidvalue,userbidprice){
        var baseprice=bidvalue.productprice;
        var biduserprice=userbidprice;
        console.log(baseprice);
        console.log(biduserprice);
        if(baseprice>=biduserprice)
        {
            console.log("not correct");
            $scope.result="User should bid morethan base price";
        }
    }
})
