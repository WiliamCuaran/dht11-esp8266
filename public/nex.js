$(function(){
const socket = io();
//console.dir ( ip.address() );

const $onp = $('#onp');
const $ofp = $('#ofp');
const $upl = $('#upl');
const $dol = $('#dol');
const $dtss = $('#dtss');
const $dtsss = $('#dtsss');


$("#onp").click(() =>{
    socket.emit('onpum',{
        On:"Pum"
    })
});

$("#ofp").click(() =>{
    socket.emit('offpum',{
        Off:"pum"
    });
});

$("#upl").click(() =>{


    socket.emit('upled',{
        up:"led"
    });
});

$("#dol").click(() =>{
    socket.emit('downled',{
        down:"led"
    });


});

socket.on('load old msgs', function(msgs) {
    
    for(let i = msgs.length -1; i >=0 ; i--) {
        temperature(msgs[i]);
      }
    
    

    //var items = [data];
    //$dtss.innerHTML += `<p class="whisper"><b>${data.sensor}</b>: ${data.time}</p>`
    //var items = [$dtss.append(`<p class="whisper"><b>${data.sensor}</b>: ${data.time}</p>`)];
   // actions.innerHTML = `<p><em>${data} is typing</em></p>`
   // console.log(items);
});

socket.on('load old msgs', function(msgs) {
    for(let i = msgs.length -1; i >=0 ; i--) {
        pepe(msgs[i]);
      }
       
});

socket.on('sabado' ,(data) => {
 console.log(data);
})

socket.on('ip', (data) => {
    console.log(data);
})

function pepe(data){
    $dtsss.html(`${data.hume}` + " "+ '°C');
}

function temperature(data){
    $dtss.html(`${data.temperature}`+ ' '+'%humedad');
}


});