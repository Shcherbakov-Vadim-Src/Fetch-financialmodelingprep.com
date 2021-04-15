const button = document.querySelector('.button');
const innerResult1 = document.querySelector('.innerResult1');
const innerResult2 = document.querySelector('.innerResult2');
const inform = document.querySelector('.inform');

button.addEventListener('click', (event) => {
        event.preventDefault();
        let queryURL = `https://financialmodelingprep.com/api/v3/quotes/nyse?
apikey=761e992817939ccd0df4e8140eb5993d`;
        fetch(queryURL)   
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let copyData = [...data];
            copyData.sort((a, b) => b.price - a.price);
            let maxPrice = copyData.shift();
            innerResult1.innerText = `Самая дорогая акция на рынке у компании ${maxPrice.name}`;
            innerResult2.innerText = `Для покупки одной акции нужно $${maxPrice.price}`;
        
            let symbolCompany = maxPrice.symbol;
        let newFetchQueryURL = `https://financialmodelingprep.com/api/v3/profile/${symbolCompany}?apikey=761e992817939ccd0df4e8140eb5993d`;
        fetch(newFetchQueryURL)   
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let informationOfCompany = data.shift();
            console.log(informationOfCompany);
            for (let key in informationOfCompany){
                let newP = document.createElement('p');
                newP.innerHTML = `${key}: ${informationOfCompany[key]}<br>`;
                inform.append(newP);
            }
        })
        });
});

// apikey=761e992817939ccd0df4e8140eb5993d 
// где 761e992817939ccd0df4e8140eb5993d - этой ID на зарегистрированном
// ресурсе https://financialmodelingprep.com/api/v3/quotes/nyse?
// apikey=761e992817939ccd0df4e8140eb5993d  