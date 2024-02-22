document.querySelector('.butt').addEventListener('click', (e => {
    fetch('https://shorturl.at/coyHL')
        .then(res => res.json()).then(res => {
            document.querySelector('.container').innerHTML += res;
        }).catch(error => console.log(error))
}))
