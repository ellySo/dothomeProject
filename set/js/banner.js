// $.noConflict();
// var bby$ = jQuery;

$(function(){
    //데이터객체
        const mySwiper = {
            dir : 'next',
            imginfo : [
                {
                    "imgSrc" : "img/event.png",
                    "imgLink" : "http://www.naver.com",
                },{
                    "imgSrc" : "img/normal.gif",
                    "imgLink" : "http://www.daum.net",},
                {
                    "imgSrc" : "img/season.gif",
                    "imgLink" : "http://www.google.com",
                }
            ],
            bannerEa : () => imginfo.length,        
            innerDiv : function(num){            
                var slideitem = '';
                var slideBtn = '';
                for( const i in this.imginfo){ // for in 정렬객체를 하나씩 하나씩 풀어서 처리
                    
                    slideitem += `<div class='slide-item' data-key='${i}'>
                                    <a href='${this.imginfo[i].imgLink}'>
                                        <img src='${this.imginfo[i].imgSrc}'>
                                    </a>
                                </div>`;
                    slideBtn += `<button data-key='${i}'>${ parseInt(i) + 1 }</button>`;
                }
                $(".slide-wrapper").html(slideitem);
                // 여기에서만 이미지높이를 가져올 수가 있다.
                $('.indicate').html(slideBtn);

            },
            activeStatu : function(num){
             
                $('.indicate button').eq(num).addClass('act').siblings().removeClass('act');
                $('.slide-item').eq(num).addClass('act').siblings().removeClass('act');
            }
        }

    var s_count = 0;
   
    mySwiper.innerDiv(s_count);  // 1회처리 태그세팅
    mySwiper.activeStatu(s_count) // 1회 활성화

    var autoBanner = setInterval(function(){ // 3초마다 주기적으로 활성화
                        if($(this).hasClass ('next')) {
                            if(s_count < 2)   s_count++; else s_count=0;
                        }else{
                            if(s_count > 0 )  s_count--; else s_count=2;
                        }
                    mySwiper.activeStatu(s_count)
                    }, 3000);
$('.btns button').click(function(){
        clearInterval(autoBanner);
        if($(this).hasClass ('next')) {
            if(s_count < 2)   s_count++; else s_count=0;
        }else{
            if(s_count > 0 )  s_count--; else s_count=2;
        }
        mySwiper.activeStatu(s_count);

})

    // 인디케이트를 클릭하면 -> 동적객체 -> on메서드쓰기
    $('.indicate').on('click', 'button', function(){
        clearInterval(autoBanner); // 자동롤링멈춤
        s_count = $(this).index(); // 클릭한 버튼의 순번
        mySwiper.activeStatu(s_count);
        autoBanner = setInterval(function(){ // 3초마다 주기적으로 활성화
            if($(this).hasClass ('next')) {
                if(s_count < 2)   s_count++; else s_count=0;
            }else{
                if(s_count > 0 )  s_count--; else s_count=2;
            }
        mySwiper.activeStatu(s_count)
        }, 3000);
    })
                    
})