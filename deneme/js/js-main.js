$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
$(function () {
    $("img.lazy").lazyload({
        threshold: 250
    });
});


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
$(".myReferences").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    prevArrow: $(".slickPrev"),
    nextArrow: $(".slickNext"),
    autoplay: true,
    responsive: {
        breakpoint: 768,
        settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }
});
$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 200, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});


$("#couponBtn").click(function(e) {
    e.preventDefault()
    let input = $("#couponInput")
    let coupon = input.val()
    let totalPrice = atob($("#totalPrice").attr('data-price'))
    if(typeof coupon === 'undefined' || coupon === '') return Swal.fire('Hata!', 'Lütfen bir kupon kodu giriniz!', 'error')
    $.ajax({
        type: 'POST',
        url: '/Main_Ajax/couponCheck',
        data: {coupon: coupon, totalPrice: totalPrice},
        success: function(res) {
            res = res.trim()
            if(res === 'no_coupon') {
                Swal.fire('Hata!', 'Kupon bulunamadı!', 'error')
            }else if(res === 'no_usage_left'){
                Swal.fire('Hata!', 'Bu kuponun kullanım hakkı kalmadı!', 'error')
            }else if(res === 'min_price_not_reached') {
                Swal.fire('Hata!', 'Bu kuponun kullanımı için minimum fiyatı aşmadınız!', 'error')
            } else {
                let data = JSON.parse(res)
                let price = $("#totalPrice")
                let balance = parseFloat($("#couponBtn").attr('data-user'))
                let payWithBalance = document.getElementById('payWithBalance')
                price.html("<sup class='text-danger h6' style='text-decoration: line-through'>"+totalPrice+"₺</sup> <span id='lastPrice'>"+data.discountedPrice.toFixed(2)+"</span>₺")
                price.attr('data-price', btoa(data.discountedPrice))
                document.getElementById("removeCoupon").classList.remove('d-none')
                document.getElementById("couponBtn").classList.add('d-none')
                // kullanıcının bakiyesi yüksekse bakiye ile ödeyebilsin
                if(balance >= data.discountedPrice) {
                    payWithBalance.classList.remove('d-none')
                    payWithBalance.classList.add('d-block')
                }else {
                    payWithBalance.classList.remove('d-block')
                    payWithBalance.classList.add('d-none')
                }
                Swal.fire('Başarılı!',"Kupon başarıyla uygulandı!", 'success')
            }
        }
    })
})
$("#removeCoupon").click(function(e) {
    e.preventDefault()
    let price = $("#totalPrice")
    let stabile = atob(price.attr('data-stabile'))
    let balance = parseFloat($("#removeCoupon").attr('data-user'))
    let payWithBalance = document.getElementById('payWithBalance')
    price.html(stabile.toLocaleString('tr-TR')+"₺")
    price.attr('data-price', btoa(stabile))
    document.getElementById("removeCoupon").classList.add('d-none')
    document.getElementById("couponBtn").classList.remove('d-none')
    stabile = parseFloat(stabile)
    if( stabile >= balance) {
        payWithBalance.classList.remove('d-block')
        payWithBalance.classList.add('d-none')
    }
    $.post('/Main_Ajax/deleteCoupon')
})
$(".addToCart").click( async function (e) {
    e.stopPropagation()
    let data = atob(this.getAttribute('data-product')).split("_")
    let productID = data[0]
    let productName = this.getAttribute('data-name')
    let productPrice = parseFloat(data[1])
    let productStock = data[2]
    let productStockType = parseInt(data[3])
    let license = false;
    let licenseType = false;
    let qty = parseInt(document.getElementById(productID).value)
    if(productStock !== "-1") {
        productStock = parseInt(productStock)
    }
    if (qty === 0) {
        Swal.fire(
            'Hata!',
            'Lütfen bir adet seçiniz!',
            'error'
        )
        return false
    }
    if (productStock === 0) {
        Swal.fire(
            'Hata!',
            'Bu ürünün stoğu tükenmiş!',
            'error'
        )
        return false
    }
    if (productStock >= qty || productStock === "-1") {
        if(productStockType === 3) { // Eğer lisanslıysa
            const {value: type} = await Swal.fire({
                title: 'Tür Seçin',
                input: 'select',
                inputOptions: {
                    'domain': 'Alan Adı',
                    'ip': 'IP Adresi'
                },
                inputPlaceholder: 'Lisans Türü Seçin',
                showCancelButton: true,
            });
            if(type) {
                if(type === 'domain') {
                    const {value: domain} = await Swal.fire({
                        title: 'Alan adınızı girin',
                        input: 'text',
                        inputLabel: 'Alan adınızı girin.',
                    })

                    if (domain) {
                        $.post({
                            url: '/Main_Ajax/domainCheck',
                            data: {'domain': domain, 'productID': productID}
                        }).then((res) => {
                            res = res.trim()
                            console.log(res)
                            if (res === 'domain_available') {
                                license = domain
                                licenseType = 'domain'
                                return $.ajax({
                                    type: 'POST',
                                    url: '/ShoppingCart/add',
                                    data: {
                                        id: productID,
                                        name: productName,
                                        price: productPrice,
                                        qty,
                                        license,
                                        licenseType,
                                    },
                                    success: function(res) {
                                        res = res.trim()
                                        if(res === 'product_not_found'){
                                            Swal.fire(
                                                'Hata!',
                                                'Ürün bulunamadı!',
                                                'error'
                                            )
                                        }else if(res === 'success') {
                                            Swal.fire(
                                                'Başarılı!',
                                                'Ürün sepete eklendi!',
                                                'success'
                                            )
                                            let icon = $("#myCartIcon")
                                            $("#cartCount").load(location.href + " #cartCount")
                                            icon.addClass("bx-tada")
                                            setTimeout(function() {
                                                icon.removeClass('bx-tada')
                                            }, 3000)
                                        }else if(res === 'verify_email') {
                                            Swal.fire('Hata', 'Lütfen e-posta adresinizi doğrulayın.', 'error')
                                        }
                                        else {
                                            Swal.fire(
                                                'Hata!',
                                                res,
                                                'error'
                                            )
                                        }
                                    }
                                })
                            } else if (res === 'domain_invalid') {
                                Swal.fire(
                                    'Hata!',
                                    'Geçersiz alan adı girdiniz!',
                                    'error'
                                )
                            } else if (res === 'domain_in_use') {
                                Swal.fire(
                                    'Hata!',
                                    'Bu alan adı başkası tarafından kullanılıyor!',
                                    'error'
                                )
                            } else {
                                Swal.fire(
                                    'Hata!',
                                    res,
                                    'error'
                                )
                            }
                        })
                    }
                }else if(type === 'ip') {
                    const {value: ip} = await Swal.fire({
                        title: 'IP adresinizi girin',
                        input: 'text',
                        inputLabel: 'IP adresinizi girin.',
                    })

                    if (ip) {
                        $.post({
                            url: '/Main_Ajax/ipCheck',
                            data: {'ip': ip, 'productID': productID},
                            success: function (res) {
                                res = res.trim()
                                if (res === 'ip_available') {
                                    license = ip
                                    licenseType = 'ip'
                                    $.ajax({
                                        type: 'POST',
                                        url: '/ShoppingCart/add',
                                        data: {
                                            id: productID,
                                            name: productName,
                                            price: productPrice,
                                            qty,
                                            license,
                                            licenseType
                                        },
                                        success: function(res) {
                                            res = res.trim()
                                            if(res === 'product_not_found'){
                                                Swal.fire(
                                                    'Hata!',
                                                    'Ürün bulunamadı!',
                                                    'error'
                                                )
                                            }else if(res === 'success') {
                                                Swal.fire(
                                                    'Başarılı!',
                                                    'Ürün sepete eklendi!',
                                                    'success'
                                                )
                                                let icon = $("#myCartIcon")
                                                $("#cartCount").load(location.href + " #cartCount")
                                                icon.addClass("bx-tada")
                                                setTimeout(function() {
                                                    icon.removeClass('bx-tada')
                                                }, 3000)
                                            }else {
                                                Swal.fire(
                                                    'Hata!',
                                                    res,
                                                    'error'
                                                )
                                            }
                                        }
                                    })
                                } else if (res === 'ip_invalid') {
                                    Swal.fire(
                                        'Hata!',
                                        'Geçersiz IP Adresi girdiniz!',
                                        'error'
                                    );
                                } else if (res === 'ip_in_use') {
                                    Swal.fire(
                                        'Hata!',
                                        'Bu IP Adresi başkası tarafından kullanılıyor!',
                                        'error'
                                    );
                                } else {
                                    Swal.fire(
                                        'Hata!',
                                        res,
                                        'error'
                                    );
                                }
                            }
                        })
                    }
                }
            }
        }else if(productStockType === 4) { // Eğer Seçenekliyse
            localStorage.setItem('answers', JSON.stringify([]));
            localStorage.setItem('fee', 0);
            function askQuestions(index) {
                Swal.fire({
                    title: questions[index].question + ` +${questions[index].extraFee}₺`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Hayır',
                    confirmButtonText: 'Evet'
                }).then(async (result)=> {
                    let getAnswers = JSON.parse(localStorage.getItem('answers'));
                    let fee = localStorage.getItem('fee');
                    if(result.isConfirmed) {
                        // Eğer onayladıysa
                        const { value: input } = await Swal.fire({
                            title: questions[index].inputQuestion,
                            input: 'text',
                            inputPlaceholder: 'Cevabınızı giriniz...',
                        })

                        if (input) {
                            getAnswers = [...getAnswers, {"questionId": questions[index].id, "question": questions[index].question, "answer": input, "fee": questions[index].extraFee}]
                            localStorage.setItem('answers', JSON.stringify(getAnswers));
                            localStorage.setItem('fee', parseFloat(fee) + parseFloat(questions[index].extraFee))
                        }
                    }
                    if (index < questions.length - 1) {
                        askQuestions(index + 1);
                    }
                    if(index + 1 === questions.length) {
                        $.ajax({
                            type: 'POST',
                            url: '/ShoppingCart/add',
                            data: {
                                id: productID,
                                name: productName,
                                price: productPrice,
                                fee: localStorage.getItem('fee'),
                                qty,
                                extra: localStorage.getItem('answers')
                            },
                            success: function(res) {
                                res = res.trim()
                                if(res === 'product_not_found'){
                                    Swal.fire(
                                        'Hata!',
                                        'Ürün bulunamadı!',
                                        'error'
                                    )
                                }else if(res === 'success') {
                                    Swal.fire(
                                        'Başarılı!',
                                        'Ürün sepete eklendi!',
                                        'success'
                                    )
                                    let icon = $("#myCartIcon")
                                    $("#cartCount").load(location.href + " #cartCount")
                                    icon.addClass("bx-tada")
                                    setTimeout(function() {
                                        icon.removeClass('bx-tada')
                                    }, 3000)
                                }else if(res === 'verify_email') {
                                    Swal.fire('Hata', 'Lütfen e-posta adresinizi doğrulayın.', 'error')
                                }
                                else {
                                    Swal.fire(
                                        'Hata!',
                                        res,
                                        'error'
                                    )
                                }
                            }
                        })
                    }
                });
            }
            askQuestions(0)
        }
        else { // Değilse [ 0 , 2 ]
            $.ajax({
                type: 'POST',
                url: '/ShoppingCart/add',
                data: {
                    id: productID,
                    name: productName,
                    price: productPrice,
                    qty,
                    license
                },
                success: function(res) {
                    res = res.trim()
                    if(res === 'product_not_found'){
                        Swal.fire(
                            'Hata!',
                            'Ürün bulunamadı!',
                            'error'
                        )
                    }else if(res === 'success') {
                        Swal.fire(
                            'Başarılı!',
                            'Ürün sepete eklendi!',
                            'success'
                        )
                        let icon = $("#myCartIcon")
                        $("#cartCount").load(location.href + " #cartCount")
                        icon.addClass("bx-tada")
                        setTimeout(function() {
                            icon.removeClass('bx-tada')
                        }, 3000)
                    }else if(res === 'verify_email') {
                        Swal.fire('Hata', 'Lütfen e-posta adresinizi doğrulayın.', 'error')
                    }
                    else {
                        Swal.fire(
                            'Hata!',
                            res,
                            'error'
                        )
                    }
                }
            })
        }
    } else {
        Swal.fire(
            'Hata!',
            'Stokta yeterli ürün yok!',
            'error'
        )
    }
})

