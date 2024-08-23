const data = {
    questions: [
        { id: 0, text: "Просим Вас ответить на несколько\nвопросов касающихся свадьбы." },
        { id: 1, text: "Введите ваше имя и фамилию:" },
        { id: 2, text: "Есть ли у вас аллергии? (Укажите, если есть, например,\nаллергия на орехи, лактозу, глютен и т.д.)" },
        { id: 3, text: "Что вы предпочитаете из алкогольных напитков\n(можно выбрать несколько вариантов)?" },
        { id: 4, text: "Если вы выбрали вино, какое предпочитаете\n(можно выбрать несколько вариантов)?" },
        { id: 5, text: "Необходим ли вам трансфер до места\nбанкета и обратно?" },
        { id: 6, text: "Спасибо за то, что уделили время и ответили на вопросы!\nВаши ответы помогут нам лучше организовать свадьбу\nдля всех. Мы очень ценим ваше участие!" }
    ]
};

let formData = {
    fullName: "",
    allergy: "",
    allergyDetail: "",
    alcohol: [],
    wine: [],
    transfer: ""
};

let bb = 0, b = 0, n = 1;
let quest = document.getElementById('question');
let butS = document.querySelector('.start');
let nb = document.querySelector('.next-back');
let input = document.getElementById('fio');
let star = document.getElementById('star');
let wingL = document.getElementById('lineR');
let wingR = document.getElementById('lineL');
const testDiv = document.getElementsByClassName('test');

const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const loader = document.getElementById('loader');


window.onload = start;
//идентификатор развертывания
//AKfycbwDjkU_rY_kJ5Ct7_yo1clIpQx5rSqJYnE5PzGZd4fINN9odaQXkCU7LYc5erM1jVfI
//URL
//https://script.google.com/macros/s/AKfycbwDjkU_rY_kJ5Ct7_yo1clIpQx5rSqJYnE5PzGZd4fINN9odaQXkCU7LYc5erM1jVfI/exec

