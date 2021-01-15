import './library/jquery.js';


// $(function(){
//     $('#btn').setAttribute('disabled',true);
//     var result=[false,false,false,false];
//     $('#user').on('click',function(){
//         alert(1);
//         var reg=/^[A-Za-z]\w{5,15}$/;
//         result.splice(0,1,reg.test(this.value));
//         btnevent();
//     })

//     $('#pwd').on('onblur',function(){
//         var reg=/^.{6,16}$/;
//         result.splice(1,1,reg.test(this.value));
//         btnevent();
//     })

//     $('#haspwd').on('onblur',function(){
//         let flag=userPwd.value.trim()===confirmPwd.value.trim()?true:false;
//         result.splice(2,1,flag);
//         btnevent();
//     })

//     $('#phoneNum').on('onblur',function(){
//         let reg=/^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
//         result.splice(3,1,reg.test(this.value));
//         btnevent();
//     })


//     function btnevent(){
//         result.every(function(val){
//             return val==true;
//         })?btn.removeAttribute('disabled'):btn.setAttribute('disabled',true);
//     };
// })

window.onload=function(){
    var userName=document.getElementById('user');
    var userPwd=document.getElementById('pwd');
    var confirmPwd=document.getElementById('haspwd');
    var phoneName=document.getElementById('phoneNum');
    var btn=document.getElementById('btn-submit');
    console.log(btn);
    btn.setAttribute('disabled',true); 

    var userNameSp=document.getElementById('userNameSp');
    var userPwdSp=document.getElementById('userPwdSp');
    var confirmPwdSp=document.getElementById('confirmPwdSp');
    var phoneNameSp=document.getElementById('phoneNameSp');

    var result=[false,false,false,false];
    userName.onblur=function(){
        var reg=/^[A-Za-z]\w{5,15}$/;
        userNameSp.innerHTML=reg.test(this.value.trim())?'√':'×';
        userNameSp.style.color=reg.test(this.value.trim())?'green':'red';
        result.splice(0,1,reg.test(this.value));
        btnevent();
    }
    userPwd.onblur=function(){
        var reg=/^.{6,16}$/;
        userPwdSp.innerHTML=reg.test(this.value.trim())?'√':'×';
        userPwdSp.style.color=reg.test(this.value.trim())?'green':'red';
        result.splice(1,1,reg.test(this.value));
        btnevent();
    }
    confirmPwd.onblur=function(){
        let flag=userPwd.value.trim()===confirmPwd.value.trim()?true:false;
        confirmPwdSp.innerHTML=flag?'√':'×';
        confirmPwdSp.style.color=flag?'green':'red';
        result.splice(2,1,flag);
        btnevent();
    }
    phoneName.onblur=function(){
        var reg=/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
        phoneNameSp.innerHTML=reg.test(this.value)?'√':'×';
        phoneNameSp.style.color=reg.test(this.value.trim())?'green':'red';
        result.splice(3,1,reg.test(this.value));
        btnevent();
    }
    
    function btnevent(){
        result.every(function(val){
            return val==true;
        })?btn.removeAttribute('disabled'):btn.setAttribute('disabled',true);
    };
};