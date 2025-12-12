document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const instructionBar = document.getElementById('instruction-bar');
    let currentIndex = -1;
    let gameModeActive = false;

    function toggleGameMode() {
        gameModeActive = !gameModeActive;
        
        if (gameModeActive) {
            // Activate Immersive Mode
            document.body.classList.add('game-active');
            instructionBar.innerText = "SYSTEM OVERRIDE // PRESS [ESC] TO DISCONNECT";
            instructionBar.style.color = "var(--cp-pink)";
            instructionBar.style.borderColor = "var(--cp-pink)";
            
            if (currentIndex === -1) currentIndex = 0;
            highlightItem(currentIndex);
        } else {
            // Deactivate Immersive Mode
            document.body.classList.remove('game-active');
            instructionBar.innerText = "PRESS [ENTER] TO JACK IN";
            instructionBar.style.color = "var(--cp-cyan)";
            instructionBar.style.borderColor = "var(--cp-cyan)";
            
            clearHighlights();
            currentIndex = -1;
        }
    }

    function highlightItem(index) {
        clearHighlights();
        if (index >= 0 && index < navItems.length) {
            const item = navItems[index];
            item.classList.add('game-mode-active');
            
            // Handle scrolling logic
            if (item.classList.contains('game-card')) {
                 item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    function clearHighlights() {
        navItems.forEach(item => item.classList.remove('game-mode-active'));
    }

    document.addEventListener('keydown', (e) => {
        // TOGGLE LOGIC
        if (e.key === 'Enter' && !gameModeActive) {
            e.preventDefault();
            toggleGameMode();
            return;
        }
        if (e.key === 'Escape') {
            if (gameModeActive) toggleGameMode();
            return;
        }

        // NAVIGATION LOGIC
        if (gameModeActive) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex++;
                if (currentIndex >= navItems.length) currentIndex = 0;
                highlightItem(currentIndex);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex--;
                if (currentIndex < 0) currentIndex = navItems.length - 1;
                highlightItem(currentIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const activeItem = navItems[currentIndex];
                
                if (activeItem.tagName === 'A') {
                    activeItem.click();
                } else if (activeItem.onclick) {
                    activeItem.click();
                } else {
                    activeItem.style.transform = "scale(0.95)";
                    setTimeout(() => activeItem.style.transform = "", 100);
                }
            }
        }
    });
});