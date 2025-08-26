// Récupération des champs du formulaire
let matricule = document.getElementById('matricule');
let nom = document.getElementById('nom');
let prenom = document.getElementById('prenom');
let fonction = document.getElementById('fonction');
let statut = document.getElementById('statut');
let site = document.getElementById('site');
let submit = document.getElementById('submit');

let mood = 'create'; // mode par défaut
let tmp; // pour stocker l'index lors de la modification

// Récupération des données du localStorage
let dataPro = localStorage.personnel ? JSON.parse(localStorage.personnel) : [];

// Ajouter ou mettre à jour un employé
submit.onclick = function () {
    let newPro = {
        matricule: matricule.value.trim(),
        nom: nom.value.trim(),
        prenom: prenom.value.trim(),
        fonction: fonction.value,
        statut: statut.value,
        site: site.value,
    };

    if (newPro.matricule && newPro.nom && newPro.prenom && newPro.fonction && newPro.statut && newPro.site) {
        if (mood === 'create') {
            dataPro.push(newPro);
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Ajouter un Employé';
        }

        // Sauvegarde dans le localStorage
        localStorage.setItem('personnel', JSON.stringify(dataPro));
        clearData();
        showData();
    } else {
        alert('Veuillez remplir tous les champs');
    }
};

// Fonction pour vider les champs
function clearData() {
    matricule.value = '';
    nom.value = '';
    prenom.value = '';
    fonction.value = '';
    statut.value = '';
    site.value = '';
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
                <td>${dataPro[i].fonction}</td>
                <td>${dataPro[i].statut}</td>
                <td>${dataPro[i].site}</td>
                <td><button onclick="updateData(${i})">Modifier</button></td>
                <td><button onclick="deleteData(${i})">Supprimer</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();

// Supprimer un employé
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('personnel', JSON.stringify(dataPro));
    showData();
}

// Modifier un employé
function updateData(i) {
    matricule.value = dataPro[i].matricule;
    nom.value = dataPro[i].nom;
    prenom.value = dataPro[i].prenom;
    fonction.value = dataPro[i].fonction;
    statut.value = dataPro[i].statut;
    site.value = dataPro[i].site;

    submit.innerHTML = 'Modifier';
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

// Gestion de la recherche
let searchMood = 'matricule';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === "searchmatricule") {
        searchMood = "matricule";
        search.placeholder = "Rechercher par matricule";
    } else {
        searchMood = "nom";
        search.placeholder = "Rechercher par nom";
    }
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (
            (searchMood === "matricule" && dataPro[i].matricule.toLowerCase().includes(value.toLowerCase())) ||
            (searchMood === "nom" && dataPro[i].nom.toLowerCase().includes(value.toLowerCase()))
        ) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].matricule}</td>
                    <td>${dataPro[i].nom}</td>
                    <td>${dataPro[i].prenom}</td>
                    <td>${dataPro[i].fonction}</td>
                    <td>${dataPro[i].statut}</td>
                    <td>${dataPro[i].site}</td>
                    <td><button onclick="updateData(${i})">Modifier</button></td>
                    <td><button onclick="deleteData(${i})">Supprimer</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

            


    


    



    

   
    