$(".productDetails").on("click", function () {
    var product = atob(this.getAttribute("data-product"))
    var id = this.getAttribute('data-id')
    $.ajax({
        type: 'POST',
        url: '/Client_Ajax/productDetails',
        data: {'id': product, 'POid': id},
        success: function (res) {
            res = res.trim()
            if (res === 'product_not_found') {
                Swal.fire(
                    'Hata!',
                    'Böyle bir ürün bulunamadı!',
                    'error'
                );
            } else if (res === 'dont_have_product') {
                Swal.fire(
                    'Hata!',
                    'Bu ürüne sahip değilsiniz!',
                    'error'
                );
            } else {
                let json = JSON.parse(res)
                Swal.fire({
                    icon: 'info',
                    title: '<strong>' + json['name'] + '</strong>',
                    html: json['stockDetails'],
                    showCloseButton: true,
                    confirmButtonColor: "#3b82f6",
                    confirmButtonText:
                        'Tamam',
                })
            }
        }
    })
})

$(".removeComment").on("click", function () {
    let commentID = this.getAttribute("data-comment")
    if (commentID !== null) {
        $.ajax({
            type: 'POST',
            url: '/Client_Ajax/removeComment',
            data: {'id': commentID},
            success: function (res) {
                res = res.trim()
                if (res === 'error' || res === 'no_id_found') {
                    Swal.fire(
                        'Hata!',
                        'Bir sorun oluştu!',
                        'error'
                    );
                } else if (res === 'success') {
                    Swal.fire(
                        'Başarılı!',
                        'Yorum başarıyla silindi!',
                        'success'
                    );
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
            }
        })
    }
})
$("#newPassword").submit(function (e) {
    e.preventDefault();
    let currentPassword = $("#newPassword input[name='currentpassword']").val()
    let newPassword = $("#newPassword input[name='newpassword']").val()
    let RenewPassword = $("#newPassword input[name='renewpassword']").val()
    let csrf = $("#newPassword input[name='csrf-token']").val()
    if (newPassword === RenewPassword) {
        $.ajax({
            type: 'POST',
            url: '/Client_Ajax/newPassword',
            data: {
                'csrf-token': csrf,
                'currentPassword': currentPassword,
                'newPassword': newPassword,
                'reNewPassword': RenewPassword
            },
            success: function (res) {
                console.log(res)
                res = res.trim()
                if (res === 'error') {
                    Swal.fire(
                        'Hata!',
                        'Bir sorun oluştu!',
                        'error'
                    );
                } else if (res === 'csrf_error') {
                    Swal.fire(
                        'Hata!',
                        'Sistemsel bir sorun oluştu!',
                        'error'
                    );
                } else if (res === 'same_pass') {
                    Swal.fire(
                        'Hata!',
                        'Girdiğiniz şifre ile mevcut şifre aynı olamaz!',
                        'error'
                    );
                } else if (res === 'wrong_password') {
                    Swal.fire(
                        'Hata!',
                        'Yanlış şifre girdiniz!',
                        'error'
                    );
                } else if (res === 'success') {
                    Swal.fire(
                        'Başarılı!',
                        'Şifre başarıyla değiştirildi!',
                        'success'
                    );
                    setTimeout(function () {
                        window.location = '/hesap/giris-yap'
                    }, 2000)
                }else if(res === 'verify_email') {
                    Swal.fire('Hata', 'Lütfen e-posta adresinizi doğrulayın.', 'error')
                }
                else {
                    Swal.fire(
                        'Hata!',
                        res,
                        'error'
                    );
                }
            }
        })
    } else {
        Swal.fire(
            'Hata!',
            'Şifreler uyuşmuyor!',
            'error'
        );
    }
})
$("#accountChange").submit(function (e) {
    e.preventDefault()
    let firstname = $("#accountChange input[name='firstname']").val()
    let lastname = $("#accountChange input[name='lastname']").val()
    let email = $("#accountChange input[name='email']").val()
    let tel = $("#accountChange input[name='tel']").val()
    let password = $("#accountChange input[name='password']").val()
    let csrf = $("#accountChange input[name='csrf-token']").val()
    $.ajax({
        type: 'POST',
        url: '/Client_Ajax/accountChange',
        data: {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'tel': tel,
            'password': password,
            'csrf-token': csrf
        },
        success: function (res) {
            console.log(res)
            res = res.trim()
            if (res === 'error') {
                Swal.fire(
                    'Hata!',
                    'Bir sorun oluştu!',
                    'error'
                );
            } else if (res === 'wrong_pass') {
                Swal.fire(
                    'Hata!',
                    'Yanlış şifre girdiniz!',
                    'error'
                );
            } else if (res === 'csrf_token') {
                Swal.fire(
                    'Hata!',
                    'Sistemsel bir sorun oluştu!',
                    'error'
                );
            } else if (res === 'email_using') {
                Swal.fire(
                    'Hata!',
                    'Bu e-posta başkası tarafından kullanılıyor!',
                    'error'
                );
            } else if (res === 'success') {
                Swal.fire(
                    'Başarılı!',
                    'Hesap başarıyla güncellendi!',
                    'success'
                );
                setTimeout(function () {
                    window.location = '/musteri'
                }, 2500)
            } else {
                Swal.fire(
                    'Hata!',
                    res,
                    'error'
                );
            }
        }
    })
})
$("#contactForm").submit(function (e) {
    e.preventDefault();
    let data = new FormData(this);
    let button = $("#contactForm button[type='submit']")
    button.html('<i class="bx bx-loader-alt bx-spin"></i> Gönderiliyor...').attr('disabled', true);
    $.ajax({
        type: 'POST',
        url: '/Main_Ajax/sendMessage',
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res)
            res = res.trim()
            if (res === 'success') {
                Swal.fire(
                    'Başarılı!',
                    'Mesajınız başarıyla iletildi!',
                    'success'
                );
                button.html('<i class=\'bx bx-check\'></i> Mesaj iletildi!').attr('disabled', true);
                setTimeout(function () {
                    window.location.reload();
                }, 2500)
            } else if (res === 'error') {
                Swal.fire(
                    'Hata!',
                    'Bir sorun oluştu!',
                    'error'
                );
                button.html('Mesajı İlet').attr('disabled', false);
            } else {
                Swal.fire(
                    'Hata!',
                    res,
                    'error'
                );
                button.html('Mesajı İlet').attr('disabled', false);
            }
        }
    })
})