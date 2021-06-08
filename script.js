const container = document.querySelector(".container");
let countries;
let globeCases = 0,
  globeRecovered = 0,
  globeDeaths = 0;
const getCountriesData = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      countries = data.map((country) => ({
        name: country.country,
        cases: country.cases,
        deaths: country.deaths,
        recovered: country.recovered,
        todayCases: country.todayCases,
        todayDeaths: country.todayDeaths,
        todayRecovered: country.todayRecovered,
        flag: country.countryInfo.flag,
        active: country.active,
        critical: country.critical,
        tests: country.tests,
        population: country.population,
        continent: country.continent,
        updated: country.updated,
      }));

      let table_country_body = document.querySelector(".table-country tbody");
      table_country_body.innerHTML = "";
      const CasesByCountry = countries.sort((a, b) => b.cases - a.cases);
      let TC, TR, TD;
      for (let i = 0; i < 222; i++) {
        // if (
        //   CasesByCountry[i].todayCases === 0 &&
        //   CasesByCountry[i].todayDeaths === 0 &&
        //   CasesByCountry[i].todayRecovered === 0
        // ) {
        // }
        globeCases += Number(countries[i].cases);
        globeRecovered += Number(countries[i].recovered);
        globeDeaths += Number(countries[i].deaths);

        if (CasesByCountry[i].todayCases != 0)
          TC = `<td class="todaycc"><strong>+${countries[i].todayCases}</strong></td>`;
        else TC = `<td ></td>`;
        if (CasesByCountry[i].todayRecovered != 0)
          TR = `<td class="recovered"><strong>+${countries[i].todayRecovered}</strong></td>`;
        else TR = `<td></td>`;
        if (CasesByCountry[i].todayDeaths != 0)
          TD = `<td class="deaths"><strong>+${CasesByCountry[i].todayDeaths}</strong></td>`;
        else TD = `<td></td>`;
        let html = `
        
          <tr>
            <td>${i + 1}</td>
            <td><b>${CasesByCountry[i].name}</b></td>
            <td>${CasesByCountry[i].cases}</td>
            ${TC}
            <td>${CasesByCountry[i].recovered}</td>
            ${TR}
            <td>${CasesByCountry[i].deaths}</td>
            ${TD}
          </tr>
        
        `;
        table_country_body.innerHTML += html;
      }
      // console.log("thisjhvhj", globeRecovered);
      const globeDeathsquery = document.querySelector(".tilldeaths");
      const globeRecoveredquery = document.querySelector(".tillrecovered");
      const globeCasesquery = document.querySelector(".tillcases");
      globeCases = globeCases.toLocaleString("en-IN");
      globeDeaths = globeDeaths.toLocaleString("en-IN");
      globeRecovered = globeRecovered.toLocaleString("en-IN");

      globeCasesquery.innerHTML = globeCases;
      globeDeathsquery.innerHTML = globeDeaths;
      globeRecoveredquery.innerHTML = globeRecovered;
    });
};
getCountriesData();

const scrolist = document.querySelector(".searchlist");
const reading = document.querySelector(".readinput");
const search = document.querySelector(".submitbtn");

const globeDeathsquery = document.querySelector(".tilldeaths");
const globeRecoveredquery = document.querySelector(".tillrecovered");
const globeCasesquery = document.querySelector(".tillcases");

globeCasesquery.innerHTML = globeCases;
globeDeathsquery.innerHTML = globeDeaths;
globeRecoveredquery.innerHTML = globeRecovered;

let countriesList;

const listallCountries = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
      countriesList = data.map((country) => country.country);
      for (let i = 0; i < countriesList.length; i++) {
        let html = `<option class="pressing">${countriesList[i]}</option>`;
        scrolist.innerHTML += html;
      }
    });
};
listallCountries();

const backDrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".closeButton");
const modalcname = document.querySelector(".modalCountryName");

const toCase = document.querySelector(".modalTotalCases");
const todCase = document.querySelector(".modalTodayCases");
const torec = document.querySelector(".modalTotalRecovered");
const todrec = document.querySelector(".modalTodayRecovered");
const todet = document.querySelector(".modalTotalDeaths");
const toddet = document.querySelector(".modalTodayDeaths");

const modalActive = document.querySelector(".info-active");
const modalCritical = document.querySelector(".info-critical");
const modalTests = document.querySelector(".info-test");

const modalpopulation = document.querySelector(".info-poulation");
const modalcontinent = document.querySelector(".info-continent");
const modalupdated = document.querySelector(".info-updated");

search.addEventListener("click", function (e) {
  e.preventDefault();
  const value = reading.value;
  let flag = 0;
  for (let i = 0; i < countries.length; i++) {
    if (countriesList[i].indexOf(value) > -1) {
      flag = 1;
      break;
    }
  }
  if (flag == 0) {
    alert("Country not in the llist");
  } else {
    //showing backdrop modal
    console.log(reading.value);
    backDrop.classList.toggle("backdropVisible");
    //showing backdrop modal

    // updating modal windows
    let i = 0;
    for (i = 0; i < countries.length; i++) {
      if (countries[i].name === value) {
        todCase.innerHTML = `+${countries[i].todayCases}`;
        let casescomma = countries[i].cases.toLocaleString("en-IN");
        toCase.innerHTML = `${casescomma} <span class = "totaltogether">Total</span>`;
        let recoveredcomma = countries[i].recovered.toLocaleString("en-IN");
        torec.innerHTML = `${recoveredcomma} <span class = "totaltogether">Total</span>`;
        todrec.innerHTML = `+${countries[i].todayRecovered}`;
        let deathscomma = countries[i].deaths.toLocaleString("en-IN");
        todet.innerHTML = `${deathscomma} <span class = "totaltogether">Total</span>`;
        toddet.innerHTML = `+${countries[i].todayDeaths}`;
        break;
      }
    }
    modalcname.innerHTML = `
     <img  class="imgFlag" src="${countries[i].flag}"> ${value} (${countries[i].continent})`;
    let timestamp = countries[i].updated;
    let date = new Date(timestamp);
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // updating modal windows
    let activecomma = countries[i].active.toLocaleString("en-IN");
    modalActive.innerHTML = `<span class="extraModalInfo">Active Cases : <span class="m mActiveCases"> ${activecomma}</span></span>`;
    let criticalcomma = countries[i].critical.toLocaleString("en-IN");
    modalCritical.innerHTML = `<span class="extraModalInfo">Critical Now : <span class="m mCritical"> ${criticalcomma}</span></span>`;
    let testcomma = countries[i].tests.toLocaleString("en-IN");
    modalTests.innerHTML = `<span class="extraModalInfo">Total Tests : <span class="m mTests"> ${testcomma}</span></span>`;
    let populationcomma = countries[i].population.toLocaleString("en-IN");
    modalpopulation.innerHTML = `<span class="extraModalInfo">Population : <span class="m mPopulation"> ${populationcomma}</span></span>`;
    modalupdated.innerHTML = `<span class="extraModalInfo">Last-updated : <span class="m mDate">${date}</span></span>`;
    // console.log(countries[1].cases);
  }
});

//showing backdrop modal
closeBtn.addEventListener("click", function (f) {
  f.preventDefault();
  backDrop.classList.toggle("backdropVisible");
});
//showing backdrop modal
