// $('body').on('click','.popup_address_copy_button', function() {

// //    console.log($(".popup_address_copy_button").text());
// //    $(".popup_address_copy_button").text("Copied");
// //    navigator.clipboard.writeText(' ');
// //    navigator.clipboard.writeText($(".popup_address_copy_block_text p").text().substr(9,));
// //    console.log($(".popup_address_copy_block_text p").text().substr(9, ));
   
// });

function copytext(el) { //onclick button in html
    // console.log(el);
    var $tmp = $("<textarea>");
        $("body").append($tmp);
        $tmp.val(el).select();
        document.execCommand("copy");
        $tmp.remove();
        $(".popup_address_copy_button").text("Copied");

}


$('body').on('click','.popup_exit', function(){
    $('.overlay').fadeOut(500);
    $(".popup_address_copy_button").text("Copy");
});


// $('body').on('click','.getApidata', function(){
//     getApiData();
//     console.log("api");
// });

// if (window.location.pathname == '/arbiters.html') {
//     // console.log("pages arbiters");
//     getApiData();
// }
getApiData();
function getApiData (){
   
    let url = 'https://testnet.arbstore.org/api/v1/'
    let fetch_api_data = '';
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        fetch_api_data = data;
        // printerOut(data);
        //   generatorTemlate(fetch_api_data,".arbiter_items",'my-template')  
        showArbiters(true,true);
        // console.log(data);
    });

    let flag_filter_it = true;
    let flag_filter_finance = true;


    $(".button_filter__it").on("click", function(){
        $(".arbiter_item") .remove();
        $(".button_filter__it").toggleClass("_active");
        // console.log("it");
        // const result_it = fetch_api_data.filter(fetch_api_data => fetch_api_data.info.tags.IT);
        flag_filter_it = !flag_filter_it;
        showArbiters(flag_filter_it,flag_filter_finance)
        // generatorTemlate(result_it,".arbiter_items",'my-template') 
        //  console.log(flag_filter_it);
        //  if (flag_filter_it && flag_filter_finance){
        //     console.log('show all');
        // }
    })

    $(".button_filter__finance").on("click", function(){
        $(".arbiter_item").remove();
        $(".button_filter__finance").toggleClass("_active");
        
        // const result_finance = fetch_api_data.filter(fetch_api_data => fetch_api_data.info.tags.Finance);
        flag_filter_finance = !flag_filter_finance
        showArbiters(flag_filter_it,flag_filter_finance)
        // console.log(result_finance);
        // generatorTemlate(result_finance,".arbiter_items",'my-template') 
        // console.log("finance");

        // if (flag_filter_it && flag_filter_finance){
        //     showArbiters()
        // }
    })

    let result_finance =''
    let result_it = ''
    let filtered_popup_data = fetch_api_data
    function showArbiters(it,finance){
        // console.log("it: "+it+"  finance: "+finance );


        if (window.location.pathname == '/arbiters.html') {
            // console.log("arbiters");
        }

        if(it && finance){
            generatorTemlate(fetch_api_data,".arbiter_items",'my-template')
            filtered_popup_data = fetch_api_data
        }
        else if(it && !finance){
            result_it = fetch_api_data.filter(fetch_api_data => fetch_api_data.info.tags.IT);
            generatorTemlate(result_it,".arbiter_items",'my-template'); 
            filtered_popup_data = result_it;
        }else if(!it && finance){
            result_finance = fetch_api_data.filter(fetch_api_data => fetch_api_data.info.tags.Finance);
            generatorTemlate(result_finance,".arbiter_items",'my-template');
            filtered_popup_data = result_finance
        }

        // }

    }

    // template
    function generatorTemlate(api_data, classInsertTemlate, classTemplate, ctxid=-1){
            // console.log(ctxid);
        

        for(var key in api_data){
            //  console.log(api_data[key]); 
            // console.log("for: "+ctxid);
        if(ctxid != -1){key = ctxid;}
            // console.log(ctxid);
            

        var html_obj ={

            real_name: !!api_data[key].real_name ? api_data[key].real_name : " - ",
            address: !!api_data[key].address ? api_data[key].address : " - " ,
            bio: !!api_data[key].info.bio ? api_data[key].info.bio: " - ",
            resolved_cnt: !!api_data[key].resolved_cnt ? api_data[key].resolved_cnt : " - ",
            total_cnt: !!api_data[key].total_cnt ? api_data[key].total_cnt : " - ",
            last_resolve_date: !!api_data[key].last_resolve_date ? api_data[key].last_resolve_date : " - ",
            last_unit_date: !!api_data[key].last_unit_date ? api_data[key].last_unit_date : " - ",
            arbid: key,
            img_src: !!api_data[key].address ? api_data[key].address : "FotoNone",
            creation_date: !!api_data[key].creation_date ? api_data[key].creation_date : " - "

        }  

        if(ctxid != -1){

            // добавление языка в объект
            if (api_data[ctxid].info.languages.length>1){
                html_obj.languages1 = api_data[ctxid].info.languages[0]
                html_obj.languages2 = api_data[ctxid].info.languages[1]
            }else{
                html_obj.languages1 = html_obj.languages2 = api_data[ctxid].info.languages[0]
            }
            //end добавление языка в объект

            //Добавление finance it

            if(!!api_data[ctxid].info.tags.Finance && !!api_data[ctxid].info.tags.IT){
                // console.log(fetch_api_data[this.id].info.tags.Finance);
                html_obj.finance = api_data[ctxid].info.tags.Finance
                html_obj.IT = api_data[ctxid].info.tags.IT
            }else if(api_data[ctxid].info.tags.Finance) {
                html_obj.finance = api_data[ctxid].info.tags.Finance
                html_obj.IT = '-'
            }else if(api_data[ctxid].info.tags.IT){
                html_obj.IT = api_data[ctxid].info.tags.IT
                html_obj.finance = '-'
            }
        //end Добавление finance it          
        }

        var html = renderTemplate(classTemplate, html_obj);        
        $(classInsertTemlate).append(html);
        if(ctxid != -1){break;}
        }
    
    }

    function renderTemplate(name, data) {    
        var template = document.getElementById(name).innerHTML;
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                var search = new RegExp('{' + property + '}', 'g');
                template = template.replace(search, data[property]);
            }
        }
    return template;
    }

    $('body').on('click','.arbitier_item__button-info', function(){
        $(".popup_arbitier").remove();
        // console.log(this.id);
        $('.overlay').fadeIn(500);
        // console.log(fetch_api_data[this.id]);  
        generatorTemlate(filtered_popup_data,".overlay",'my-template-popup',this.id);
    });

}//if arbbiters.html  end

