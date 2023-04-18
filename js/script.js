let form = document.getElementById('newListForm');
let input = document.getElementById('add_input');
let ul = document.querySelector('ul')


let data = [];

let dataFromLocal = Get_From_Local();

if(dataFromLocal) {
    data = dataFromLocal;
    Show_List(data);
}


form.addEventListener('submit', function (event) { 
    event.preventDefault();
    // let value = event.target.add_input.value;
    let value = input.value.trim();
    
    let obj = {
        id: Math.random(),
        value: value
    }

    data.push(obj);
    Show_List(data);
    Set_To_Local(data);

});


function Show_List(data) { 
    ul.innerHTML = '';
    data.map((element) => {
        let span = document.createElement('span')
        span.innerText = element.value;

        let button = document.createElement('button')
        button.classList.add('btn','btn-danger', 'mx-5', 'removeSelf');
        button.innerText = 'Remove';
        button.addEventListener('click', function (event)  { 
            let clickedBTN = event.currentTarget;
            let parentLi = clickedBTN.parentNode;
            let idOfElement = parentLi.getAttribute('data-id');
            idOfElement = parseFloat(idOfElement);
            data = data.filter(x => x.id !== idOfElement);
            Set_To_Local(data)
            // RECURSION - METODUN OZUNU CAGIRMASI
            Show_List(data);
        });


        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.setAttribute('data-id', element.id)

        li.appendChild(span)
        li.appendChild(button)

        ul.appendChild(li);
    });
    input.value = '';
}



let removeAll = document.querySelector('.removeAll');
removeAll.addEventListener('click', function() {
    data = [];
    Set_To_Local(data);
    Show_List(data);
});


function Set_To_Local(data) { 
    localStorage.setItem('data', JSON.stringify(data));
}

function Get_From_Local() { 
    return JSON.parse(localStorage.getItem('data'));
}