const search = document.querySelector('.search')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const value = document.querySelector('.value')
const time = document.querySelector('.time')
const shortDesc = document.querySelector('.short-desc')
const visibility = document.querySelector('.visibility span')
const wind = document.querySelector('.wind span')
const humidity = document.querySelector('.humidity span')
const content = document.querySelector('.content')
const body = document.querySelector('body')


async function changeWeatherUI(capitalValue) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&appid=69fd9b9fdc774d9e787600a6bc6ce401`

    let data = await fetch(apiURL).then(res => res.json())
    if (data.cod == 200) {
        content.classList.remove('hide')
        city.innerText = data.name
        country.innerText = data.sys.country
        visibility.innerText = data.visibility + 'm'
        wind.innerText = data.wind.speed + 'm/s'
        humidity.innerText = data.main.humidity + '%'
        let temp = Math.round(data.main.temp - 273.15)
        value.innerText = temp
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
        time.innerText = new Date().toLocaleString()

        body.setAttribute('class', 'hot')
        if (temp <= 30) {
            body.setAttribute('class', 'warm')
        }

        if (temp <= 23) {
            body.setAttribute('class', 'cool')
        }

        if (temp <= 15) {
            body.setAttribute('class', 'cold')
        }

    } else {
        content.classList.add('hide')
    }
}

search.addEventListener('keypress', function (e) {
    if (e.code === "Enter") {
        let capitalValue = search.value.trim()
        changeWeatherUI(capitalValue)
    }
})

changeWeatherUI('Ho Chi Minh')