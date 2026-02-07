const heartsContainer = document.getElementById('hearts');

function createHeart() {
    const heart = document.createElement('div');
    const sizes = ['small', 'medium', 'large', ''];
    const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '💘'];
    
    heart.className = 'heart ' + sizes[Math.floor(Math.random() * sizes.length)];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 400);

function showCongrats() {
    // Create I LOVE YOU drops immediately
    createLoveDrops();
    
    const modal = document.getElementById('congratsModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Create heart burst
    for (let i = 0; i < 40; i++) {
        setTimeout(createHeart, i * 80);
    }
}

function createLoveDrops() {
    const styles = ['style-1', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', ''];
    const messages = ['I LOVE YOU', 'I ❤️ YOU', 'I LOVE U', '❤️ LOVE ❤️', 'I ♥ YOU', 'LOVE YOU', '💕 I LOVE YOU 💕'];
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Get modal center area to avoid (with padding)
    const modalCenterX = vw / 2;
    const modalCenterY = vh / 2;
    const avoidWidth = 500;  // Width to avoid around modal
    const avoidHeight = 400; // Height to avoid around modal
    
    // Create drops spread across entire page, avoiding modal area
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.className = 'love-drop ' + styles[Math.floor(Math.random() * styles.length)];
            drop.textContent = messages[Math.floor(Math.random() * messages.length)];
            
            let x, y;
            let attempts = 0;
            
            // Try to find position not covering modal
            do {
                x = Math.random() * vw;
                y = -Math.random() * 200 - 50; // Start from above viewport
                attempts++;
                
                // Check if position will cross modal area during fall
                const willCrossModal = (
                    x > (modalCenterX - avoidWidth / 2) && 
                    x < (modalCenterX + avoidWidth / 2)
                );
                
                if (!willCrossModal || attempts > 5) {
                    break;
                }
            } while (attempts < 10);
            
            drop.style.left = x + 'px';
            drop.style.top = y + 'px';
            drop.style.animationDelay = '0s';
            drop.style.animationDuration = (Math.random() * 2.5 + 3) + 's';
            
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 7000);
        }, i * 30);
    }
}

function closeCongrats() {
    const modal = document.getElementById('congratsModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

const messages = [
    'ভেবে বলছো?',
    'আবার ভাবো',
    'পরে পস্তাবা',
    'প্লিইইইজজজজজ🥺',
    'একটু ভাবো 🥺'
];
let msgIndex = 0;
let floatingMsg = null;
let noVisible = true;

function showFloatingMessage() {
    // আগের মেসেজ থাকলে মুছে ফেলি
    if (floatingMsg) {
        floatingMsg.remove();
    }

    floatingMsg = document.createElement('div');
    floatingMsg.className = 'floating-message';
    floatingMsg.textContent = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const margin = 40;
    const randX = Math.random() * (vw - margin * 2) + margin;
    const randY = Math.random() * (vh - margin * 2) + margin;

    floatingMsg.style.left = randX + 'px';
    floatingMsg.style.top = randY + 'px';

    document.body.appendChild(floatingMsg);
}

function hideNoButtonAndShowMessage() {
    if (!noVisible) return;
    noBtn.style.display = 'none';
    noVisible = false;
    showFloatingMessage();
}

function restoreNoButton() {
    if (noVisible) return;
    noBtn.style.display = 'inline-block';
    noBtn.style.position = 'absolute';
    noBtn.style.left = '50%';
    noBtn.style.top = '0';
    noBtn.style.transform = 'translateX(-50%)';
    noVisible = true;

    if (floatingMsg) {
        floatingMsg.remove();
        floatingMsg = null;
    }
}

// ডেস্কটপ: hover করলে "কখনোই না" গায়েব + মেসেজ
noBtn.addEventListener('mouseenter', hideNoButtonAndShowMessage);

// মোবাইল: ট্যাপ করলে গায়েব + মেসেজ
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    hideNoButtonAndShowMessage();
});

// "অবশ্যই আমি শুধু তোমার" এর উপর কার্সর এলে "কখনোই না" আবার ফিরে আসবে
yesBtn.addEventListener('mouseenter', restoreNoButton);

// মোবাইলের জন্য: ট্যাপ করলে আবার দেখানো
yesBtn.addEventListener('click', function() {
    restoreNoButton();
});

window.addEventListener('resize', () => {
    if (noVisible) {
        noBtn.style.left = '50%';
        noBtn.style.top = '0';
        noBtn.style.transform = 'translateX(-50%)';
    }
});
