
  const ctx = document.getElementById('chart1').getContext('2d');

  const chart1 = new Chart(ctx, {
    type: 'bar', // ou 'line', 'pie', etc.
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [{
        label: 'Nombre de visiteurs',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(244, 7, 7, 0.5)',
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
})
  const ctx2 = document.getElementById('chart2').getContext('2d');

  const chart2 = new Chart(ctx2, {
    type: 'polarArea',
    data: {
      labels: ['Rouge', 'Bleu', 'Jaune', 'Vert', 'Violet'],
      datasets: [{
        label: 'Répartition des catégories',
        data: [11, 16, 7, 14, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });



