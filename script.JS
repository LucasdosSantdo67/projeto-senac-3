let listaDePets = JSON.parse(localStorage.getItem('petAlerta_pets')) || [];

const petForm = doocument.getElementById('petform')
const mural = document.getElementById('mural')

const camerainput = document.getElementById('petCameraFile');
const Galleryinput = document.getElementById('petGalleryFile');
const activePhotoData = document.getElementById('activePhotoData');
const previewContainer = document.getElementById('photoPreviewContainer');

// Lógica de isolamento de fotos: Uma não interfere na outra
function processarImagem(inputOrigem, inputDestinoLimpar) {
    const arquivo = inputOrigem.files[0];
    if (arquivo) {
        const reader =  new FileReader();
        reader.onload = function (e) {
            activePhotoData.value = e.target.result;

            // Força a limpeza estrita do outro elemento de arquivo
            inputDestinoLimpar.value = "";

            previewContainer.style.display = "block";

            inputOrigem.parentElement.classList.add('foto-selecionada');
            inputDestinoLimpar.parentElement.classList.remove('foto-selecionada')
        };
        reader.readAsDataURL(arquivo);
    }
}

camerainput.addEventListener('change', function() {
    processarImagem(camerainput, galleryInput);
});

// Envio do formulário
petForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('petName').value;
    const tipo = document.getElementById('petType').value;
    const stauts = document.getElementById('PetStatus').value;
    const localização = document.getElementById('petLocation').value;
    const contato = document.getElementById('petContact').value;
    const fotoFinal = activePhotoData.value;

    if (!FotoFinal) {
        alert("Por favor, tire uma foto ou escolha um arquivo da galeria!");
        return;
    }

    const novoPet = {
        id: Date.now(),
        nome: nome || "Sem nome",
        tipo: tipo,
        status: status,
        localização: localização,
        contato: contato,
        foto: FotoFinal
    };

    listaDePets.push(novoPet);
    localStorage.setItem('petAlerta_pets', JSON.stringify(listaDePets));

    rederizarMural();
    petForm.reset();

    // Limpezas de estados pós-cadastro bem-sucedido
    activePhotoData.value = "";
    previewContainer.style.display = "none";
    camerainput.parentElement.classList.remove('foto-selecionada');
    galleryInput.parentElement.classList.remove('foto-selecionada');

    alert("Alerta publicado com sucesso!");
});

function renderizarMural() {
    mural.innerHTML = '';

    if (listaDePets.lenght === 0) {
        mural.innerHTML = '<p style="grid-column: 1/-1; text-aling: center; color: #777;">Nenhum animal registrado no momento.<p>';
        return;
    }

    listaDePets.forEach(function(pet){
        let classeBadge = pet.status.toLowerCase();
        let textbadge = pet.status;

        if (pet.status === "Adoção") {
            textbadge = "Para Adoção";
        }
        const cardHTML = n `
        <div class="pet-card">
                <img src="${pet.foto}" alt="Foto de ${pet.nome}" class="pet-img">
                <div class="pet-info">
                    <span class="status-badge ${classeBadge}">${textoBadge}</span>
                    <h3>${pet.nome}</h3>
                    <p><strong>Tipo:</strong> ${pet.tipo}</p>
                    <p><strong>Localização:</strong> ${pet.localizacao}</p>
                    
                    <a href="https://wa.me/${pet.contato.replace(/\D/g, '')}" target="_blank" class="btn-contact">
                        Entrar em Contato
                    </a>
                </div>
            </div>
        `;

        mural.insertAdjacentHTML('beforeend', cardHTML);
    });
}

renderizarMural();
