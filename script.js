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

document.getElementById("trackingCode").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkRepairStatus(); // جستجو به محض فشردن اینتر
    }
});

function checkRepairStatus() {
    var trackingCode = document.getElementById("trackingCode").value.trim();

    if (!trackingCode) {
        alert("لطفاً کد رهگیری خود را وارد کنید.");
        return;
    }

    // نمایش حالت جستجو
    document.getElementById("repairStatus").innerHTML = "🔄 در حال جستجو...";
    document.getElementById("repairDescription").innerHTML = "";
    document.getElementById("repairCost").innerHTML = "";

    var url = "https://script.google.com/macros/s/AKfycbyzm8ROXOp7tKMnDWEAkvEbSsELmQUyhZneuB_UcdjNei4qHhhl9kQ0ZQc29N5v9VZf/exec?trackingCode=" + trackingCode;

    fetch(url)
        .then(response => {
            // بررسی نوع پاسخ و اطمینان از این که JSON است
            if (!response.ok) {
                throw new Error('خطا در دریافت اطلاعات');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                document.getElementById("repairStatus").innerHTML = "❌ " + data.error;
            } else {
                document.getElementById("repairStatus").innerHTML = "📌 وضعیت تعمیر: " + data.status;
                document.getElementById("repairDescription").innerHTML = "📄 توضیحات: " + data.description;
                document.getElementById("repairCost").innerHTML = "💰 هزینه تعمیر: " + data.cost + " تومان";
            }
        })
        .catch(error => {
            document.getElementById("repairStatus").innerHTML = "❌ خطا در دریافت اطلاعات!";
            console.error("Error:", error);
        });
}

