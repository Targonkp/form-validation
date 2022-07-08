let list = document.getElementById('selectAge');
let formImage = document.getElementById('formImage');
let formPreview = document.getElementById('formPreview');


let arr = [];
for (let i=16; i<=100; i++){
    arr[i] = i;
}


item = document.createElement('option');
for (let i=16; i<arr.length; i++){
    item.innerHTML = arr[i];
    list.appendChild(item.cloneNode(true));
}


let form = document.querySelector('.form-block');
form.addEventListener(
    'submit',
    formSend
)

function formSend(e){
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form); //получаю все данные из полей
    formData.append('image', formImage.files[0]); //добавляю изображение

    if (error === 0){
        //добавляю класс с gif загрузки
        form.classList.add('_sending');
        //отправляю запрос
        fetch('')
            .then((response) => {
                console.log(response.status);
                if (response.status === 200){
                    response.json();
                }
            })
            .then((data) => {
                setTimeout(
                    () => {
                        form.classList.remove('_sending'); //удаляю класс с gif загрузки
                        form.reset(); //очищаю форму
                    },
                    1000
                )
            })
            .catch(error => alert(error))

    }
    else
    {
        setTimeout("alert('Заполните все обязательные поля')", 800);
    }
}

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.required');
    for (let index=0; index<formReq.length; index++){
        let input = formReq[index];
        formRemoveError(input);
        if (input.classList.contains('email')){
            if (emailTest(input))
            {
                formAddError(input);
                error++;
        }
        }
        else if(input.getAttribute("type") === "checkbox" && input.checked === false){
           formAddError(input);
           error++;
        }
        else {
            if (input.value === ''){
                formAddError(input);
                error++;
        }
        }
    }
   return error;
}

function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
}


function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
}

function emailTest(input) {
    return !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input.value)
}

formImage.addEventListener(
    'change',
    () => {
        uploadFile(formImage.files[0]);
        console.log(formImage.files[0].size, formImage.files[0].type, formImage.files[0].lastModified);
    }
);

function  uploadFile(file) {
    if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
        alert('Используйте только изображения');
        formImage.value = '';
        return;
    }
    if (file.size > 1 * 1024 * 1024){
        alert('Загрузите файл размером меньше 1 Мб');
        return;
    }


let reader = new FileReader();
reader.onload = function (event) {
    formPreview.innerHTML = `<img src="${event.target.result}" alt="Фото"></img>`;
};
reader.onerror = function (event) {
    alert('Произошла ошибка')
};
reader.readAsDataURL(file);
}