// function ImageExist(url) 
// {
    
//    var img = new Image();
//    img.src = url;
// //    console.log(img.height);
//    return img.height != 0 ? true : false;
// }


$(document).ready(function(){

    $('.header__burger').click(function(event){
        // console.log('ok');
        $('.header__burger, .header__menu, .adp_button, .header__body').toggleClass('active');

    });  
}); 


$(document).ready(function(){

    // $('.header__logo').click(function(event){
    //     var url = "index.html";
    //     $(location).attr('href',url);

    //     // console.log('ok');
    //     // $('.header__burger, .header__menu, .adp_button').toggleClass('active');

    // }); 

    
}); 





if (window.location.pathname == '/formarbiter.html') {

    $('.formspecialization_data input[type="checkbox"]').click(function(event){
        //  console.log(event);
        //  console.log("swdasd");
        //  console.log($(this)[0].className);


         if ($(this).is(':checked')){
            //  console.log("on");
             $('.'+$(this)[0].className+'_input').show(5);
        } else {
            $('.'+$(this)[0].className+'_input').hide(5);
            // $('#text').hide(100);
            // console.log("off");
        }
    
        // if ($('#formspecializationit').is(':checked')){
            
        //     console.log('Включен');
        // } else {
        //     console.log('Выключен');
        // }
    });
    
    // console.log("pages arbiters");


     //получаем инпут file в переменную
    const formImage = document.getElementById('file_img_load');
    //получаем див для превью в переменную
    const formPreview = document.getElementById('formPreview');

    //слушаем изменения в инпуте
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
}



function uploadFile(file){
    if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
        alert('Разрешены только изображения');
        formImage.value='';
        return;
    }
     if(file.size>2*1024*1024){
        alert("Файл должен быть менее 2МБ");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e){
        formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    };
    reader.onerror = function(e){
        alert('Ошибка');
    };
    reader.readAsDataURL(file);
}


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



$(document).ready(function() {
	$('.languages').select2();
    // $('.js-example-basic-multiple').select2();
    // var selectory = $('.js-example-basic-multiple').select2({
    //     // заполнитель: "Пожалуйста, выберите, выберите не более трех",
    //    allowClear: true,
    // //    maximumSelectionLength:3,
    // });

                              
});

