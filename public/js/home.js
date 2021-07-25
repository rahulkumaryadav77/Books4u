// var len = $('.img-js').length;


// setInterval(() => {
//     var random1 = Math.floor( Math.random() * len );
//     // console.log(random1);
//     $('.img-js').eq(random1).addClass('animate');
//     setInterval(() => {
//         $('.img-js').eq(random1).removeClass('animate');
//     }, 2800);
// }, 3000);


var i = 0;
var tag = document.getElementById("text");
var html = document.getElementById("text").innerHTML;
var attr = tag.setAttribute("data", html);
var txt = tag.getAttribute("data");
var speed = 170;

function typeWriter() {
    if (i <= txt.length) {
        document.getElementById("text").innerHTML = txt.slice(0, i + 1);
        i++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();