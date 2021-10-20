var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');


const localDate = document.querySelector('.localStorageDate');

const localTemp = document.querySelector('.localStorageTemp');

const localPlace = document.querySelector('.localStoragePlace');

const localDes = document.querySelector('.localStorageDes');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


let storageVar = localStorage.getItem('temp'); //get things
if(storageVar){
    let storageWay = JSON.parse(storageVar); //read things


    for (var i = 0; i < storageWay.length; i++) {
        for(var k = 0; k < storageWay[i].length; k++ ){
            if (k == 1){
        console.log(storageWay[i][k]);
            AddNew(storageWay[i][0], storageWay[i][1]); 
}

}
}

}




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = ""; 
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                document.getElementById("weatherImg").src="../img/" + data.weatherImg + ".svg";
                document.getElementById("weatherImg").alt= "icon -" + data.weatherImg;        
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(0) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
                const localStorageContent = localStorage.getItem('temp');

                let temp;
                if(localStorageContent === null) {
                    temp = new Map([]);
                } else {
                    temp = new Map(JSON.parse(localStorageContent))
                }

                console.log();

                var value = [dateElement.textContent, 
                tempElement.textContent, 
                locationElement.textContent, 
                weatherCondition.textContent];
                temp.set(temp.size + 1, value);

                localStorage.setItem('temp', JSON.stringify(Array.from(temp))); //set things
                //console.log(temp);

                let storageVar = localStorage.getItem('temp'); //get things
                let storageWay = JSON.parse(storageVar); //read things


                for (var i = 0; i < storageWay.length; i++) {
                    for(var k = 0; k < storageWay[i].length; k++ ){
                        // localDate.textContent =     storageWay[i][k][0];
                        // localTemp.textContent =     storageWay[i][k][1];
                        // localPlace.textContent =    storageWay[i][k][2];
                        // localDes.textContent =      storageWay[i][k][3];
                            //console.log("sub", storageWay.length);

                            if (i == storageWay.length - 1 && k == 1){
                            //console.log("sup", storageWay[i][k]);
                            AddNew(storageWay[i][0], storageWay[i][1]); 
                        }
                        
                    }
                }

            }
        }) 
    });
})

const btnDel = document.querySelector(".btn-del");
btnDel.addEventListener("click", clearHistory);

function clearHistory(){
    localStorage.clear();
    divs = document.querySelectorAll('#localStorageDiv');
    divs.forEach(e => e.remove());
}

function AddNew(divNum, storInf) {

    const bottom = document.querySelector(".bottom");
    let divMaster = document.createElement("div");
    divMaster.id = 'localStorageDiv'; 
    bottom.before(divMaster);

    let div1 = document.createElement("div");
    div1.classList.add(`localStorageDate`,`${divNum}`); 
    div1.textContent = storInf[0];
    divMaster.appendChild(div1);
    let div2 = document.createElement("div");
    div2.textContent = storInf[1];
    div2.classList.add(`localStorageTemp`,`${divNum}`);
    divMaster.appendChild(div2);
    let div3 = document.createElement("div");
    div3.textContent = storInf[2];
    div3.classList.add(`localStoragePlace`,`${divNum}`);
    divMaster.appendChild(div3);
    let div4 = document.createElement("div");
    div4.textContent = storInf[3];
    div4.classList.add(`localStorageDes`,`${divNum}`);
    divMaster.appendChild(div4);

}