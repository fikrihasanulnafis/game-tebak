// --- Elemen DOM ---
const clueText = document.getElementById('clue-text');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const guessesLeftSpan = document.getElementById('guesses-left');
const resetButton = document.getElementById('reset-button');
const fruitImage = document.getElementById('fruit-image'); // BARU: Ambil elemen gambar

// --- Database Game ---
// BARU: Menambahkan properti 'image' berisi URL gambar asli
const fruitList = [
    { word: 'APEL', clue: 'Buah ini sering dihubungkan dengan "Newton" dan "New York".', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop' },
    { word: 'PISANG', clue: 'Bentuknya panjang, warnanya kuning, dan disukai monyet.', image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&auto=format&fit=crop' },
    { word: 'MANGGA', clue: 'Dikenal sebagai "Raja Buah" di beberapa tempat, dagingnya oranye.', image: 'https://images.unsplash.com/photo-1591073137537-8613a6136829?w=400&auto=format&fit=crop' },
    { word: 'SEMANGKA', clue: 'Besar dan bulat, hijau di luar, merah dan berair di dalam.', image: 'https://images.unsplash.com/photo-1582281298055-e25b1b004b30?w=400&auto=format&fit=crop' },
    { word: 'ANGGUR', clue: 'Tumbuh bergerombol, bisa dibuat menjadi kismis.', image: 'https://images.unsplash.com/photo-1596399770138-9b8f52f4006c?w=400&auto=format&fit=crop' },
    { word: 'DURIAN', clue: 'Kulitnya berduri tajam, aromanya sangat kuat.', image: 'https://images.unsplash.com/photo-1585058720162-895c1f01f845?w=400&auto=format&fit=crop' },
    { word: 'STROBERI', clue: 'Kecil, merah, dan memiliki biji di bagian luarnya.', image: 'https://images.unsplash.com/photo-1588661601399-270bca5c179c?w=400&auto=format&fit=crop' },
    { word: 'NANAS', clue: 'Memiliki "mahkota" daun dan kulit yang bersisik.', image: 'https://images.unsplash.com/photo-1587825133-3c30006c11d8?w=400&auto=format&fit=crop' },
    { word: 'ALPUKAT', clue: 'Berwarna hijau, memiliki biji besar di tengah, sering dibuat jus.', image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&auto=format&fit=crop' },
    { word: 'RAMBUTAN', clue: 'Sesuai namanya, buah ini memiliki "rambut" di kulitnya.', image: 'https://images.unsplash.com/photo-1603531998522-9c60ba086e1e?w=400&auto=format&fit=crop' }
];

// BARU: URL gambar placeholder (gambar tanda tanya)
const mysteryImage = 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?w=400&auto=format&fit=crop';

// --- Variabel Status Game ---
let secretWord = '';
let secretClue = '';
let secretImage = ''; // BARU: Menyimpan URL gambar jawaban
let guessesLeft = 5;

// --- Fungsi Inisialisasi Game ---
function initializeGame() {
    // 1. Pilih kata, petunjuk, dan gambar
    const randomIndex = Math.floor(Math.random() * fruitList.length);
    const currentFruit = fruitList[randomIndex];
    secretWord = currentFruit.word;
    secretClue = currentFruit.clue;
    secretImage = currentFruit.image; // Simpan gambar jawaban

    // 2. Reset status
    guessesLeft = 5;
    
    // 3. Perbarui tampilan
    clueText.textContent = secretClue;
    guessesLeftSpan.textContent = guessesLeft;
    fruitImage.src = mysteryImage; // Set gambar ke placeholder tanda tanya

    // 4. Reset UI
    message.textContent = '';
    message.className = 'message'; // Hapus kelas success/error
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    resetButton.style.display = 'none';
}

// --- Fungsi saat Tombol "Tebak" Diklik ---
function handleGuess() {
    const userGuess = guessInput.value.toUpperCase().trim();

    if (!userGuess) {
        message.textContent = 'Harap masukkan tebakan Anda!';
        message.className = 'message error';
        return;
    }

    // 1. Jika tebakan BENAR
    if (userGuess === secretWord) {
        message.textContent = `BENAR! Jawabannya adalah ${secretWord}.`;
        message.className = 'message success';
        
        // BARU: Tampilkan gambar buah yang benar!
        fruitImage.src = secretImage;
        
        endGame(true);
    } 
    // 2. Jika tebakan SALAH
    else {
        guessesLeft--; 
        guessesLeftSpan.textContent = guessesLeft;
        message.textContent = 'SALAH! Coba lagi.';
        message.className = 'message error';

        if (guessesLeft <= 0) {
            message.textContent = `GAME OVER! Jawabannya adalah: ${secretWord}`;
            message.className = 'message error';
            
            // BARU: Tampilkan juga gambar jawaban jika kalah
            fruitImage.src = secretImage; 
            
            endGame(false);
        }
    }
    
    guessInput.value = '';
}

// --- Fungsi untuk Mengakhiri Game ---
function endGame(isWin) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    resetButton.style.display = 'block';
}

// --- Event Listeners ---
guessButton.addEventListener('click', handleGuess);
guessInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});
resetButton.addEventListener('click', initializeGame);

// --- Mulai Game ---
initializeGame();