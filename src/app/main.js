let form, formGroups, firstName, lastName, email, password

let isInvalid = false

//form Selector
form = document.querySelector('form')
formGroups = document.querySelectorAll('.form__group')
submitBtn = document.querySelector('.form__btn')
firstName = form['firstName']
lastName = form['lastName']
email = form['email']
password = form['password']

form.addEventListener('submit', onSubmit)
resetInput()


console.log(formGroups)

function onSubmit(e) {
    e.preventDefault()
    validForm()
}

function showInvalidInputs(el) {
    if(!el.previousElementSibling) return
    if(!el.nextElementSibling) return
    el.previousElementSibling.style.display = 'block'
    el.nextElementSibling.style.display = 'block'
    el.classList.add('input--error')
}

function hideInvalidInputs(el){
    el.nextElementSibling.style.display = 'none'
    el.previousElementSibling.style.display = 'none'
    el.classList.remove('input--error')
}

function validForm() {
    let formInputs = [...form.elements]
    formInputs.forEach((input, idx) => {
        if (!input.value && input.name != 'email') {
            showInvalidInputs(input)
            isInvalid = true
            input.value = ''
        }

        if (input['name'] == 'email') {
            if (!isAValidEmail(input.value)) {
                showInvalidInputs(input)
                isInvalid = true
                input.value = 'email@example.com'
            }
        }
    })
}

function resetInput() {
    let formInputs = [...form.elements]

    formInputs.forEach((input, idx) => {
        input.addEventListener('focus', e => {
                hideInvalidInputs(input)
            })
    })
}

function isAValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}