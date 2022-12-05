let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnSignup = document.querySelector(".btn-signup");
let btnLogin = document.querySelector(".btn-login");

btnSignup.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (!username.value || !email.value || !password.value) {
                alert("vui long nhap day du thong tin");
            } else {
                alert("dang ky thanh cong");
            }
        })
        .catch((error) => console.log(error));
});
