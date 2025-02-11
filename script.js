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

    fetch("https://script.google.com/macros/s/AKfycbz9jGvUbIHLx1jM0119k74lBZsHueKKsn9KtcHFY3zFbFx-Zmh3KZrZrMUSPGFvIYKS/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ trackingCode: trackingCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            document.getElementById("repairStatus").innerHTML = "🔍 وضعیت تعمیر: " + data.status;

            // بررسی و نمایش توضیحات مناسب بر اساس وضعیت
            let description = "";
            switch (data.status) {
                case "دریافت دستگاه":
                    description = "دستگاه هنوز از شما تحویل گرفته نشده است.";
                    break;
                case "در حال تعمیر":
                    description = "دستگاه به دست کارشناس فنی ما در راچار رسیده و در حال تعمیر می‌باشد.";
                    break;
                case "تعمیر شده":
                    description = "دستگاه شما تعمیر شده و در اولین فرصت خدمت شما تحویل داده می‌شود.";
                    break;
                case "تحویل مشتری":
                    description = "دستگاه شما تعمیر و به شما تحویل داده شده است.";
                    break;
                default:
                    description = "وضعیت نامشخص. لطفاً با پشتیبانی تماس بگیرید.";
            }
            document.getElementById("repairDescription").innerHTML = description;

            // نمایش هزینه در تمام مراحل در صورتی که مقدار آن مشخص باشد
            if (data.cost && data.cost !== "مشخص نشده") {
                document.getElementById("repairCost").innerHTML = "💰 هزینه تعمیر: " + data.cost + " تومان";
            } else {
                document.getElementById("repairCost").innerHTML = "💰 هزینه مشخص نشده";
            }
        } else {
            document.getElementById("repairStatus").innerHTML = "❌ کد رهگیری یافت نشد.";
            document.getElementById("repairDescription").innerHTML = "لطفاً مجدداً بررسی کنید.";
            document.getElementById("repairCost").innerHTML = "";
        }
    })
    .catch(error => {
        console.error("⚠️ خطا در دریافت اطلاعات:", error);
        document.getElementById("repairStatus").innerHTML = "❗ خطا در ارتباط با سرور. لطفاً بعداً امتحان کنید.";
        document.getElementById("repairDescription").innerHTML = "";
        document.getElementById("repairCost").innerHTML = "";
    });
}