function submitForm() {
    let maxLength = Math.max(
        1,
        formData.alcohol.length,
        formData.wine.length
    );
    alert(maxLength);
    for (let i = 0; i < maxLength; i++) {
        let submissionData = new FormData();

        submissionData.append("fullName", i === 0 ? formData.fullName : "");

        if (i === 0) {
            submissionData.append("allergies", formData.allergy === "Есть" ? `Есть` : "Нет");
        } else if (i === 1 && formData.allergy === "Есть") {
            submissionData.append("allergies", formData.allergyDetail);
        } else {
            submissionData.append("allergies", "");
        }

        submissionData.append("alcohol", formData.alcohol[i] || "");
        submissionData.append("wine", formData.wine[i] || "");
        submissionData.append("transfer", i === 0 ? formData.transfer : "");
       // alertSubmissionData(submissionData);

        fetch('https://script.google.com/macros/s/AKfycbwDjkU_rY_kJ5Ct7_yo1clIpQx5rSqJYnE5PzGZd4fINN9odaQXkCU7LYc5erM1jVfI/exec', {
            method: 'POST',
            body: submissionData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    changeModalContent(formData.fullName, "Спасибо, ваши данные отправлены успешно!");//alert("Спасибо! Ваши данные отправлены.")
                } else {
                    changeModalContent("Ошибка", "Произошла ошибка. Пожалуйста, попробуйте снова.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
function next() {
    //alert("bb: " + bb + " b: " + b + " n:" + n);
    if (n != 7) {
        let blockBack = getElementByIndex(b);
        if (inspect(blockBack) == false)
            return;
        let blockNext = getElementByIndex(n);

        deleteAllClasses(quest);
        quest.offsetWidth;
        quest.classList.add('animateP');

        animate(blockBack, 2);

        setTimeout(function () {
            if (b == 5) {
                changeModalContent("", "");
                document.body.classList.remove('animateInsideBack');
                closeModalBtn.style.display = 'none';
                openModal();
                submitForm();
            }
            quest.innerText = getQuestionTextById(n);

            if (blockBack != null)
                blockBack.style.display = 'none';
            if (blockNext != null)
                blockNext.style.display = 'flex';

            animate(blockNext, 1);

            if (n == 1) {
                nb.style.display = 'flex';
                deleteAllClasses(nb);
                nb.classList.add('animateInside');
            }
            if (n == 6) {
                deleteAllClasses(nb);
                nb.classList.add('animateOut');
                nb.style.display = 'none';

                star.style.display = 'flex';
                deleteAllClasses(star);
                star.classList.add('animateInside');
            }
            n++; b++;
            if (b > 1) bb++;
            //alert("%bb: " + bb + " b: " + b + " n:" + n);
        }, 1000);
    }
}
function back() {
    //alert("bb: " + bb + " b: " + b + " n:" + n);
    if (b != 0) {
        let blockBack = getElementByIndex(bb);
        let blockNext = getElementByIndex(b);
        deleteAllClasses(quest);
        quest.offsetWidth;
        quest.classList.add('animatePBack');

        animate(blockNext, 3);
        if (n == 2) {
            deleteAllClasses(nb);
            nb.classList.add('animateOutBack');
        }

        setTimeout(function () {
            quest.innerText = getQuestionTextById(b - 1);
            if (n == 2) {
                nb.style.display = 'none';
                blockBack.style.display = 'flex';
            }
            if (blockBack != null) {
                blockBack.style.display = 'flex';
            }
            if (blockNext != null) {
                blockNext.style.display = 'none';
            }

            animate(blockBack, 4);
            //alert(7);

            n--; b--; if (b > 0) bb--;
            //alert("%bb: " + bb + " b: " + b + " n:" + n);
        }, 1000);
    }

}
function inspect(block) {
    if (b > 0) {
        let c = 0;
        let txt = "";
        let yes, no;

        switch (b) {
            case 1:
                if (block.value == "") {
                    block.style.background = '#f6b1b1';
                    //alert("Вы не ввели своё имя и фамилию");
                    return false;
                }
                block.style.background = 'white';
                formData.fullName = block.value;
                break;
            case 2:
                var div = testDiv[0];
                punkts = div.querySelectorAll('input');

                yes = punkts[0];
                no = punkts[2];
                txt = punkts[1];

                if (!yes.checked & !no.checked) {
                    openModal2();
                    return false;
                } else
                    if (yes.checked) {
                        if (txt.value != "") {
                            formData.allergy = "Есть";
                            formData.allergyDetail = txt.value;
                            txt.style.background = 'white';
                            closeModal2();
                        }
                        else {
                            //alert("Укажите на что конкретно у вас аллергии");
                            txt.style.background = '#f6b1b1';
                            return false;
                        }
                    }
                    else if (no.checked) {
                        formData.allergy = "Нет";
                        txt.style.background = 'white';
                        closeModal2();
                    }
                break;
            case 3:
                c = 0;
                let txt2 = "";
                div = testDiv[1];
                punkts = div.querySelectorAll('input');
                txts = div.querySelectorAll('p');
                for (let i = 0; i < punkts.length; i++) {
                    if (punkts[i].checked) {
                        c++;
                        txt += txts[i].textContent + ", ";
                    }
                }
                if (c == 0) {
                    openModal2();
                    return false;
                }
                else {
                    for (let i = 0; i < punkts.length; i++) {
                        if (punkts[i].checked)
                            formData.alcohol.push(txts[i].textContent);
                        closeModal2();
                    }
                }
                break;
            case 4:
                c = 0;
                txt = "";
                div = testDiv[2];
                punkts = div.querySelectorAll('input');
                txts = div.querySelectorAll('p');
                for (let i = 0; i < punkts.length; i++) {
                    if (punkts[i].checked) {
                        c++;
                        txt += txts[i].textContent + ", ";
                    }
                }
                if (c == 0) {
                    openModal2();
                    return false;
                }
                else {
                    for (let i = 0; i < punkts.length; i++) {
                        if (punkts[i].checked)
                            formData.wine.push(txts[i].textContent);
                            closeModal2();
                    }
                }
                break;
            case 5:
                var div = testDiv[3];
                punkts = div.querySelectorAll('input');

                yes = punkts[0];
                no = punkts[1];

                if (!yes.checked & !no.checked) {
                    openModal2();
                    return false;
                } else
                    if (yes.checked) {
                        formData.transfer = "Да";
                        closeModal2();
                    }
                    else if (no.checked) {
                        formData.transfer = "Нет";
                        closeModal2();
                    }
                break;
            default:
                break;
        }
    }
}
function start() {
    document.body.classList.remove('animateOutY');
    document.body.classList.add('animateInsideBack');
   // modalOverlay.removeEventListener("click", closeModal);
    //dasha.classList.add('animateInsideBack');
}
function restart() {
    document.body.classList.remove('animateInsideBack');
    document.body.classList.add('animateOutY');
    setTimeout(function () {
        let blockBack = getElementByIndex(b);
        blockBack.style.display = 'none';
        butS.style.display = 'flex';
        deleteAllClasses(quest);
        deleteAllClasses(butS);
        quest.innerText = getQuestionTextById(0);
        star.style.display = 'none';
        start();
        bb = 0, b = 0, n = 1;
    }, 1000);
    removeInputs();
}
function openModal() {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    // Задержка для плавного появления окна
    setTimeout(() => {
        modal.classList.add('show');
        modalOverlay.style.opacity = '1';
        const text = modal.querySelector('p');
        text.textContent = "Подождите, идет отправка данных";
    }, 10);
    loader.classList.remove('hidden');


}
function closeModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';

    // Задержка для скрытия окна после анимации
    setTimeout(() => {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        loader.classList.remove('hidden');
    }, 300);
}
function changeModalContent(newTitle, newText) {
    
    loader.classList.add('hidden');
    closeModalBtn.style.display = 'block';
    const title = modal.querySelector('h2');
    const text = modal.querySelector('p');
    title.textContent = newTitle;
    text.textContent = newText;
}

function uncheked() {
    let div = testDiv[1];
    let punkts = div.querySelectorAll('input');
    for (let i = 0; i < punkts.length - 1; i++) {
        if (punkts[i].checked) punkts[i].checked = false;
    }
}
function uncheked2() {
    let div = testDiv[1];
    let punkts = div.querySelectorAll('input');
    punkts[5].checked = false;
}
function uncheked3() {
    let div = testDiv[2];
    let punkts = div.querySelectorAll('input');
    for (let i = 0; i < punkts.length - 1; i++) {
        if (punkts[i].checked) punkts[i].checked = false;
    }
}
function uncheked4() {
    let div = testDiv[2];
    let punkts = div.querySelectorAll('input');
    punkts[4].checked = false;
}
function animate(block, a) {
    if (block != null) {
        if (a == 1) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateInside');
        }
        if (a == 2) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateOut');
        }
        if (a == 3) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateOutBack');
        }
        if (a == 4) {
            deleteAllClasses(block);
            block.offsetWidth;
            block.classList.add('animateInsideBack');
        }
    }
}
function deleteAllClasses(block) {
    block.classList.remove('animateOutBack');
    block.classList.remove('animateInsideBack');
    block.classList.remove('animateInside');
    block.classList.remove('animateOut');
    block.classList.remove('animatePBack');
    block.classList.remove('animateP');
}
function getQuestionTextById(id) {
    // Ищем вопрос по id
    //alert();
    const question = data.questions.find(q => q.id === id);
    // alert(id);
    //alert(question);
    // Если вопрос найден, возвращаем его текст, иначе возвращаем null или сообщение об ошибке
    return question ? question.text : `Вопрос с id ${id} не найден.`;
}
function getElementByIndex(index) {

    let collection = document.getElementsByName('block');

    // Проверяем, находится ли индекс в пределах допустимого диапазона
    if (index >= 0 && index < collection.length) {
        //collection[index].style.background = 'red';
        return collection[index];
    } else {
        // Если индекс вне диапазона, возвращаем null или undefined
        return null;
    }
}
function alertSubmissionData(submissionData) {
    // Инициализируем пустой массив для хранения пар "ключ-значение"
    let entries = [];

    // Используем цикл для итерации по каждому ключу-значению в FormData
    submissionData.forEach((value, key) => {
        // Добавляем каждую пару "ключ-значение" в массив в формате "ключ: значение"
        entries.push(`${key}: ${value}`);
    });

    // Объединяем все элементы массива в одну строку, разделяя их запятыми
    let alertString = entries.join(', ');

    // Выводим строку через alert
    alert(alertString);
}
function removeInputs() {
    input.value = "";
    for (let i = 0; i < testDiv.length; i++) {
        var div = testDiv[i];
        punkts = div.querySelectorAll('input');
        for (let j = 0; j < punkts.length; j++) {
            if (i == 0 & j == 1)
                punkts[j].value = "";
            punkts[j].checked = false;

        }
    }


}
function fly() {
    wingL.classList.add('flyl');
    wingR.classList.add('flyr');
}
function land() {
    wingL.classList.remove('flyl');
    wingR.classList.remove('flyr');
}

const openDialogBtn = document.getElementById('openDialogBtn');
        const dialogBox = document.getElementById('dialogBox');
        const closeBtn = document.getElementById('close-btn');
// Функция для открытия диалогового окна
function openDialog() {
    dialogBox.classList.add('show');
}

// Функция для закрытия диалогового окна
function closeDialog() {
    dialogBox.classList.remove('show');
}

function checkInput(input)
{
    if(input.value != "")
    input.style.background = 'white';
else input.style.background = '#f6b1b1';

}
function closeModal2()
{
    let close = document.querySelector('.modal.modal2');

    close.classList.remove('show');
}
function openModal2(){
    let close = document.querySelector('.modal.modal2');
    close.classList.add('show');
}