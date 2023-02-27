// Code Started

// Getting all Elements
let paramBox = document.getElementById('paramBox');
let jsonBox = document.getElementById('jsonBox');
let customparams = document.getElementById('customparams');
let json = document.getElementById('json');
let moreParams = document.getElementById('moreParams');
let params = document.getElementById('params');
let delParams = document.getElementsByClassName('delParams');
let resbox = document.getElementById('resbox');
let submit = document.getElementById('submit');
let url = document.getElementById('url');
let copy = document.getElementById('copy');



let paramNo = 1;






// Working Functions
function createElement(paramsItems) {
    let element = document.createElement('div');
    element.innerHTML = paramsItems;
    element.classList.add('my-3');
    paramNo += 1;
    params.append(element);
};

url.onchange = ()=>{
    if(url.value){
        submit.removeAttribute('disabled');
    }else{
        submit.setAttribute('disabled', "");
    }
};





// Hide jsonBox and show paramBox
customparams.addEventListener('click', () => {
    jsonBox.classList.add('d-none');
    paramBox.classList.remove('d-none');
    params.classList.remove('d-none');
});

// Hide paramBox and show jsonBox
json.addEventListener('click', () => {
    jsonBox.classList.remove('d-none');
    paramBox.classList.add('d-none');
    params.classList.add('d-none');
});

// Function to add more params
moreParams.addEventListener('click', () => {
    let paramsItems = `
                    <div class="form-group row">
                        <label for="paramkey${paramNo+1}" class="col-sm-2 col-form-label">Parameter-${paramNo+1}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Enter Key" id="paramkey${paramNo+1}">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Enter Key Value" id="paramvalue${paramNo+1}">
                        </div>
                        <button class="btn btn-danger w-auto delParams">X</button>
                    </div>`;

    createElement(paramsItems);
    for (const items of delParams) {
        items.addEventListener('click', (e)=>{ 
            e.target.parentElement.remove();
        });
    };
});







// Processing Functions
submit.addEventListener('click', ()=>{
    resbox.innerHTML = `Requester is Fetching Response... Please Wait!  <i class="fa-solid fa-circle-notch fa-spin"></i>`;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if(contentType === 'custom'){
        data = {};
        for (let i = 1; i < paramNo + 1; i++) {
            if(document.getElementById('paramkey'+i) != undefined){
                let key = document.getElementById('paramkey'+i).value;
                let keyValue = document.getElementById('paramvalue'+i).value;
                data[key] = keyValue;
            };
        };
        data = JSON.stringify(data);
    } else{
        data = jsonBox.value;
    };

    // Fetching all requests
    if(requestType ==='GET'){
        fetch(url.value, {
            method: 'GET',
        })
        .then(res=>res.text())
        .then(data=>{
            resbox.innerHTML = JSON.stringify(JSON.parse(data), null, '\t');
        })
    } else if(requestType ==='POST'){
        fetch(url.value, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: data
        })
        .then(res=>res.text())
        .then(data=>{
            resbox.innerHTML = data;
        })
    };
    copy.removeAttribute('disabled');
});


copy.addEventListener('click', ()=>{
    let text = resbox.innerText;
    navigator.clipboard.writeText(text);
})



