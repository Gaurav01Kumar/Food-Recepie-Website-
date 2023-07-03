let toggles=document.querySelector(".toggle");
let navigation=document.querySelector(".navigation")
let main=document.querySelector(".main")
toggles.addEventListener("click",function (){
    navigation.classList.toggle('active');
})
var x=12;
function a(){
    
    console.log(x)
    let x=23;
    
    function c(){
        console.log(x )
    }
    c()
}
a();