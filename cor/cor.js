let matricule = document.getElementById('matricule');
let nom = document.getElementById('nom');
let adresse_postale = document.getElementById('adresse_postale');
let adresse_mail = document.getElementById('adresse_mail');
let numero = document.getElementById('numero');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
let dataPro = [];

// Charger les données depuis le localStorage
if (localStorage.coordonnees != null) {
    dataPro = JSON.parse(localStorage.coordonnees);
} else {
    dataPro = [];
}

// ➤ Ajouter ou modifier une ligne
submit.onclick = function () {
    let newPro = {
        matricule: matricule.value.trim(),
        nom: nom.value.trim(),
        adresse_postale: adresse_postale.value.trim(),
        adresse_mail: adresse_mail.value.trim(),
        numero: numero.value.trim(),
    };

    // Vérifier que tous les champs sont remplis
    if (newPro.matricule && newPro.nom && newPro.adresse_postale && newPro.adresse_mail && newPro.numero) {
        if (mood === 'create') {
            dataPro.push(newPro);
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Ajouter un Employé';
        }

        // Sauvegarder dans le localStorage
        localStorage.setItem('coordonnees', JSON.stringify(dataPro));
        clearData();
        showData();
    } else {
        alert("Veuillez remplir tous les champs !");
    }
};

// ➤ Réinitialiser les champs après ajout/modif
function clearData() {
    matricule.value = '';
    nom.value = '';
    adresse_postale.value = '';
    adresse_mail.value = '';
    numero.value = '';
}

// ➤ Afficher les données dans le tableau
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].matricule}</td>
                <td>${dataPro[i].nom}</td>
                <td>${dataPro[i].adresse_postale}</td>
                <td>${dataPro[i].adresse_mail}</td>
                <td>${dataPro[i].numero}</td>
                <td><button onclick="updateData(${i})">Modifier</button></td>
                <td><button onclick="deleteData(${i})">Supprimer</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();

// ➤ Supprimer un employé
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('coordonnees', JSON.stringify(dataPro));
    showData();
}

// ➤ Modifier un employé
function updateData(i) {
    matricule.value = dataPro[i].matricule;
    nom.value = dataPro[i].nom;
    adresse_postale.value = dataPro[i].adresse_postale;
    adresse_mail.value = dataPro[i].adresse_mail;
    numero.value = dataPro[i].numero;

    submit.innerHTML = 'Modifier';
    mood = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// ➤ Gestion de la recherche
let searchMood = 'matricule';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchmatricule') {
        searchMood = 'matricule';
        search.placeholder = 'Rechercher par matricule';
    } else {
        searchMood = 'nom';
        search.placeholder = 'Rechercher par nom';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (
            (searchMood === 'matricule' && dataPro[i].matricule.toLowerCase().includes(value.toLowerCase())) ||
            (searchMood === 'nom' && dataPro[i].nom.toLowerCase().includes(value.toLowerCase()))
        ) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].matricule}</td>
                    <td>${dataPro[i].nom}</td>
                    <td>${dataPro[i].adresse_postale}</td>
                    <td>${dataPro[i].adresse_mail}</td>
                    <td>${dataPro[i].numero}</td>
                    <td><button onclick="updateData(${i})">Modifier</button></td>
                    <td><button onclick="deleteData(${i})">Supprimer</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}


