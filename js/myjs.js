$(document).ready(function(){

    //navi디비 가져오기
    $.ajax({
        type : 'GET',
        url : '/data/navi.json',
        dataType : 'json',
        success : function(data){
            var naviTag = '';
            for(var i in data){
                naviTag +=`<li class='${data[i].pcls}'><a href='${data[i].aHref}' class='${data[i].cls}'>${data[i].naviText}</a></li>`
            }
            $('#gnb').html(naviTag); //네비게이션 출력

            //네비이동 애니메이션
            $('a.scrollPage').on('click', function(e){
                e.preventDefault(); //책갈피기능 막기
                // 클릭하자마자 활성화
                // this addClass on 클릭하자마자 활성화
                $('body, html').animate({
                    scrollTop : $($(this).attr('href')).offset().top
                }, 400, "linear", () => {
                    if($(this).hasClass('navia')){ // navia 클래스를 가지고 있다면
                        $('#gnb .navia').removeClass('on') // 모든 네비게이션 스타일 빼고
                        $(this).addClass('on') // 지금 클릭한 너만 스타일 넣어
                    }
                })
            })//// a.scrollPag click

        },
        error : function(data, status, error){
            console.console.log(data.status, error);
        }      

    })

    //happy_thumb 영역 DB 가져오기
    $.ajax({
        type : 'GET',
        url : '/data/thumb.json',
        dataType : 'json',
        success : function(data){
            console.log(data);
            $('.squareR').html(`<span>${data.title}</span>`); //백틱써보기
            $('.news_more_wrap').html(`<a href="${data.btnText.href}" class="btn_news_more">
            <i class="icn_plus"></i><span>${data.btnText.text}</span></a>`);
            var ateam = "";
            for(var i in data.news_list){
                ateam += `<a href="${data.news_list[i].href}" class="news_item"  data-aos="fade-up" data-aos-delay="${data.news_list[i].delay}">
                <span class="news_item_wrap">
                    <span class="news_img"><img src="${data.news_list[i].imgSrc}" class="item" alt="${data.news_list[i].text}" title="" onerror="this.src='https://cdn.kdcf.or.kr/kcf/contents/img/common/board_thumbnail_default.jpg'"></span>
                    <span class="news_text squareR css-ellipsis">${data.news_list[i].text}</span>
                </span>
            </a>`
            }
            $('.news_list').html(ateam);
           
        },
        error : function(data, status, error){
            
        }   


    })



    AOS.init(); // 외부연동일 경우 반드시
    
    
    $('.section').each(function(){ 
        $(this).attr('data-pos', $(this).offset().top)
        // 각자 .section들은 data-pos속성을 만들고 각자의 body 상단에서 떨어지는 상단 위치를 저장해라
    })

    $(window).on('scroll', function(){    

        var scrollPos = $(window).scrollTop();
        $('.section').each(function(){
            var thisPos = $(this).offset().top;
            if( scrollPos > thisPos - 100 ){
                $('#gnb .navia').removeClass('on')
                $('a[href="#'+$(this).attr('id')+'"]').addClass('on')
            }
        })
        if(scrollPos > 0) {
            $('#hd').addClass('on')
        }else{
            $('#hd').removeClass('on')
    
        }   

    })

    var num = 0;

    var myroll = setInterval(function(){
        num++;
        num %=  $('.culture_item button'). length;
        myrollingfun(num); // 실행식에서는 진짜 값을 넣어줘야 한다.
    }, 3000)

    $('.culture_item button').on('click', function(){        
        clearInterval(myroll); // 자동롤링을 멈춰라
        num = $(this).parent().index()
        myrollingfun(num)
        // 클릭한 버튼의 부모 .culture_item의 순번 0, 1, 2

        myroll = setInterval(function(){
            num++;
            num %=  $('.culture_item button').length;
            myrollingfun(num); // 실행식에서는 진짜 값을 넣어줘야 한다.
        }, 3000)

     })

    function myrollingfun(x){ // 선택자와 이벤트로 독립
        $('.culture_item').removeClass('active');
        $('.culture_item button').eq(x).parent().addClass('active');
    }

}) 
 /////////////////////////// 클리스 삽입해서 편하게 짜기

 // $(this).attr('href') -> #aboutus -> $('#aboutus')
 // $(this)/attr('id') -> aboutus -> $('[href="#aboutus"]')

