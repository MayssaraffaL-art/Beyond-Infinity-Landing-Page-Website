/**
 * ORION SPACE EXPLORER - UPDATED SCRIPT
 * Tanpa API Key (Menggunakan Hardcoded Image URLs yang Akurat)
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderPlanets();
    setupScrollAnimation();
    setupCounterAnimation();
}

/* ----------------------------------------------------------------
   1. DATA PLANET DATABASE (UPDATED IMAGE URLs)
   Gambar diambil dari Wikimedia Commons (NASA Missions)
---------------------------------------------------------------- */
const solarData = [
    {
        name: "Mercury",
        type: "Terrestrial",
        moons: 0,
        temp: "167°C",
        desc: "Planet terkecil. Permukaannya penuh kawah mirip Bulan kita.",
        // Gambar dari Misi MESSENGER NASA
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg" 
    },
    {
        name: "Venus",
        type: "Terrestrial",
        moons: 0,
        temp: "464°C",
        desc: "Diselimuti awan asam sulfat tebal yang memerangkap panas.",
        // Gambar dari Misi Mariner 10 / Pemrosesan modern
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg" 
    },
    {
        name: "Earth",
        type: "Terrestrial",
        moons: 1,
        temp: "15°C",
        desc: "Rumah kita. 71% permukaannya tertutup air.",
        // Gambar ikonik 'Blue Marble' Apollo 17
        img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg" 
    },
    {
        name: "Mars",
        type: "Terrestrial",
        moons: 2,
        temp: "-65°C",
        desc: "Warna merah berasal dari oksida besi (karat) di tanahnya.",
        // Gambar OSIRIS
        img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg" 
    },
    {
        name: "Jupiter",
        type: "Gas Giant",
        moons: 95,
        temp: "-110°C",
        desc: "Raksasa gas terbesar. Melindungi Bumi dari banyak asteroid.",
        // Gambar dari Misi Cassini
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg" 
    },
    {
        name: "Saturn",
        type: "Gas Giant",
        moons: 146,
        temp: "-140°C",
        desc: "Sistem cincinnya terbuat dari miliaran partikel es dan batu.",
        // Gambar dari Misi Cassini
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg" 
    },
    {
        name: "Uranus",
        type: "Ice Giant",
        moons: 27,
        temp: "-195°C",
        desc: "Menggelinding di orbitnya karena kemiringan poros 98 derajat.",
        // Gambar dari Voyager 2
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg" 
    },
    {
        name: "Neptune",
        type: "Ice Giant",
        moons: 14,
        temp: "-200°C",
        desc: "Memiliki angin tercepat di tata surya (2000 km/jam).",
        // Gambar dari Voyager 2
        img: "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg" 
    }
];

function renderPlanets() {
    const container = document.getElementById('planet-container');
    
    solarData.forEach(planet => {
        const card = document.createElement('div');
        card.classList.add('planet-card', 'hidden-element');
        
        card.innerHTML = `
            <img src="${planet.img}" alt="${planet.name}" class="planet-img">
            <h3 class="planet-name">${planet.name}</h3>
            <ul class="planet-details">
                <li>Tipe: <span>${planet.type}</span></li>
                <li>Satelit: <span>${planet.moons}</span></li>
                <li>Suhu: <span>${planet.temp}</span></li>
            </ul>
            <p style="font-size: 0.85rem; margin-top:15px; color:#bbb; line-height:1.4;">${planet.desc}</p>
        `;
        
        container.appendChild(card);
    });
}

/* ----------------------------------------------------------------
   2. SCROLL ANIMATION (Sama seperti sebelumnya)
---------------------------------------------------------------- */
function setupScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------
   3. NUMBER COUNTER (Sama seperti sebelumnya)
---------------------------------------------------------------- */
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Helper Scroll Button
window.scrollToSection = function(id) {
    const el = document.getElementById(id);
    if(el) {
        window.scrollTo({
            top: el.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}