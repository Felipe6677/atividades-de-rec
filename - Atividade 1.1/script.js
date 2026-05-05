const sabores = [
    { 
        nome: "Morango", 
        descricao: "Energético com sabor intenso de morango silvestre.", 
        cor: "#FF6B8B",
        emoji: "🍓",
        preco: 8.90
    },
    { 
        nome: "Maracujá", 
        descricao: "Sabor tropical com o toque cítrico do maracujá.", 
        cor: "#FFD166",
        emoji: "🟡",
        preco: 8.90
    },
    { 
        nome: "Limão", 
        descricao: "Refrescante e cítrico, perfeito para dar energia.", 
        cor: "#CCE6B5",
        emoji: "🍋",
        preco: 8.90
    },
    { 
        nome: "Tropical", 
        descricao: "Mix de frutas tropicais para uma explosão de energia.", 
        cor: "#FF9F4A",
        emoji: "🏝️",
        preco: 9.50
    },
    { 
        nome: "Manga", 
        descricao: "Doce e suave, com o sabor característico da manga.", 
        cor: "#FFB347",
        emoji: "🥭",
        preco: 9.50
    },
    { 
        nome: "Uva", 
        descricao: "Sabor clássico de uva com um toque energético.", 
        cor: "#9B5DE5",
        emoji: "🍇",
        preco: 8.90
    },
    { 
        nome: "Laranja", 
        descricao: "Energético cítrico com vitamina C natural.", 
        cor: "#FF8C42",
        emoji: "🍊",
        preco: 8.90
    },
    { 
        nome: "Açaí com Guaraná", 
        descricao: "Combinação energética brasileira de açaí e guaraná.", 
        cor: "#4A0E6D",
        emoji: "🟣",
        preco: 10.90
    }
];

const precosTamanhos = {
    "500ml": 8.90,
    "1L": 14.90,
    "2L": 24.90
};

let carrinho = JSON.parse(localStorage.getItem('carrinhoMansaoMaromba')) || [];

const cartCountElement = document.querySelector('.cart-count');
const cartIconElement = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeModalButton = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutBtn');

function renderSabores() {
    const container = document.getElementById('sabores-container');
    container.innerHTML = '';

    sabores.forEach(sabor => {
        const saborCard = document.createElement('div');
        saborCard.className = 'sabor-card';
        
        saborCard.innerHTML = `
            <div class="sabor-img" style="background-color:${sabor.cor}; display:flex; align-items:center; justify-content:center; font-size: 4rem;">
                ${sabor.emoji}
            </div>
            <div class="sabor-info">
                <h3>${sabor.nome}</h3>
                <p>${sabor.descricao}</p>
                <p class="sabor-price">R$ ${sabor.preco.toFixed(2)}</p>
                <button class="btn add-to-cart" data-sabor="${sabor.nome}" data-preco="${sabor.preco}">Adicionar</button>
            </div>
        `;

        container.appendChild(saborCard);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const sabor = this.getAttribute('data-sabor') || "Energético";
            const tamanho = this.getAttribute('data-size') || "500ml";
            const preco = parseFloat(this.getAttribute('data-preco')) || precosTamanhos[tamanho];
            
            adicionarAoCarrinho(sabor, tamanho, preco);
        });
    });
}

function adicionarAoCarrinho(sabor, tamanho, preco) {
    const itemIndex = carrinho.findIndex(item => 
        item.sabor === sabor && item.tamanho === tamanho
    );
    
    if (itemIndex > -1) {
        carrinho[itemIndex].quantidade += 1;
    } else {
        carrinho.push({
            sabor,
            tamanho,
            preco,
            quantidade: 1
        });
    }
    
    salvarCarrinhoLocalStorage();
    atualizarCarrinho();
    
    mostrarNotificacao(`${sabor} ${tamanho} adicionado!`);
}

function removerDoCarrinho(index) {
    if (index >= 0 && index < carrinho.length) {
        carrinho.splice(index, 1);
        salvarCarrinhoLocalStorage();
        atualizarCarrinho();
        atualizarModalCarrinho();
    }
}

function atualizarCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    cartCountElement.textContent = totalItens;
}

function calcularTotalCarrinho() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function atualizarModalCarrinho() {
    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio</p>';
        cartTotalElement.textContent = 'R$ 0,00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    carrinho.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.sabor} - ${item.tamanho}</h4>
                <p>Quantidade: ${item.quantidade}</p>
            </div>
            <div class="cart-item-price">
                R$ ${(item.preco * item.quantidade).toFixed(2)}
                <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removerDoCarrinho(index);
        });
    });
    
    cartTotalElement.textContent = `R$ ${calcularTotalCarrinho().toFixed(2)}`;
}

function mostrarNotificacao(mensagem) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--accent);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = mensagem;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function salvarCarrinhoLocalStorage() {
    localStorage.setItem('carrinhoMansaoMaromba', JSON.stringify(carrinho));
}

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

document.addEventListener('DOMContentLoaded', function() {
    renderSabores();
    atualizarCarrinho();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelectorAll('.sabor-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    cartIconElement.addEventListener('click', function() {
        atualizarModalCarrinho();
        cartModal.style.display = 'flex';
    });
    
    closeModalButton.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    checkoutButton.addEventListener('click', function() {
        if (carrinho.length === 0) {
            mostrarNotificacao('Adicione itens ao carrinho!');
            return;
        }
        
        mostrarNotificacao('Compra finalizada! Total: R$ ' + calcularTotalCarrinho().toFixed(2));
        
        carrinho = [];
        salvarCarrinhoLocalStorage();
        atualizarCarrinho();
        atualizarModalCarrinho();
        
        cartModal.style.display = 'none';
    });
});