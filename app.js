let friends = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const name = inputAmigo.value;

    if (!name.trim()) {
        alert('Por favor, insira um nome válido.');
        return;
    }

    // Adiciona suporte a múltiplos nomes separados por vírgula
    let namesArray = name.split(',').map(n => n.trim()).filter(n => n !== '');
    
    // Filtra amigos já adicionados
    const novosAmigos = namesArray.filter(n => !friends.includes(n));

    if (novosAmigos.length === 0) {
        alert('Nome(s) já adicionado(s) ou inválido(s).');
        inputAmigo.value = '';
        inputAmigo.focus();
        return;
    }

    friends.push(...novosAmigos);
    updateFriendsList();
    
    // Limpa o input e volta o foco para ele
    inputAmigo.value = '';
    inputAmigo.focus();
    
    // Limpa o resultado anterior caso haja
    document.getElementById('resultado').innerHTML = '';
}

function updateFriendsList() {
    const list = document.getElementById('listaAmigos');
    list.innerHTML = '';

    friends.forEach(friend => {
        const item = document.createElement('li');
        item.textContent = friend;
        list.appendChild(item);
    });
}

function sortearAmigo() {
    if (friends.length < 2) {
        alert('Adicione pelo menos 2 amigos para sortear!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * friends.length);
    const selectedFriend = friends[randomIndex];

    document.getElementById('resultado').innerHTML = `🎉 Amigo sorteado: <strong>${selectedFriend}</strong> 🎉`;

    // Aciona a animação de confetes, se a biblioteca estiver carregada
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });
    }
}

function reset() {
    friends = [];
    updateFriendsList();
    document.getElementById('resultado').innerHTML = '';
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Permite adicionar amigos pressionando a tecla 'Enter'
document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    if (inputAmigo) {
        inputAmigo.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                adicionarAmigo();
            }
        });
    }
});
