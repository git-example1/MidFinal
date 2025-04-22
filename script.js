document.addEventListener('mousemove', (event) => { 
    const menu = document.querySelector('.menu');
    if (event.clientY <= 250) {
        menu.classList.add('show'); // 添加顯示類別
    } else {
        menu.classList.remove('show'); // 移除顯示類別
    }
});


// ------------------------------------------------- // 

class MysticalCards {
	constructor() {
		// DOM elements
		this.cardsContainer = document.getElementById("cards-container");
		this.messageContainer = document.getElementById("message-container");
		this.messageTitle = document.getElementById("message-title");
		this.messageText = document.getElementById("message-text");
		this.reshuffleBtn = document.getElementById("reshuffle-btn");
		this.canvas = document.getElementById("particle-canvas");
		this.ctx = this.canvas.getContext("2d");

		// Cards data
		this.cards = [
			{
				symbol: "✨",
				title: "Star 星星",
				description: "Hope and inspiration",
				fortune:
					"一個新的機會將為你的生活帶來意想不到的喜悅。相信你的直覺，它會引導你前進。"
			},
			{
				symbol: "🌙",
				title: "Moon 月亮",
				description: "Intuition and mystery",
				fortune:
					"隱藏的真相即將揭示。留意你的夢境，因為其中蘊含著重要的訊息。"
			},
			{
				symbol: "☀️",
				title: "Sun 太陽",
				description: "Success and positivity",
				fortune:
					"一段成長與幸福的時期即將來臨。你的努力很快就會以壯麗的方式獲得回報。"
			},
			{
				symbol: "⚡",
				title: "Tower 高塔",
				description: "Sudden change",
				fortune:
					"這是一張象徵劇變的牌，它代表生活中的某些結構（信念、人際關係、工作等）將被迫瓦解。但這個「毀壞」其實是必要的，因為它打破了不穩定的根基，讓你有機會重新建立更真實、更穩固的未來。"
			},
			{
				symbol: "🔮",
				title: "Magician 魔術師",
				description: "Manifestation and power",
				fortune:
					"你就像魔術師一樣，擁有將抽象轉化為具體的能力。現在是將夢想付諸實現的黃金時刻，只要你相信自己，並善用手中的工具。"
			},
			{
				symbol: "🌊",
				title: "Ocen 海洋",
				description: "Emotions and intuition",
				fortune:
					"相信你情緒的起伏流動。如果你敞開心扉，一段深刻的連結正在等待著你。"
			}
		];

		// Particle system
		this.particles = [];
		this.particleColors = ["#9969ff", "#ff69a1", "#69b4ff", "#ff9f69"];

		// State
		this.selectedCard = null;
		this.isRevealed = false;

		// Initialize
		this.init();
	}

	init() {
		// Create cards
		this.createCards();

		// Setup canvas
		this.setupCanvas();

		// Add event listeners
		this.reshuffleBtn.addEventListener("click", this.reshuffleCards.bind(this));

		// Start particle animation
		this.animateParticles();
	}

	createCards() {
		this.cardsContainer.innerHTML = "";

		// Shuffle the cards order
		const shuffledCards = [...this.cards].sort(() => Math.random() - 0.5);

		// Create and append card elements
		shuffledCards.forEach((card, index) => {
			const cardElement = document.createElement("div");
			cardElement.className = "card";
			cardElement.innerHTML = `
                <div class="card-face card-back"></div>
                <div class="card-face card-front">
                    <div class="card-symbol">${card.symbol}</div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-desc">${card.description}</div>
                </div>
            `;

			// Add event listeners
			cardElement.addEventListener("click", () =>
				this.selectCard(cardElement, card)
			);

			// Add a slight random rotation for natural look
			const randomRotation = Math.random() * 6 - 3;
			cardElement.style.transform = `rotateZ(${randomRotation}deg)`;

			// Add a staggered animation delay
			cardElement.style.animationDelay = `${index * 0.1}s`;

			this.cardsContainer.appendChild(cardElement);
		});
	}

	selectCard(cardElement, cardData) {
		if (this.isRevealed) return;

		// Create magical effect
		this.createMagicalEffect(cardElement);

		// Flip the selected card
		cardElement.classList.add("flipped");
		this.selectedCard = { element: cardElement, data: cardData };

		// Dim other cards
		const allCards = this.cardsContainer.querySelectorAll(".card");
		allCards.forEach((card) => {
			if (card !== cardElement) {
				card.style.opacity = "0.3";
				card.style.transform = "scale(0.95)";
				card.style.filter = "grayscale(0.7)";
				card.style.pointerEvents = "none";
			}
		});

		// Show fortune message after a delay
		setTimeout(() => {
			this.revealFortune(cardData);
		}, 1000);
	}

	revealFortune(cardData) {
		this.isRevealed = true;

		// Update message content
		this.messageTitle.textContent = cardData.title;
		this.messageText.textContent = cardData.fortune;

		// Show message container
		this.messageContainer.classList.add("visible");

		// Create particles burst
		for (let i = 0; i < 50; i++) {
			this.createParticle(window.innerWidth / 2, window.innerHeight / 2, true);
		}
	}

	reshuffleCards() {
		// Hide message
		this.messageContainer.classList.remove("visible");

		// Reset state
		this.isRevealed = false;
		this.selectedCard = null;

		// Reset and recreate cards with animation
		setTimeout(() => {
			// Create particles burst when reshuffling
			for (let i = 0; i < 30; i++) {
				this.createParticle(window.innerWidth / 2, window.innerHeight / 2, true);
			}

			this.createCards();
		}, 500);
	}

	createMagicalEffect(element) {
		// Get element position
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// Create sparkles
		for (let i = 0; i < 15; i++) {
			const sparkle = document.createElement("div");
			sparkle.className = "magical-sparkle";

			// Random position around the card
			const angle = Math.random() * Math.PI * 2;
			const distance = Math.random() * 100;
			const posX = centerX + Math.cos(angle) * distance;
			const posY = centerY + Math.sin(angle) * distance;

			// Set position
			sparkle.style.left = `${posX}px`;
			sparkle.style.top = `${posY}px`;

			// Random color
			const colors = ["#9969ff", "#ff69a1", "#ffeb3b", "#69b4ff"];
			sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

			// Random size
			const size = Math.random() * 8 + 3;
			sparkle.style.width = `${size}px`;
			sparkle.style.height = `${size}px`;

			// Add to DOM
			document.body.appendChild(sparkle);

			// Remove after animation
			setTimeout(() => {
				sparkle.remove();
			}, 1000);
		}

		// Create particles for the effect
		for (let i = 0; i < 20; i++) {
			this.createParticle(centerX, centerY);
		}
	}

	// Particle system
	setupCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		// Handle resize
		window.addEventListener("resize", () => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		});

		// Create background particles
		for (let i = 0; i < 50; i++) {
			this.createParticle(
				Math.random() * this.canvas.width,
				Math.random() * this.canvas.height
			);
		}
	}

	createParticle(x, y, isBurst = false) {
		const color = this.particleColors[
			Math.floor(Math.random() * this.particleColors.length)
		];

		const particle = {
			x,
			y,
			size: Math.random() * 4 + 1,
			color,
			speedX: (Math.random() - 0.5) * (isBurst ? 8 : 1),
			speedY: (Math.random() - 0.5) * (isBurst ? 8 : 1),
			life: 100,
			maxLife: 100
		};

		this.particles.push(particle);
	}

	animateParticles() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Update and draw particles
		for (let i = 0; i < this.particles.length; i++) {
			const p = this.particles[i];

			// Update position
			p.x += p.speedX;
			p.y += p.speedY;

			// Slowly reduce speed
			p.speedX *= 0.99;
			p.speedY *= 0.99;

			// Reduce life
			p.life--;

			// Calculate opacity based on life
			const opacity = p.life / p.maxLife;

			// Draw
			this.ctx.beginPath();
			this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			this.ctx.fillStyle = `${p.color}${Math.floor(opacity * 255)
				.toString(16)
				.padStart(2, "0")}`;
			this.ctx.fill();

			// Remove dead particles
			if (p.life <= 0) {
				this.particles.splice(i, 1);
				i--;

				// Create new background particle to maintain density
				if (this.particles.length < 50) {
					this.createParticle(
						Math.random() * this.canvas.width,
						Math.random() * this.canvas.height
					);
				}
			}
		}

		requestAnimationFrame(this.animateParticles.bind(this));
	}
}

// Initialize when the window loads
window.addEventListener("load", () => {
	new MysticalCards();
});
