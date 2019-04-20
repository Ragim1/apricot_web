(function ($) {
    "use strict";

    /*[ Load page ]
      ===========================================================*/
    $(".animsition").animsition({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 1500,
        outDuration: 800,
        linkElement: ".animsition-link",
        loading: true,
        loadingParentElement: "html",
        loadingClass: "animsition-loading-1",
        loadingInner: '<div data-loader="ball-scale"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ["animation-duration", "-webkit-animation-duration"],
        overlay: false,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "html",
        transition: function (url) {
            window.location.href = url;
        }
    });

    /*[ Back to top ]
      ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css("display", "flex");
        } else {
            $("#myBtn").css("display", "none");
        }
    });

    $("#myBtn").on("click", function () {
        $("html, body").animate({
                scrollTop: 0
            },
            300
        );
    });

    /*[ Show header dropdown ]
      ===========================================================*/
    $(".js-show-header-dropdown").on("click", function () {
        $(this)
            .parent()
            .find(".header-dropdown");
    });

    var menu = $(".js-show-header-dropdown");
    var sub_menu_is_showed = -1;

    for (var i = 0; i < menu.length; i++) {
        $(menu[i]).on("click", function () {
            if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
                $(this)
                    .parent()
                    .find(".header-dropdown")
                    .toggleClass("show-header-dropdown");
                sub_menu_is_showed = -1;
            } else {
                for (var i = 0; i < menu.length; i++) {
                    $(menu[i])
                        .parent()
                        .find(".header-dropdown")
                        .removeClass("show-header-dropdown");
                }

                $(this)
                    .parent()
                    .find(".header-dropdown")
                    .toggleClass("show-header-dropdown");
                sub_menu_is_showed = jQuery.inArray(this, menu);
            }
        });
    }

    $(".js-show-header-dropdown, .header-dropdown").click(function (event) {
        event.stopPropagation();
    });

    $(window).on("click", function () {
        for (var i = 0; i < menu.length; i++) {
            $(menu[i])
                .parent()
                .find(".header-dropdown")
                .removeClass("show-header-dropdown");
        }
        sub_menu_is_showed = -1;
    });

    /*[ Fixed Header ]
      ===========================================================*/
    var posWrapHeader = $(".topbar").height();
    var header = $(".container-menu-header");

    $(window).on("scroll", function () {
        if ($(this).scrollTop() >= posWrapHeader) {
            $(".header1").addClass("fixed-header");
            $(header).css("top", -posWrapHeader);
        } else {
            var x = -$(this).scrollTop();
            $(header).css("top", x);
            $(".header1").removeClass("fixed-header");
        }

        if ($(this).scrollTop() >= 200 && $(window).width() > 992) {
            $(".fixed-header2").addClass("show-fixed-header2");
            $(".header2").css("visibility", "hidden");
            $(".header2")
                .find(".header-dropdown")
                .removeClass("show-header-dropdown");
        } else {
            $(".fixed-header2").removeClass("show-fixed-header2");
            $(".header2").css("visibility", "visible");
            $(".fixed-header2")
                .find(".header-dropdown")
                .removeClass("show-header-dropdown");
        }
    });

    /*[ Show menu mobile ]
      ===========================================================*/
    $(".btn-show-menu-mobile").on("click", function () {
        $(this).toggleClass("is-active");
        $(".wrap-side-menu").slideToggle();
    });

    var arrowMainMenu = $(".arrow-main-menu");

    for (var i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on("click", function () {
            $(this)
                .parent()
                .find(".sub-menu")
                .slideToggle();
            $(this).toggleClass("turn-arrow");
        });
    }

    $(window).resize(function () {
        if ($(window).width() >= 992) {
            if ($(".wrap-side-menu").css("display") == "block") {
                $(".wrap-side-menu").css("display", "none");
                $(".btn-show-menu-mobile").toggleClass("is-active");
            }
            if ($(".sub-menu").css("display") == "block") {
                $(".sub-menu").css("display", "none");
                $(".arrow-main-menu").removeClass("turn-arrow");
            }
        }
    });

    /*[ remove top noti ]
      ===========================================================*/
    $(".btn-romove-top-noti").on("click", function () {
        $(this)
            .parent()
            .remove();
    });

    /*[ Block2 button wishlist ]
      ===========================================================*/
    $(".block2-btn-addwishlist").on("click", function (e) {
        e.preventDefault();
        $(this).addClass("block2-btn-towishlist");
        $(this).removeClass("block2-btn-addwishlist");
        $(this).off("click");
    });

    /*[ +/- num product ]
      ===========================================================*/
    $(".btn-num-product-down").on("click", function (e) {
        e.preventDefault();
        var numProduct = Number(
            $(this)
            .next()
            .val()
        );
        if (numProduct > 1)
            $(this)
            .next()
            .val(numProduct - 1);
    });

    $(".btn-num-product-up").on("click", function (e) {
        e.preventDefault();
        var numProduct = Number(
            $(this)
            .prev()
            .val()
        );
        $(this)
            .prev()
            .val(numProduct + 1);
    });

    /*[ Show content Product detail ]
      ===========================================================*/
    $(".active-dropdown-content .js-toggle-dropdown-content").toggleClass(
        "show-dropdown-content"
    );
    $(".active-dropdown-content .dropdown-content").slideToggle("fast");

    $(".js-toggle-dropdown-content").on("click", function () {
        $(this).toggleClass("show-dropdown-content");
        $(this)
            .parent()
            .find(".dropdown-content")
            .slideToggle("fast");
    });

    /*[ Play video 01]
      ===========================================================*/
    var srcOld = $(".video-mo-01")
        .children("iframe")
        .attr("src");

    $('[data-target="#modal-video-01"]').on("click", function () {
        $(".video-mo-01").children("iframe")[0].src += "&autoplay=1";

        setTimeout(function () {
            $(".video-mo-01").css("opacity", "1");
        }, 300);
    });

    $('[data-dismiss="modal"]').on("click", function () {
        $(".video-mo-01").children("iframe")[0].src = srcOld;
        $(".video-mo-01").css("opacity", "0");
    });

    $(".add_to_cart").on("click", function () {
        var name = $(this)
            .closest(".container")
            .find(".product-detail-name")
            .text();
        var price = $(this)
            .closest(".container")
            .find(".m-text17")
            .text();
        var size = $(this)
            .closest(".container")
            .find(".selection-2_size")
            .val();
        var color = $(this)
            .closest(".container")
            .find(".selection-2_color")
            .val();
        // $.trim(name);
        console.log($.trim(name) + " " + $.trim(price) + " " + size + " " + color);
        debugger;
    });

    $(".btn-addcart-product-detail").each(function () {
        var nameProduct = $(".product-detail-name").html();
        $(this).on("click", function () {
            swal(nameProduct, "will be dileverd to you soon!", "success");
        });
    });

    $(".block2-btn-addcart").each(function () {
        var nameProduct = $(this)
            .parent()
            .parent()
            .parent()
            .find(".block2-name")
            .html();
        $(this).on("click", function () {
            // debugger;
            var img = $(this)
                .parent()
                .parent()
                .parent()
                .find(".image")
                .attr("src");
            // console.log(img);
            // swal(nameProduct, "is added to cart !", "success");
            swal({
                icon: img,
                imageHeight: 500,
                imageAlt: "A tall image"
            });
        });
    });

    $(".slick3-dot-overlay").on("click", function () {
        debugger;
        // var img_src = $(this.previousSibling.attributes.src.textContent);
        // console.log(img_src);

        // $(".product-detail-name").text(
        //   this.previousSibling.attributes.src.textContent
        // );
        var str = this.previousSibling.attributes.src.textContent;
        var n = str.replace("images/", "");
        var m = n.replace(".jpg", "");
        if (m.search("H_") == 0) {

            alert("hoodies");
        }
        $(".product-detail-name").text(m);
    });
    $(".block2-btn-addwishlist").each(function () {
        var nameProduct = $(this)
            .parent()
            .parent()
            .parent()
            .find(".block2-name")
            .html();
        $(this).on("click", function () {
            swal(nameProduct, "will be delivered to you soon!", "success");
            // swal(nameProduct, "is added to wishlist !", "success");
        });
    });

    $(".add-to-cart").on("click", function () {
        debugger
        var name = $(this).closest('.item-slick2').find('.product-detail-name').text();
        var price = $(this).closest('.item-slick2').find('.product-detail-price').text();
        var image = $(this).closest('.item-slick2').find('.product-detail-image').attr("src");
        var qty = $(".header-icons").find(".header-icons-noti").text();

        // image = "images/item-cart-02.jpg";
        console.log(name.trimStart() + '   ' + price.trim());

        var myCart = "<li class='header-cart-item'>" +
            "<div class = 'header-cart-item-img' >" +
            "<img src = " + image + " alt = 'IMG' >" +
            "</div>" +
            "<div class = 'header-cart-item-txt' >" +
            "<a href = '#' class = 'header-cart-item-name' >" +
            name +
            "</a>" + "<span class = 'header-cart-item-info' > " +
            price + "</span>" + "</div >" + "</li>";
        $(".header-cart-wrapitem").append(myCart);

        $(".header-icons").find(".header-icons-noti").text(1);

        var total = $(".header-icons").find(".header-cart-total").text();
        total.replace("Total: Rs ", "0");
        console.log(total);
        total = "Total: " + price;
        $(".header-icons").find(".header-cart-total").text(total);




        console.log("name=" + name + " qunatity=" + qty + " price=" + price + " total=" + total + " image=" + image);
        var myObjs = [];
        var myObj = {
            "name": name,
            "qty": qty,
            "price": price,
            "total": total,
            "image": image
        };

        myObjs.push(myObj)
        console.log("this is my objects" + myObjs);
        var myJSON = JSON.stringify(myObjs);
        console.log("stringyfied= " + myJSON);
        //		myJSON.push(myJSON);
        localStorage.setItem("sentJSON", myJSON);
        console.log("length in local storage=" + localStorage.length);

        //Retrieving data:
        var text = localStorage.getItem("sentJSON");
        var obj = JSON.parse(text);
        //console.log(obj);
        debugger
        document.getElementsByClassName("show_name").text = obj.name;
        console.log(obj.length);
        var tot = 0;
        for (i = 0; i < obj.length; i++) {
            var addDivs = "<div class='row table'>" + "<div class='col-lg-3 show_name'>" +
                obj[i].qty + "</div>" + "<div class = 'col-lg-3 show_price ' >" + obj[i].price +
                " </div>" + " <div class = 'col-lg-3 show_image' > " +
                "<img src='" + obj[i].image + "' width='100px' height='100px' alt='no image'>" + "</div>" + "</div>"
            $('.cartList').append(addDivs);
            tot += obj[i].total;
            console.log(tot);
            $('.set_total').text(obj[i].total);
        }
        $('.set_total').text(tot);


    });

    //Retrieving data:
    var text = localStorage.getItem("sentJSON");
    var obj = JSON.parse(text);
    console.log(obj);
    console.log(obj.length);
    for (i = 0; i < obj.length; i++) {

        var addDiv = "		<tr class='table-row'>" +
            "<td class = 'column-1' >" +
            "<div class = 'cart-img-product b-rad-4 o-f-hidden' >" +
            "<img src = " + obj[i].image + " alt = 'IMG - PRODUCT ' >" +
            "</div>" + "</td>" +
            "<td class = 'column-2' >" + obj[i].name + "</td>" +
            "<td class = 'column-3' >" + obj[i].price + "</td>" +
            "<td class = 'column-4' >" + "<div class = 'flex-w bo5 of-hidden w-size17' >" +
            "<button class = 'btn-num-product-down color1 flex-c-m size7 bg8 eff2' >" +
            "<i class = 'fs-12 fa fa-minus' aria-hidden = 'true' >" + "</i>" + " </button>" +

            "<input class = 'size8 m-text18 t-center num-product' type = 'number' name = 'num-product1' value = " + obj[i].qty + " >" +
            "<button class = 'btn-num-product-up color1 flex-c-m size7 bg8 eff2' >" +
            "<i class = 'fs-12 fa fa-plus' aria-hidden = 'true' >" + "</i>" + "</button >" + "</div>" + "</td>" +
            "<td class = 'column-5' >" + obj[i].total + "</td> </tr > ";

        var addDivs = "<div class='row table'>" + "<div class='col-lg-3 show_name'>" +
            obj[i].qty + "</div>" + "<div class = 'col-lg-3 show_price ' >" + obj[i].price +
            " </div>" + " <div class = 'col-lg-3 show_image' > " +
            "<img src='" + obj[i].image + "' width='100px' height='100px' alt='no image'>" + "</div>" + "</div>"
        $('.table-shopping-cart').append(addDiv);
        tot += obj[i].total;
        console.log(tot);
        $('.set_total').text(obj[i].total);
    }
    $('.cart-total').text(obj.total);


    // $(".form_phone").keyup(function () {
    //     var total = 10;
    //     var this_number = $(this).val();
    // debugger
    //     print(this_number);
    //     if (total == this_number) {
    //         alert("okey number");
    //     }
    // });

    // $(function () {
    //     $(".gform").validate({
    //         rules: {
    //             phone: {
    //                 required: true,
    //                 range: [10, 10]
    //             }
    //         }
    //     });
    // });

    // function getValidNumber(value) {
    //     value = $.trim(value).replace(/\D/g, "");

    //     if (value.substring(0, 1) == "1") {
    //         value = value.substring(1);
    //     }

    //     if (value.length == 10) {
    //         return value;
    //     }

    //     return false;
    // }
    // var num = getValidNumber("(123) 456-7890");
    // if (num !== false) {
    //     alert("The valid number is: " + num);
    // } else {
    //     alert("The number you passed is not a valid US phone number");
    // }
})(jQuery);
