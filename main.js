window.onload = () => {
    const ordnerList = document.getElementById('ordner')

    fetch('klassenordner.json').then(res => {
        res.json().then(data => {
            const entries = parseEntries(data)
            const current = getEntryForDate(entries, new Date())

            if (current === null) {
                const li = document.createElement('li')
                li.innerText = "keine"
                ordnerList.appendChild(li)
                return
            }

            const ordners = current.ordner.map(ordner => {
                const li = document.createElement('li')
                li.innerText = ordner
                return li
            })

            for (let ordner of ordners) {
                ordnerList.appendChild(ordner)
            }
        })
    })
}

function parseEntries(data) {
    return data.map(entry => ({
        ...entry,
        start: new Date(entry.start),
        end: new Date(entry.end)
    }))
}

function getEntryForDate(entries, date) {
    for (let entry of entries) {
        if (entry.start <= date && entry.end >= date) {
            return entry
        }
    }
    return null
}