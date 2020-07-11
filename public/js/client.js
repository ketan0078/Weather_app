const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");




var myKey = config.SECRET_KEY;
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    msg1.innerHTML = "Loading ...";
    msg2.innerHTML = "";
    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.err) {
                    msg1.innerHTML = data.err;
                } else {

                    msg1.innerHTML = data.location;
                    msg2.innerHTML = data.forecast;
                }
            });
        });
});