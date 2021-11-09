const mostrarModal = (pais) => {
  document.querySelector('#modal').classList.add('show'); // abrir modal
  document.querySelector('#contenido-modal').innerHTML = '';

  fetch(`http://localhost:3000/api/countries/${pais}`)
  .then(function(response){
    return response.json();
  })
  .then(function(myJson){
    let { data } = myJson;


    var chart = new CanvasJS.Chart("contenido-modal", {
      exportEnabled: true,
      animationEnabled: true,
      title:{
        text: `Datos de ${data.location}`
      },
      axisY: {
        title: "Personas",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [
        {
          type: "column",
          name: "Muertos",
          showInLegend: true,      
          yValueFormatString: "#,##0.# Units",
          dataPoints: [      { y: data.deaths, label: 'Muertos' }      ]
        },
        {
          type: "column",
          name: "Confirmados",
          showInLegend: true,      
          yValueFormatString: "#,##0.# Units",
          dataPoints: [{ y: data.confirmed, label: 'Confirmados' }]
        },
      ] 
    });
    chart.render();
  })
}

document.querySelector('#modal').addEventListener('click', (e) => e.target.classList.remove('show')) // cerrar modal

const mostrarGrafico = (() => {
  fetch('http://localhost:3000/api/total')
  .then(function(response){
    return response.json();
  })
  .then(function(myJson){
    let { data } = myJson;
    let casosTotal = data.filter((data) => {
      return data.confirmed > 1000000;
    })
    /*
    let confirmados = [];
    casosTotal.forEach(elemento => {
      confirmados.push({y: elemento.confirmed, label: elemento.location});
    })
    */
    const confirmados = casosTotal.map((el) => ({ y: el.confirmed, label: el.location }))
    const muertos = casosTotal.map((el) => ({ y: el.deaths, label: el.location }))

    const tabla = casosTotal.map((el) => `<tr>
        <td>${el.location}</td>
        <td>${el.confirmed}</td>
        <td>${el.deaths}</td>
        <td>${el.recovered}</td>
        <td>${el.active}</td>
        <td><a onclick="mostrarModal('${el.location}')">Detalle</a></td>
      </tr>`).join('')
    
    document.querySelector('#tablaDatos tbody').innerHTML = tabla

    var chart = new CanvasJS.Chart("chartContainer", {
      exportEnabled: true,
      animationEnabled: true,
      title:{
        text: "Car Parts Sold in Different States"
      },
      axisX: {
        title: "States",
        labelAngle: -30,
        interval: 1

      },
      axisY: {
        title: "Oil Filter - Units",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
        includeZero: true
      },
      axisY2: {
        title: "Clutch - Units",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E",
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [{
        type: "column",
        name: "Oil Filter",
        showInLegend: true,      
        yValueFormatString: "#,##0.# Units",
        dataPoints: confirmados
      },
      {
        type: "column",
        name: "Clutch",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.# Units",
        dataPoints: muertos
      }
    ] 
    });
    chart.render();
    // toggleDataSeries se movio afuera
    
  })
})
const initSituacionMundial = ( async () => {
  mostrarGrafico();
})();

function toggleDataSeries(e) {
  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
}
