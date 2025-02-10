let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// نمایش خودکار هر ۳ ثانیه
setInterval(nextSlide, 3000);

// نمایش اسلاید اول در ابتدا
showSlide(currentSlide);
let startX = 0;
let endX = 0;

document.querySelector(".slider").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        nextSlide(); // سوایپ به چپ (نمایش اسلاید بعدی)
    } else if (startX < endX - 50) {
        prevSlide(); // سوایپ به راست (نمایش اسلاید قبلی)
    }
});

function checkRepairStatus() {
    var trackingCode = document.getElementById("trackingCode").value.trim();

    if (!trackingCode) {
        alert("لطفاً کد رهگیری خود را وارد کنید.");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbweltzUBQ87stkZfzepp1hozJB8gHncdOotlkRf9KN6PZWAXIuOFYr3-tKsgNeMpgs_/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "trackingCode=" + encodeURIComponent(trackingCode)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            document.getElementById("repairStatus").innerHTML = "🔍 وضعیت تعمیر: " + data.status;
        } else {
            document.getElementById("repairStatus").innerHTML = "❌ کد رهگیری یافت نشد.";
        }
    })
    .catch(error => {
        console.error("⚠️ خطا در دریافت اطلاعات:", error);
        document.getElementById("repairStatus").innerHTML = "❗ خطا در ارتباط با سرور. لطفاً بعداً امتحان کنید.";
    });
}
