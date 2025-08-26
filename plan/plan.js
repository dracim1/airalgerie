let date = document.getElementById('date');
let mois = document.getElementById('mois');
let site = document.getElementById('site');
let planning = document.getElementById('planning');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
let dataPro = [];

if (localStorage.plannings != null) {
    dataPro = JSON.parse(localStorage.plannings);
} else {
    dataPro = [];
}

submit.onclick = function () {
    let file = planning.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            savePlanning(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        savePlanning('');
    }
};

function savePlanning(fileData) {
    let newPro = {
        date: date.value,
        mois: mois.value,
        site: site.value,
        planning: fileData
    };

    if (mood === 'create') {
        dataPro.push(newPro);
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Ajouter un Planning';
    }

    localStorage.setItem('plannings', JSON.stringify(dataPro));
    clearData();
    showData();
}

function clearData() {
    date.value = '';
    mois.value = '';
    site.value = '';
    planning.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        let planningLink = dataPro[i].planning
            ? `<a href="${dataPro[i].planning}" target="_blank">Afficher</a>`
            : 'Aucun fichier';

        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].date}</td>
                <td>${dataPro[i].mois}</td>
                <td>${dataPro[i].site}</td>
                <td>${planningLink}</td>
                <td><button onclick="updateData(${i})">Modifier</button></td>
                <td><button onclick="deleteData(${i})">Supprimer</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();

function updateData(i) {
    date.value = dataPro[i].date;
    mois.value = dataPro[i].mois;
    site.value = dataPro[i].site;
    alert("Veuillez recharger le fichier manuellement si nécessaire.");
    submit.innerHTML = 'Modifier';
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('plannings', JSON.stringify(dataPro));
    showData();
}

let searchMood = 'mois';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchmatricule') {
        searchMood = 'mois';
        search.placeholder = 'Rechercher par mois';
    } else {
        searchMood = 'site';
        search.placeholder = 'Rechercher par site';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (
            (searchMood === 'mois' && dataPro[i].mois.toLowerCase().includes(value.toLowerCase())) ||
            (searchMood === 'site' && dataPro[i].site.toLowerCase().includes(value.toLowerCase()))
        ) {
            let planningLink = dataPro[i].planning
                ? `<a href="${dataPro[i].planning}" target="_blank">Afficher</a>`
                : 'Aucun fichier';

            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].date}</td>
                    <td>${dataPro[i].mois}</td>
                    <td>${dataPro[i].site}</td>
                    <td>${planningLink}</td>
                    <td><button onclick="updateData(${i})">Modifier</button></td>
                    <td><button onclick="deleteData(${i})">Supprimer</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
