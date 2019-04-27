  // Hide and Show Cart Items
  $(document).ready(function () {
    $(".cp-openCloseCart").click(function (event) {
     event.stopPropagation();
     $("#cp-shoppingCart").toggle();
   });

   $(document).click(function () {
     $("#cp-shoppingCart").hide();
   });
   $('.cpitemQuantity').bind('keyup mouseup',function(){
     getGrandTotal();
   });
   // Add Item to Cart
   $(".cp-AddToCart").click(function () {
     // Remove break lines in text
     var cpitemname = $(this).parent().find(".cp-itemName").text().toString().trim();
     // Calculate Total Price
     var cpPrice = parseFloat($(this).parent().find(".cp-price").text());
     var cpitemqty = parseInt($(this).parent().find("#cp-itemQuantity").val());
     var cpitemimg = $(this).parent().find(".cp-itemImage").attr("src"); 
     var cpitemid = parseInt($(this).parent().find("#cpitem-id").val());
     var discount = $(this).parent().find('.discount').text();
     var cptotalprice = cpitemqty * cpPrice;
    
     // Prepare carts data to set in localstorage
     cartsData = {
       cpid: cpitemid,
       cpname: cpitemname,
       cpqty: cpitemqty,
       cpunitprice: cpPrice,
       cpprice: cptotalprice,
       cpimage: cpitemimg,
       discount: discount,
     };
     // Check if products are added to carts previously
    //  var availableCartsData = localStorage.getItem("cartsJSON");
    //  var cartsJSON;
    //  if(availableCartsData){
    //    var cartsJSONData = JSON.parse(availableCartsData);
    //    cartsJSON = cartsJSONData['carts'];
    //  }else{
    //    cartsJSON = [];
    //  }
    //  cartsJSON.push(cartsData);
    //  var localCartsJson = JSON.stringify({ carts: cartsJSON })
    //  localStorage.setItem("cartsJSON", localCartsJson);
    //  console.log(localCartsJson);
  
     cpAppendToCart($(this), cartsData);
     cartitemcount();
  //    
  //   var cpCartsData = localStorage.getItem("cartsJSON");
  //   var cpCarts = JSON.parse(cpCartsData);
  //   var cpCartsObj = cpCarts['carts'];
  //   id = parseInt($(this).parent().find("#cpitem-id").val());
  //   qty =  parseInt($(this).parent().find("#cp-itemQuantity").val());
  //   newCartsObj = [];
  //   $(cpCartsObj).each(function(index, val){
  //     var itemId = val.cpid;
  //     var newObj = val;
  //     if (id == itemId){
  //       var newqty= qty;
  //       newObj['cpqty'] += newqty;
  //     }else{
  //       newObj = val;
  //     }
  //     newCartsObj.push(newObj);
  //   });
  //   localStorage.setItem("cartsJSON", JSON.stringify({ carts: newCartsObj }));
 });
 $('#cp-empty_cart').on("click",function(){
   cpRemoveItemFromCart(this);
 });
 cartitemcount();
 $('.place_order_btn').on('click',function(){
    // cpRemoveItemFromCart(this);
    debugger
    popUpFunc();
 });
});

function getGrandTotal(){
 var cpCartsData = localStorage.getItem("cartsJSON");
 var cpCarts = JSON.parse(cpCartsData);
 var cpCartsObj = cpCarts['carts'];
 var grandtotal = 0;
 jQuery.each( cpCartsObj, function(index, val) {
   grandtotal +=  val['cpprice'];
 });
 return grandtotal;
}

