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

    fetch("https://script.google.com/macros/s/AKfycbzGjFiVFQ4T66xvjX7JTb6zNkwGrO3I1h3MSLquVpxVSRhewfDkYr8YCC2uBMB2LHZR/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ trackingCode: trackingCode })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            document.getElementById("repairStatus").innerHTML = "🔍 وضعیت تعمیر: " + data.status;

            let description = "";
            let costText = ""; // برای نمایش هزینه

            // اگر مقدار هزینه دارای عبارت اضافی باشد، فقط عدد را استخراج می‌کنیم
            let costValue = data.cost ? data.cost.replace(/[^0-9]/g, "") : "";

            switch (data.status) {
                case "دریافت دستگاه":
                    description = "دستگاه هنوز از شما تحویل گرفته نشده است.";
                    break;
                case "در حال تعمیر":
                    description = "دستگاه به دست کارشناس فنی ما در راچار رسیده و در حال تعمیر می‌باشد.";
                    if (costValue) {
                        costText = "💰 حدود هزینه تعمیر: " + costValue + " تومان";
                    }
                    break;
                case "تعمیر شده":
                    description = "دستگاه شما تعمیر شده و در اولین فرصت خدمت شما تحویل داده می‌شود.";
                    if (costValue) {
                        costText = "💰 هزینه تعمیر: " + costValue + " تومان";
                    }
                    break;
                case "تحویل مشتری":
                    description = "دستگاه شما تعمیر و به شما تحویل داده شده است.";
                    if (costValue) {
                        costText = "💰 هزینه تعمیر: " + costValue + " تومان";
                    }
                    break;
                default:
                    description = "وضعیت نامشخص. لطفاً با پشتیبانی تماس بگیرید.";
            }

            document.getElementById("repairDescription").innerHTML = description;
            document.getElementById("repairCost").innerHTML = costText;
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
