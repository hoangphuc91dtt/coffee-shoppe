const cards = document.querySelector(".popular__card-list");
const btnshop = document.querySelector(".navbar__shop");
const btngiohang = document.querySelector(".navbar__giohang");
const addgiohang = document.querySelector("#giohang");
const hiddenElement = document.querySelectorAll(".hidden");

const arrGioHang = [];
function renderCardInCart(obj) {
    arrGioHang.push(obj);

    console.log(arrGioHang);
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

function renderHomepage() {
    fetch("https://6369cb9028cd16bba72488d3.mockapi.io/coffee")
        .then((res) => res.json())
        .then((data) => {
            cards.innerHTML = data
                .map(
                    (obj) => ` <div class="popular__card " card-id="${obj.id}" >
        <div class="popular__rating">
            <img
                src="./img/rating_product.png"
                alt=""
            />
        </div>
        <div class="popular__card--img ">
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

            muahang();
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
            console.log(entry);

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });
    hiddenElement.forEach((el) => observer.observe(el));
}

function homepage() {
    renderHomepage();
    giohang();
    muahang();
    hiddenElm();
}

homepage();
