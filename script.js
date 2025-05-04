<script>
  let slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // شروع نمایش اولیه
  showSlide(currentSlide);

  // تعویض خودکار هر 5 ثانیه
  setInterval(nextSlide, 5000);
</script>

// انتخاب عناصر مورد نیاز
const hamburger = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.main-nav');
const overlay = document.querySelector('.overlay');

// تابع باز و بسته کردن منو
function toggleMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');
}

// بستن منو هنگام کلیک روی هر لینک منو
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// بستن منو با کلیک روی Overlay
overlay.addEventListener('click', toggleMenu);

// باز و بسته کردن با کلیک روی آیکن منو (در فایل HTML هم روی آیکن `onclick="toggleMenu()"` هست)

// بستن منو با کلید Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
  }



  document.getElementById("trackingCode").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkRepairStatus(); // جستجو به محض فشردن اینتر
    }
});

// تابع کپی اطلاعات بانکی
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        // نمایش پیام موفقیت
        const originalText = element.innerText;
        element.innerText = "کپی شد!";
        
        // بازگشت به متن اصلی پس از 2 ثانیه
        setTimeout(() => {
            element.innerText = originalText;
        }, 2000);
    }).catch(err => {
        console.error('خطا در کپی کردن: ', err);
    });
}

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

// نمایش آیکون پس از اسکرول کاربر
window.addEventListener('scroll', function() {
    const whatsappSupport = document.querySelector('.whatsapp-support');
    if (window.scrollY > 300) {
        whatsappSupport.style.display = 'block';
    } else {
        whatsappSupport.style.display = 'none';
    }
});