$(document).on('keyup change','.cpqty', function () {  
  
   newprice = parseFloat($(this).parent().siblings('.unitprice').text()) * parseInt(this.value);
   $(this).parent().siblings('.price').text(newprice);
   total = 0;
   $('.price').each(function(index, val){
     total += parseFloat(val.textContent);
   });
   $("#cpsettotal").text(total);
   
   var cpCartsData = localStorage.getItem("cartsJSON");
   var cpCarts = JSON.parse(cpCartsData);
   var cpCartsObj = cpCarts['carts'];
   cpId = parseInt($(this).siblings('#cpitem-id').val());
   cpQty = parseInt($(this).val());
   newCartsObj = [];
   $(cpCartsObj).each(function(index, val){
     
     var itemId = val.cpid;
     var newObj = val;
     if (cpId == itemId){
       newObj['cpqty'] = cpQty;
       newObj['cpprice'] = newprice;
     }else{
       newObj = val;
     }
     newCartsObj.push(newObj);
   });
   localStorage.setItem("cartsJSON", JSON.stringify({ carts: newCartsObj }));
   console.log(newCartsObj);
});
function cartitemcount(){
 var cpCartsData = localStorage.getItem("cartsJSON");
 if(cpCartsData == null){    
   $('#cp-cartTitle').text('Your cart is empty');
   $('#cp-itemCount').text(itemcount).css("display", "none");
   $('#cp-empty_cart').css("display","none");
   $('#cp-view_cart').css("display","none");
 }
 else{
   var cpCarts = JSON.parse(cpCartsData);
   var cpCartsObj = cpCarts['carts'];
   var itemcount = cpCartsObj.length;
   $('#cp-cartTitle').text('Items in your Cart');
   $('#cp-itemCount').text(itemcount).css("display", "block");
   $('#cp-empty_cart').css("display","inline-block");
   $('#cp-view_cart').css("display","inline-block");
 }
}


function cpAppendToCart(element, cartsData={}){
  id = parseInt(element.parent().find("#cpitem-id").val());
  qty =  parseInt(element.parent().find("#cp-itemQuantity").val());
  var cpCartsData = localStorage.getItem("cartsJSON");
  var cpCartsObj;
  if(cpCartsData){
    var cpCarts = JSON.parse(cpCartsData);
    cpCartsObj = cpCarts['carts'];
    // Check whether it is new data or not
    var itemIds = cpCartsObj.map(function(value) {
      return value.cpid;
    });
    var newItem = false;
    for(var i=0; i<itemIds.length; i++){
      var id = itemIds[i];
      function isInArray(id, itemIds) {
        return itemIds.indexOf(id) > -1;
      }
      if(!isInArray(cartsData.cpid, itemIds)){
        newItem = true;
      }
      // if(itemIds.includes(cartsData.cpid)){
      //   newItem = true;
      // }
      // if(id != cartsData.cpid){
      //   newItem = true;
      //   break;
      // }
    }
    
    if (newItem){
      cpCartsObj.push(cartsData);
      localStorage.setItem("cartsJSON", JSON.stringify({ carts: cpCartsObj }));
    }else{
      newCartsObj = [];
      $(cpCartsObj).each(function(index, val){
        
        var itemId = val.cpid;
        var newObj = val;
        if (id == itemId){
          newObj['cpqty'] += qty;
          
        }else{
          newObj = val;
        }
        newCartsObj.push(newObj);
      });
      localStorage.setItem("cartsJSON", JSON.stringify({ carts: newCartsObj }));

    }
    }else{
      cpCartsObj = [];  
      cpCartsObj.push(cartsData);
      localStorage.setItem("cartsJSON", JSON.stringify({ carts: cpCartsObj }));
    }
  console.log('=================================')
  console.log(localStorage.getItem("cartsJSON"));
  $('#cp-cartItems').empty();

  
  cpCartsData = localStorage.getItem("cartsJSON");
  if (cpCartsData){
    cpCarts = JSON.parse(cpCartsData);
    cpCartsObj = cpCarts['carts'];
    for (i = 0; i < cpCartsObj.length; i++) {
      var cpAddDivs =
      "<div class='cp-itemDetails media'>" +
      "<img class='img-thumbnail' width='70px' height='70px' src='" + cpCartsObj[i].cpimage + "' alt=''>" +
      "<div class='card-body'>"+
      "<p class='cp-itemName'>" + cpCartsObj[i].cpname + "</p>"
      +"<p>"+"Price&nbsp;:&nbsp;" +"<span>" + cpCartsObj[i].cpprice +"</span>" +"</p>"+
      "<p>"+"Quantity&nbsp;:&nbsp;" + cpCartsObj[i].cpqty + "</p>"+
      "</div>" +
      "</div>";
      $('#cp-cartItems').append(cpAddDivs);
    }
  }
}
function popUpFunc() {
debugger
  setInterval(function () {
    debugger
     var myWindow = window.open("", "_blank", "width=200,height=100");
     myWindow.document.write("<div style=' border: 2px black solid;background-color: blue;width: 200px;height: 200px;'>This is MsgWindow</div>")
      setTimeout(function(){
       myWindow.close();
      },10000)

  }, 10000)
}
function cpRemoveItemFromCart(){
   cpitemCount = 0;
   cpPriceTotal = 0;

   $("#cp-itemCount").css("display", "none");
   $("#cp-cartItems").text("");
   $("#cp-cartTotal").text("Total: Rs." + cpPriceTotal);
   localStorage.clear();
   location.reload();
}

