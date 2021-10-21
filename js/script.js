$(".popup_address_copy_button").on("click",function() {

   console.log($(".popup_address_copy_button").text());
   $(".popup_address_copy_button").text("Copied");
   navigator.clipboard.writeText($(".popup_address_copy_block_text p").text());
});



$(".popup_exit").on("click",function(){
    $('.overlay').fadeOut(500);
    $(".popup_address_copy_button").text("Copy");
});

let url = 'https://testnet.arbstore.org/api/v1/'

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    printerOut(data);  
    console.log(data);
});

function printerOut(data){
    var out ='';

    
    for(var key in data){
        console.log(data[key].real_name);
        out += `
        <div class="arbiter_item">
            <div class="arbitier_item__personal">
                <div class="arbiter_item__foto">
                    <img src="/arbstore/img/foto/${data[key].address}.png" alt="Foto person" srcset="">
                </div>
                <table class="arbitier_item__personal_data">
                    <tr>
                        <td>Name:</td>
                        
                        <td>${data[key].real_name}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${data[key].address}</td>
                    </tr>
                    <tr>
                        <td>BIO:</td>
                        <td>${data[key].info.bio}</td>
                    </tr>
                    <tr>
                        <td>№ cases resolved / cases
                            <br> arbiter was picked</td>
                        <td>${data[key].resolved_cnt}/${data[key].total_cnt}</td>
                    </tr>
                    <tr>
                        <td>Last case resolved</td>
                        <td>${data[key].last_resolve_date}</td>
                    </tr>
                    <tr>
                        <td>Last Activity:</td>
                        <td>${data[key].last_unit_date}</td>
                    </tr>                                        
                </table>        
            </div>        
            <button class="arbitier_item__button-info" id="${key}">View more</button>
        </div>`

        console.log(data[key].address);
    }
       
     
    $('.arbiter_items').html(out);

};


$('body').on('click','.arbitier_item__button-info', function(){
    console.log(this.id);
    $('.overlay').fadeIn(500);
   console.log($(".popup_address_copy_block_text p").text()); 
});


$(document).ready(function(){

    $('.header__burger').click(function(event){
        console.log('ok');
        $('.header__burger, .header__menu, .adp_button').toggleClass('active');

    });  
}); 


$(document).ready(function(){

    $('.header__logo').click(function(event){
        var url = "index.html";
        $(location).attr('href',url);

        // console.log('ok');
        // $('.header__burger, .header__menu, .adp_button').toggleClass('active');

    });  
}); 
// $(".arbitier_item__button-info").on("click",function() {
//     // alert("click bound directly to #test-element");
//     console.log(this.id);
//      $('.overlay').fadeIn(500);
//     console.log($(".popup_address_copy_block_text p").text()); 
//      //копирование адреса арбитра в попапе
//     // alert('Address copied')
    
//     //btn.innerText 3
// });

// let response = await fetch(url);

// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
//   console.log(json);
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }

// $(".overlay").on("click",function(){
//     console.log("overlay");
// });