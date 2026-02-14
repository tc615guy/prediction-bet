/* ============================================
   prediction.bet — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // === Navbar Scroll Effect ===
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // === Mobile Menu Toggle ===
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        var menuLinks = mobileMenu.querySelectorAll('a');
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        }
    }

    // === Scroll-triggered Reveal Animations ===
    // Only animate cards and section headers NOT inside the offer section
    var revealSelectors = '.opp-card, .stat-card, .benefit-card, .urgency-card';
    var revealEls = document.querySelectorAll(revealSelectors);

    for (var i = 0; i < revealEls.length; i++) {
        revealEls[i].classList.add('reveal');
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        observer.observe(reveals[i]);
    }

    // === Stats Counter Animation ===
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'));
                var hasPrefix = el.textContent.indexOf('$') === 0;
                var duration = 2000;
                var startTime = performance.now();

                function animate(currentTime) {
                    var elapsed = currentTime - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var current = Math.round(eased * target);
                    el.textContent = hasPrefix ? '$' + current : '' + current;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    for (var i = 0; i < statNumbers.length; i++) {
        counterObserver.observe(statNumbers[i]);
    }

    // === Smooth Scroll for Anchor Links ===
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                var offset = navbar.offsetHeight + 20;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    }

    // === Formspree AJAX Form Submission (from Formspree docs) ===
    var form = document.getElementById('my-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById('my-form-status');
        var data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                status.innerHTML = 'Thanks for your submission! We\'ll be in touch within 24-48 hours.';
                status.style.color = '#00e676';
                form.reset();
            } else {
                response.json().then(function(data) {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data['errors'].map(function(error) { return error['message']; }).join(', ');
                    } else {
                        status.innerHTML = 'Oops! There was a problem submitting your form.';
                    }
                });
            }
        }).catch(function(error) {
            status.innerHTML = 'Oops! There was a problem submitting your form.';
        });
    }

});
