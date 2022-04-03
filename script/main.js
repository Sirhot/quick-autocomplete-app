const search = document.getElementById("search")
const matchList = document.getElementById("match-list")

//Search states_capitals.json and filter it
const searchStates = async searchText => {
    const res = await fetch("../data/cities_of_turkey.json")
    const states = await res.json()

    //Get matches with current input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, "gi")
        //we're getting string from text so the comparing them part should be with texts thats why i used toString
        return state.name.match(regex) || state.region.match(regex) || state.id.toString().match(regex)
    })

    if (searchText.length == 0) {
        matches = []
        matchList.innerHTML = ""
    }

    outputHtml(matches)
}

//Show the matches
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(
            match => `
            <div class="card border-light mb-2">
                <h4>${match.id} - ${match.name}</h4>
                <h5 class="text-info">${match.region}</h5>
                <small>Lat:${match.latitude} / Long:${match.longitude} / Population:${match.population}</small>
            </div>
                
            `
        ).join("")

        matchList.innerHTML = html;
    }
}

search.addEventListener("input", () => searchStates(search.value))