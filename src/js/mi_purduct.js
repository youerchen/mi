import './library/jquery.js';
import {cookie} from './library/cookie.js';

let id=location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id:id
    },
    dataType: "json",
    success: function (res) {
        // console.log(res);
        let picture=JSON.parse(res.picture);
        let price=JSON.parse(res.price);
        // let color=JSON.parse(res.color);
        let temp_title=`
        ${res.title}
        `;
        let temp_img=`
        <img src="../${picture[1].src}" alt="">
        `;
        let temp_sum=`
        <div class="selected-list">
                        <ul>
                            <li>
                                ${res.title} 5G 6GB+128GB 流影紫
                                <span>${price[0].pay}元</span>
                            </li>
                        </ul>
                        <div class="total-price">
                            总计：${price[0].pay}元
                        </div>
                    </div>
                    <div class="btn-box">
                    <div class="sale-btn">
                        <a href="./mi_shop.html" class="btn btn-primary">加入购物车</a>
                    </div>
                    <div class="favorite-btn">
                        <a href="#" class="btn-gray btn-like">
                            <i class=""></i>
                            喜欢
                        </a>
                    </div>
                </div>
        `;
        let temp=`
        <h2>${res.title}</h2>
                    <p class="sale-desc"><font color="#ff4a00">「新品热卖中！最高享6期免息；购机返双倍米金；标配不提供充电器和数据线，如需请选择套装版」</font>${res.details}</p>
                    <p class="company-info">小米自营</p>
                    <div class="price-info">
                        <span>${price[0].pay}</span>元
                    </div>
                    <div class="line"></div>
                    <!-- 地址选择 -->
                    <div class="address-box">
                        <i class="glyphicon glyphicon-map-marker"></i>
                        <div class="address-con">
                            <div class="address-info">
                                <span>北京</span>
                                <span>北京市</span>
                                <span>海淀区</span>
                                <span>清河街道</span>
                            </div>
                            <a href="#" class="edit">修改</a>
                            <div class="info">
                                <span>${hasNum(res.num)}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 版本选择 -->
                    <div class="buy-option">
                        <div class="buy-box-child">
                            <div class="title">
                                选择版本
                            </div>
                            <ul class="clearfix">
                                <li class="active">
                                    <a href="#">6GB+128GB</a>
                                </li>
                                <li>
                                    <a href="#">8GB+128GB</a>
                                </li>
                                <li>
                                    <a href="#">8GB+256GB</a>
                                </li>
                            </ul>
                        </div>
    
                        <div class="buy-box-child">
                            <div class="title">
                                选择颜色
                            </div>
                            <ul class="clearfix">
                                <li class="active">
                                    <a href="#">黑色</a>
                                </li>
                                <li>
                                    <a href="#">蓝色</a>
                                </li>
                                <li>
                                    <a href="#">白色</a>
                                </li>
                            </ul>
                        </div>
                    </div>
        `;
        $('.nav-bar>.container>h2').append(temp_title);
        $('.img-left>.img-box').append(temp_img);
        $('.product-right').append(temp);
        $('.selected-sum').append(temp_sum).find('.sale-btn').on('click',function(){
            saleBtn(res.id,price[0].pay,res.num);
        });
    }
});

function hasNum(num){
    return num>0?'有现货':'该地区暂时缺货';
}

function saleBtn(id,price,stock,num=1){
    let shopMsg=cookie.get('shopMsg');
    // console.log(shopMsg);
    let product={
        id,
        price,
        stock,
        num
    };

    if(shopMsg){
        shopMsg=JSON.parse(shopMsg);
        // console.log(shopMsg);
        if(shopMsg.some(elm=>elm.id==id)){
            shopMsg.forEach(el=>{
                el.id==id?el.num=num:null;
            });
        }else{
            shopMsg.push(product);
        }

    }else{
        shopMsg=[];
        // console.log(shopMsg);
        shopMsg.push(product);
    }
    cookie.set('shopMsg',JSON.stringify(shopMsg),1);
    // console.log(product);
}