const authors = document.querySelector(".testimonial__author-list");
const cards = document.querySelector(".popular__card-list");
const cardsMenu = document.querySelector(".popular__card-list2");
const btnshop = document.querySelector(".navbar__shop");
const btngiohang = document.querySelector(".navbar__giohang");
const addgiohang = document.querySelector("#giohang");
const hiddenElement = document.querySelectorAll(".hidden");
const navbarHidden = document.querySelectorAll(".navbar__link");

const arrGioHang = [];
function renderCardInCart(obj) {
    arrGioHang.push(obj);

    // console.log(arrGioHang);
    addgiohang.innerHTML = arrGioHang
        .map(
            (obj) => `
    <div class="navbar__giohang--sanpham">
        <div class="navbar__giohang--image">
            <img src="${obj.img}" alt="" />
        </div>
        <div class="navbar__giohang--name">${obj.name}</div>
        <div class="navbar__giohang--cost">${obj.cost} K</div>
        <div class="navbar__giohang--x"> <button class="clean">X</button> </div>
    </div>
    `
        )
        .join("");
}

function renderCoffee() {
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/coffee")
        .then((res) => res.json())
        .then((data) => {
            cards.innerHTML = data
                .map(
                    (obj) => ` <div class="popular__card" card-id="${obj.id}" >
        <div class="popular__rating">
            <img
                src="./img/rating_product.png"
                alt=""
            />
        </div>
        <div class="popular__card--img">
            <img
                src=${obj.img}
                alt=""
            />
        </div>
        <div class="popular__card--info">
            <div class="popular__card--name">
                ${obj.name}
            </div>
            <div class="popular__card--cost">${obj.cost} K</div>
        </div>
        <div class="popular__card--decribe">
            <div class="popular__card--btn">Hot</div>
            <div class="popular__card--btn">Cold</div>
            <div class="popular__card--buy">
                <img
                    src="./img/card.png"
                    alt=""
                />
            </div>
        </div>
    </div>`
                )
                .slice(0, 3)
                .join("");

            //  cards.innerHTML = data
            cardsMenu.innerHTML = data
                .map(
                    (obj) => ` <div class="popular__card " card-id="${obj.id}" >
                    <div class="popular__rating">
                        <img
                            src="./img/rating_product.png"
                            alt=""
                        />
                    </div>
                    <div class="popular__card--img">
                        <img
                            src=${obj.img}
                            alt=""
                        />
                    </div>
                    <div class="popular__card--info">
                        <div class="popular__card--name">
                            ${obj.name}
                        </div>
                        <div class="popular__card--cost">${obj.cost} K</div>
                    </div>
                    <div class="popular__card--decribe">
                    <div class="popular__card--subline">
                        ${obj.subline}
                    </div>
                        <div class="popular__card--buy">
                            <img
                                src="./img/card.png"
                                alt=""
                            />
                        </div>
                    </div>
                    </div>`
                )
                .slice(4, 13)
                .join("");
            muahang();
        });
}
function renderUser() {
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/user")
        .then((res) => res.json())
        .then((data) => {
            authors.innerHTML = data
                .map(
                    (obj) => `<div class="testimonial__author">
                    <div class="testimonial__author--avt">
                        <img src="${obj.avt}" alt="" />
                    </div>
                    <div class="testimonial__author--info">
                        <div class="testimonial__author--name">
                            ${obj.name}
                        </div>
                        <div class="testimonial__author--title">
                            I really love the cappucino, the coffee
                            was very smooth
                        </div>
                    </div>
                </div>`
                )
                .slice(0, 3)
                .join("");
        });
}

function getCoffeeId(id) {
    fetch(`https://6369cb9028cd16bba72488d3.mockapi.io/coffee/${id}`)
        .then((res) => res.json())
        .then((data) => {
            renderCardInCart(data);
        });
}

function giohang() {
    btnshop.addEventListener("click", (e) => {
        e.preventDefault();
        btngiohang.classList.toggle("disable");
    });
}

function muahang() {
    const btncard = document.querySelectorAll(".popular__card");
    btncard.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idCard = btn.getAttribute("card-id");
            getCoffeeId(idCard);
        });
    });
}

function cleangiohang() {
    const clean = document.querySelectorAll(".clean");
    const sanpham = document.querySelectorAll(".navbar__giohang--sanpham");
    clean.forEach((btn) => {
        btn.addEventListener("click", () => {
            sanpham.forEach((sp) => {
                sp.innerHTML = "";
            });
        });
    });
}

function hiddenElm() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });
    hiddenElement.forEach((el) => observer.observe(el));
}

function navbarActive() {
    navbarHidden.forEach((button) => {
        button.addEventListener("click", () => {
            removeClass();
            button.classList.add("active");
        });
    });
}

function removeClass() {
    navbarHidden.forEach((button) => {
        button.classList.remove("active");
    });
}

function homepage() {
    navbarActive();
    renderCoffee();
    renderUser();
    giohang();
    muahang();
    hiddenElm();
}

homepage();
