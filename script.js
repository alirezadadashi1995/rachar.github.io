document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                // بستن سایر آکاردئون‌ها
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.classList.remove('show');
                });
                document.querySelectorAll('.accordion-button').forEach(item => {
                    item.classList.remove('active');
                });
                
                // باز کردن آکاردئون فعلی
                this.classList.add('active');
                content.classList.add('show');
            }
        });
    });
});


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
