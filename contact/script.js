document.addEventListener('DOMContentLoaded', function() {
  // فعال کردن FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      question.classList.toggle('active');
      answer.classList.toggle('active');
      
      if (question.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });

  // اعتبارسنجی فرم تماس
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      
      // اعتبارسنجی ساده
      if (!name || !phone || !subject || !message) {
        alert('لطفاً تمام فیلدهای ضروری را پر کنید.');
        return;
      }
      
      if (!/^09\d{9}$/.test(phone)) {
        alert('لطفاً شماره تماس معتبر وارد کنید (مثال: 09123456789)');
        return;
      }
      
      // در اینجا می‌توانید کد ارسال فرم به سرور را اضافه کنید
      alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
      contactForm.reset();
    });
  }

  // انیمیشن اسکرول
  const sections = document.querySelectorAll('section');
  
  const checkVisibility = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      
      if (sectionTop < window.innerHeight * 0.8 && sectionBottom > 0) {
        section.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // بررسی اولیه
});
