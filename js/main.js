
/* ******************* Start Loading ****************** */
    $(document).ready(function(){
        $('.my-logo').fadeOut(2500, () => {
            $('.my-logo').parent().fadeOut(3500 , () => {
                $('.loading').remove();
                $('body').css("overflow-y" , "auto");
            })
        });
    })
/* ******************* End Loading ****************** */

/* ****************** Start QR Code Generator ****************** */
const wrapper = document.querySelector('.wrapper'),
from = wrapper.querySelector('form'),
fileInp = from.querySelector('input'),
infoText = from.querySelector('p'),
closeBtn = wrapper.querySelector('.close'),
copyBtn = wrapper.querySelector('.copy');

function fetchRequest(formData,file){
    infoText.innerText = "Scanning QR Code...";
    // sending post request to qr server api with passing
    // form data as body and getting response form it
    fetch("http://api.qrserver.com/v1/read-qr-code/" ,
    {
        method : "POST" , body : formData
    })
    .then(res => res.json())
    .then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Read" : "Couldn't Scan QR Code";
        
        if(!result) return;
        wrapper.querySelector('textarea').innerText = result;
        from.querySelector('img').src = URL.createObjectURL(file);
        wrapper.classList.add('active');

    }).catch(()=>{
        infoText.innerText = "Couldn't Scan QR Code";
    })
}

fileInp.addEventListener('change' , (e)=> {
    let file = e.target.files[0]; // getting user selected file
    if(!file) return;

    let formData = new FormData(); // creating a new formData object
    formData.append('file', file); // adding selected file to formData

    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", ()=>{
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});


from.addEventListener('click',()=> fileInp.click());
closeBtn.addEventListener("click", ()=>{ wrapper.classList.remove('active'); })
/* ****************** End QR Code Generator ****************** */



