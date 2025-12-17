/**
 * JATIM WONDERLUST - Advanced Interactive Script
 * Fitur: Scroll Animations, Filter Logic, Navbar Effects, & Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL EFFECT ---
    // Mengubah tampilan navbar saat di-scroll agar tetap rapi dan kontras
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 5%';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '20px 5%';
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 2. FILTER CATEGORY LOGIC ---
    // Menampilkan/menyembunyikan destinasi berdasarkan kategori tanpa reload halaman
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Hapus class active dari tombol lain
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.textContent.toLowerCase();

            tourCards.forEach(card => {
                const cardCategory = card.querySelector('.tag').textContent.toLowerCase();
                
                // Animasi keluar
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    if (selectedCategory === 'semua' || cardCategory.includes(selectedCategory)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // --- 3. SCROLL REVEAL ANIMATION ---
    // Efek elemen muncul perlahan saat pengguna melakukan scroll ke bawah
    const revealElements = document.querySelectorAll('.tour-card, .section-header');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    };

    // Set initial state untuk elemen yang akan di-reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Jalankan sekali saat load

    // --- 4. SMOOTH SCROLL FOR ANCHORS ---
    // Membuat pergerakan scroll ke section tertentu menjadi halus
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. INTERACTIVE IMAGE PARALLAX ---
    // Efek gambar bergerak sedikit mengikuti kursor pada Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX * -0.02);
            const moveY = (e.clientY * -0.02);
            hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        });
    }

    // --- 6. SIMPLE ALERT UNTUK DETAIL BUTTON ---
    const detailBtns = document.querySelectorAll('.btn-view');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.closest('.card-body').querySelector('h3').innerText;
            alert(`Menuju halaman detail destinasi: ${title}\n(Fitur ini bisa dihubungkan ke API atau Page baru)`);
        });
    });
});
