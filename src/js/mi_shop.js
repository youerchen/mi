import './library/jquery.js';
import {cookie} from './library/cookie.js';

let shopMsg = cookie.get('shopMsg');
console.log(shopMsg);
if (shopMsg) {
    shopMsg = JSON.parse(shopMsg);

    let idList = shopMsg.map(elm => elm.id).join();

    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {
            idList
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            let temp = '';
            let sum=0;//总的商品数
            let chage=0;//被选的商品数
            let total=0;//被选商品的总价格
            let total_val=0;//总的商品价格
            res.forEach((elm, i) => {
                let picture = JSON.parse(elm.picture);
                let price=JSON.parse(elm.price);
                let arr = shopMsg.filter(val => val.id == elm.id);
                sum+=arr[0].num;
                total_val+=price[0].pay*arr[0].num;
                temp +=`
            <div class="item-table">
                <div class="item-row clearfix">
                    <div class="col col-check">
                        <input type="checkbox" class="ch" data-id="${elm.id}">
                    </div>
                    <div class="col col-img">
                        <a href="">
                            <img src="../${picture[2].src}" alt="">
                        </a>
                    </div>
                    <div class="col col-name">
                        <h3 class="name">
                            <a href="">${elm.title}</a>
                        </h3>
                    </div>
                    <div class="col col-price">
                    ${price[0].pay}元
                    </div>
                    <div class="col col-num">
                        <div class="change-goods-num clearfix">
                            <a href="javascript:void(0)" class="subtract" data-id="${elm.id}">
                                -
                            </a>
                            <input type="text" class="goods-num" autocomplete="off" value="${arr[0].num}" max="${elm.num}" min="1">
                            <a href="javascript:void(0)" class="add" data-id="${elm.id}">
                                +
                            </a>
                        </div>
                    </div>
                    <div class="col col-total">
                    ${price[0].pay*arr[0].num}元
                    </div>
                    <div class="col col-action">
                        <a href="" class="del" data-id="${elm.id}">
                            ✖
                        </a>
                    </div>
                </div>
            </div>
                `;

            });
            $('.list-body>.item-box').append(temp).find('.del').on('click', function() {
                let shop = shopMsg.filter(el => el.id != $(this).attr('data-id')); 
                cookie.set('shopMsg', JSON.stringify(shop), 1);
                location.reload();
            });
            $(function(){
                $('#sumshop').text(sum);
                //添加数量
                $('.add').on('click',function(){
                    let shop  =shopMsg.map(elm=>{
                        if(elm.id==$(this).attr('data-id')){
                            console.log(elm.id);
                            if(elm.num>=elm.stock){
                                elm.num==elm.stock;
                                alert("已达最大库存")
                            }else{
                                elm.num++;
                            }
                        }
                        return elm;
                    })
                    // console.log(shop);
                    cookie.set('shopMsg',JSON.stringify(shop),1);
                    location.reload();
                })
                //减少数量
                $('.subtract').on('click',function(){
                    let shop  =shopMsg.map(elm=>{
                        if(elm.id==$(this).attr('data-id')){
                            console.log(elm.id);
                            elm.num>1?elm.num--:elm.num;
                        }
                        return elm;
                    })
                    cookie.set('shopMsg',JSON.stringify(shop),1);
                    location.reload();
                })
                //全选功能
                let flag=true;
                $('#all').on('click',function(){
                    if(flag){
                        $('.col>.ch').prop("checked",true);
                        flag=false;
                        chage=sum;
                        total=total_val;
                    }else{
                        $('.col>.ch').prop("checked",false);
                        flag=true;
                        chage=0;
                        total=0;
                    }
                    $('#total-price').text(total);
                    $('#chshop').text(chage);
                })
                //勾选商品事件
                $('.ch').on('click',function(){
                    let shop  =shopMsg.filter(elm=>{
                        // console.log();
                        if(elm.id==$(this).attr('data-id')){
                            return elm.num;
                        }
                    });
                    let price=shop[0].price;
                    let num=shop[0].num;
                    if(this.checked){
                        chage+=shop[0].num;
                        total+=num*price;
                        // console.log(total);
                    }else{
                        chage-=shop[0].num;
                        total-=num*price;
                    }
                    $('#chshop').text(chage);
                    $('#total-price').text(total);
                })
                $('#btn-primary').on('click',function(){
                    if(total){
                        alert('已结算');
                        cookie.remove("shopMsg");
                    }else{
                        alert("您还没有选择商品！")
                    }
                })
            
            })
        }
    });

}