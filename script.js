// ==============================
// Wali Muhammad Landing Page
// script.js
// ==============================


// Navbar Effect

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(90, 93, 94, 0.85)";
        header.style.boxShadow = "0 8px 30px rgb(180, 176, 176)";

    } else {

        header.style.background = "rgba(90, 93, 94, 0.85)";
        header.style.boxShadow = "none";

    }

});


// Scroll Reveal

const reveals = document.querySelectorAll("section,.hero");

function revealElements() {

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        const visible = window.innerHeight - 120;

        if (top < visible) {

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

}

reveals.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(60px)";
    item.style.transition = ".8s ease";

});

window.addEventListener("scroll", revealElements);

revealElements();


// Floating Book Animation

const book = document.querySelector(".hero-right img");

if (book) {

    let angle = 0;

    setInterval(() => {

        angle += 0.03;

        book.style.transform =
            `translateY(${Math.sin(angle) * 10}px)
rotate(${Math.sin(angle) * 2}deg)`;

    }, 30);

}


// Back To Top Button

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "white";
topBtn.style.color = "black";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";
topBtn.style.transition = ".3s";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


// Review Slider

// const reviews = document.querySelectorAll(".review");

// let current = 0;

// function showReview(index) {

//     reviews.forEach((review, i) => {

//         review.style.display = i === index ? "block" : "none";

//     });

// }

// if (reviews.length > 0) {

//     showReview(0);

//     setInterval(() => {

//         current++;

//         if (current >= reviews.length) {

//             current = 0;

//         }

//         showReview(current);

//     }, 4000);

// }


// Active Menu

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(sec => {

        const top = sec.offsetTop - 180;

        if (window.scrollY >= top) {

            currentSection = sec.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


// Mouse Tilt Effect

if (book) {

    document.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.pageX) / 40;

        const y = (window.innerHeight / 2 - e.pageY) / 40;

        book.style.filter = "drop-shadow(0 30px 60px rgba(0,0,0,.6))";

        book.style.transform =
            `rotateY(${x}deg)
rotateX(${y}deg)`;

    });

}


// Console Message

console.log("%cWali Muhammad", "font-size:30px;color:white;background:black;padding:10px;");
console.log("Designed by Muhammad Faizan");

// ===============================
// PRE-ORDER SYSTEM
// ===============================

// EmailJS SDK load (اگر HTML میں شامل نہیں کیا)
const emailScript = document.createElement("script");
emailScript.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
document.head.appendChild(emailScript);

emailScript.onload = () => {

    // یہاں بعد میں اپنی Public Key لکھیں
    emailjs.init({
        publicKey: "-SDBPZsZe3CxpRVrJ"
    });

};

const form = document.getElementById("preorderForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !phone || !address) {

            alert("Please fill all fields.");

            return;

        }

        // Generate Random Order Code

        const orderCode =
            "WM-" +
            Math.floor(100000 + Math.random() * 900000);

        document.getElementById("orderCode").innerText = orderCode;

        document.getElementById("successBox").style.display = "block";

        document
            .getElementById("successBox")
            .scrollIntoView({

                behavior: "smooth"

            });

        // EmailJS

        emailjs.send(

            "service_7j78pdk",

            "template_zczbuna",

            {

                customer_name: name,

                customer_phone: phone,

                customer_address: address,

                order_code: orderCode

            }

        ).then(() => {

            console.log("Email Sent");

        }).catch((err) => {

            console.log(err);

            alert("Email could not be sent.");

        });

        this.reset();

    });

}

// ===============================
// COPY ORDER CODE
// ===============================

const copyBtn = document.getElementById("copyCode");

if (copyBtn) {

    copyBtn.addEventListener("click", function () {

        const code =
            document.getElementById("orderCode").innerText;

        navigator.clipboard.writeText(code);

        this.innerText = "✅ Copied";

        setTimeout(() => {

            this.innerText = "Copy Code";

        }, 2000);

    });

}