$(document).ready(function () {
 var cpCartsData = localStorage.getItem("cartsJSON");
 var cpCarts = JSON.parse(cpCartsData);
 if(cpCarts != null){
   var cpCartsObj = cpCarts['carts'];
   for (i = 0; i < cpCartsObj.length; i++) {
     var cpAddDivs =
     "<div class='cp-itemDetails media'>" +
     "<img class='img-thumbnail' width='70px' height='70px' src='" + cpCartsObj[i].cpimage + "' alt=''>" +
     "<div class='card-body'>"+
     "<p class='cp-itemName'>" + cpCartsObj[i].cpname + "</p>"
         +"<p>"+"Price&nbsp;:&nbsp;" +"<span>" + cpCartsObj[i].cpprice +"</span>" +"</p>"+
       "<p>"+"Quantity&nbsp;:&nbsp;" + cpCartsObj[i].cpqty + "</p>"+
       "</div>" +
     "</div>";
     $('#cp-cartItems').append(cpAddDivs);
   }
 }
});


//For Product Slider
$(document).ready(function() {
 var sync1 = $("#sync1");
 var sync2 = $("#sync2");

 $('#sync1').owlCarousel({
   singleItem : true,
   autoPlay : true,
   slideSpeed : 1000,
   navigation: false,
   pagination:false,
   afterAction : syncPosition,
   responsiveRefreshRate : 200,
 });

 $('#sync2').owlCarousel({
   items : 5,
   itemsDesktop      : [1199,10],
   itemsDesktopSmall     : [979,10],
   itemsTablet       : [768,8],
   itemsMobile       : [479,4],
   pagination:false,
   responsiveRefreshRate : 100,
   afterInit : function(el){
     el.find(".owl-item").eq(0).addClass("synced");
   }
 });

 function syncPosition(el){
   var current = this.currentItem;
   $("#sync2")
     .find(".owl-item")
     .removeClass("synced")
     .eq(current)
     .addClass("synced")
   if($("#sync2").data("owlCarousel") !== undefined){
     center(current)
   }
 }

 $("#sync2").on("click", ".owl-item", function(e){
   e.preventDefault();
   var number = $(this).data("owlItem");
   sync1.trigger("owl.goTo",number);
 });

 function center(number){
   var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
   var num = number;
   var found = false;
   for(var i in sync2visible){
     if(num === sync2visible[i]){
       var found = true;
     }
   }

   if(found===false){
     if(num>sync2visible[sync2visible.length-1]){
       sync2.trigger("owl.goTo", num - sync2visible.length+2)
     }else{
       if(num - 1 === -1){
         num = 0;
       }
       sync2.trigger("owl.goTo", num);
     }
   } else if(num === sync2visible[sync2visible.length-1]){
     sync2.trigger("owl.goTo", sync2visible[1])
   } else if(num === sync2visible[0]){
     sync2.trigger("owl.goTo", num-1)
   }
   
 }

});











