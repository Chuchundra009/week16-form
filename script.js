const myForm = document.forms.oneForm;
const pText = document.querySelectorAll('p');


    // Валидация прописанная
    function checkValidity(input) {
        function setError(text) {
            input.nextSibling.textContent = text;
            input.classList.add('error');
        }

        setError('');
        input.classList.remove('error');

        let validity = input.validity;

        if (validity.rangeUnderflow) {
            setError('Значение меньше минимально допустимого');
            return false;
        }

        if (validity.rangeOverflow) {
            setError('Значение больше максимального допустимого');
            return false;
        }

        if (validity.tooShort) {
            setError('Значение слишком короткое');
            return false;
        }

        if (validity.tooLong) {
            setError('Значение слишком длинное');
            return false;
        }

        if (validity.valueMissing) {
            setError('Необходимо заполнить поле');
            return false;
        }

        if (validity.patternMismatch) {
            setError('Неверный формат заполнения');
            return false;
        }

        return true;
    }


    //проверка каждого input на валидность

    const inputs = document.querySelectorAll('input');
    const allInputs = Array.from(inputs);

    function checkAll() {
        let ok = true;

        for (let input of allInputs) {
            if (!checkValidity(input)) ok = false;
        }

         //Проверка совпадения паролей

         const newPassword = myForm.elements.newPassword;
         const passwordTwo = myForm.elements.passwordTwo;

         if (passwordTwo.value !== newPassword.value) {
            passwordTwo.nextSibling.textContent = 'Пароли не совпадают';
            ok = false;
         }

         return ok;
    }

    //отмена отправки если не отметить чекбокс
    const choceCheck = myForm.elements.secondCheckbox; //доступ чекбокс

    const submButton = myForm.elements.sendForm; // доступ к кнопке
    submButton.disabled = 1;

    choceCheck.addEventListener('change', () => {
        	if (choceCheck.checked) {
        		submButton.disabled = 0;
        	} else {
        		submButton.disabled = 1;
        	}
        })


    myForm.addEventListener('submit', (e) =>{
        e.preventDefault(); //отмена отправки

        let ok = checkAll();
        if (ok) allInputs.forEach(x => {
            console.log(x.value);
        })
    });