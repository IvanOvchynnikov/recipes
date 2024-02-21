document.querySelector('.window__close').addEventListener('click', (e) => {
    console.log('click')
    const error= document.querySelector('.window').lastElementChild;
    document.querySelector('.window').removeChild(error);
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.modal').style.opacity = 0
})
const create_acc = document.querySelector('.create__account');
const password = document.querySelector('[name="password"]');
const confirmed_password = document.querySelector('[name="confirmed_password"]');
document.querySelector("#signUpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (password.value === confirmed_password.value) {
        const form = e.target;
        let body = new FormData(form);
        body = Object.fromEntries(body);
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                window.location.href = response.url
            } else if (response.status === 400) {
                response.json().then(res=>{
                    createModal(res.message);
                })
            }
        })
    } else {
       createModal('Passwords are not identical!')
    }
})
const createModal = (message)=>{
    document.querySelector('.modal').style.display = 'flex'
    document.querySelector('.modal').style.opacity = 1

    const error = document.createElement('p');
    error.textContent = message;

    document.querySelector('.window').appendChild(error);
}