// Récupération des champs
let matricule = document.getElementById('matricule');
let nom = document.getElementById('nom');
let prenom = document.getElementById('prenom');
let type_indispo = document.getElementById('type_indispo');
let date_debut = document.getElementById('date_debut');
let date_fin = document.getElementById('date_fin');
let jours = document.getElementById('jours');
let motif = document.getElementById('motif');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
let dataPro = [];

// Vérifier si localStorage contient des données
if (localStorage.indispos != null) {
    dataPro = JSON.parse(localStorage.indispos);
} else {
    dataPro = [];
}

// Calcul automatique du nombre de jours
function calculerJours() {
    if (date_debut.value && date_fin.value) {
        let debut = new Date(date_debut.value);
        let fin = new Date(date_fin.value);
        let diffTime = fin - debut;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure la date de début
        jours.value = diffDays > 0 ? diffDays : 0;
    }
}
date_debut.addEventListener('change', calculerJours);
date_fin.addEventListener('change', calculerJours);

// Ajouter ou modifier une indisponibilité
submit.onclick = function () {
    let newPro = {
        matricule: matricule.value,
        nom: nom.value,
        prenom: prenom.value,
        type_indispo: type_indispo.value,
        date_debut: date_debut.value,
        date_fin: date_fin.value,
        jours: jours.value,
        motif: motif.value
    };

    if (mood === 'create') {
        dataPro.push(newPro);
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Ajouter un Employé';
    }

    localStorage.setItem('indispos', JSON.stringify(dataPro));
    clearData();
    showData();
};

// Vider les champs après soumission
function clearData() {
    matricule.value = '';
    nom.value = '';
    prenom.value = '';
    type_indispo.value = '';
    date_debut.value = '';
    date_fin.value = '';
    jours.value = '';
    motif.value = '';
}

// Afficher les données dans le tableau
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].matricule}</td>
                <td>${dataPro[i].nom}</td>
                <td>${dataPro[i].prenom}</td>
                <td>${dataPro[i].type_indispo}</td>
                <td>${dataPro[i].date_debut}</td>
                <td>${dataPro[i].date_fin}</td>
                <td>${dataPro[i].jours}</td>
                <td>${dataPro[i].motif}</td>
                <td><button onclick="updateData(${i})">Modifier</button></td>
                <td><button onclick="deleteData(${i})">Supprimer</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();

// Supprimer une ligne
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('indispos', JSON.stringify(dataPro));
    showData();
}

// Modifier une ligne
function updateData(i) {
    matricule.value = dataPro[i].matricule;
    nom.value = dataPro[i].nom;
    prenom.value = dataPro[i].prenom;
    type_indispo.value = dataPro[i].type_indispo;
    date_debut.value = dataPro[i].date_debut;
    date_fin.value = dataPro[i].date_fin;
    jours.value = dataPro[i].jours;
    motif.value = dataPro[i].motif;

    submit.innerHTML = 'Modifier';
    mood = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// Recherche
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
                    <td>${dataPro[i].prenom}</td>
                    <td>${dataPro[i].type_indispo}</td>
                    <td>${dataPro[i].date_debut}</td>
                    <td>${dataPro[i].date_fin}</td>
                    <td>${dataPro[i].jours}</td>
                    <td>${dataPro[i].motif}</td>
                    <td><button onclick="updateData(${i})">Modifier</button></td>
                    <td><button onclick="deleteData(${i})">Supprimer</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
