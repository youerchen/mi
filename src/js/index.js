import './library/jquery.js';
import './library/jquery-1.11.0.min.js';
import './library/jquery.lazyload.js';

$(function() {
    $("img.lazy").lazyload({effect: "fadeIn"});
});

$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        let temp = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            let price=JSON.parse(elm.price)
            // console.log(price);
            // console.log(picture[0].src);
            temp += `                                
        <li class="brick-item brick-item-m brick-item-m-2">
            <a href="./mi_purduct.html?id=${elm.id}">
                <div class="figure figure-img">
                    <img class="lazy" src="../${picture[0].src}" alt="">
                </div>
                <h3 class="title">
                        ${elm.title}
                </h3>
                <p class="desc">
                    ${elm.sdesc.slice(0,25)}
                </p>
                <p class="price">
                    <span>${price[0].pay}</span>元起
                </p>
            </a>
        </li>`;
        });

        $('.home-brick-box .brick-list').append(temp);
    }
});
$(function(){
    let timer=setInterval(function(){
        let futuer=new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
        let now=new Date(new Date().getTime());
        let num=parseInt((futuer-now)/1000);
        let s=num%60;
        s=s<10?'0'+s:s;
        let m=parseInt((num/60))%60;
        m=m<10?'0'+m:m;
        let h=parseInt(((num/60)/60))%24;
        h=h<10?'0'+h:h;
        $('#hour').text(h);
        $('#minute').text(m);
        $('#second').text(s);
    });

    $('.nav-item:not(:nth-last-child(-n+2))').on('mouseenter',function(){
        $('.header-nav-menu').addClass("ation slide-down");

    })
    $('.nav-item:not(:nth-last-child(-n+2))').on('mouseleave',function(){
        $('.header-nav-menu').removeClass("ation slide-down");
    })
})