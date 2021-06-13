function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

const urlsText = Object.values(sessionStorage).find(x => x.includes('events'))
const urlEvents = JSON.parse(urlsText).events

fetch(`${urlEvents}`, {
    "headers": {
        "authorization": `Bearer ${sessionStorage.userToken}`,
    }
})
    .then(res => res.json())
    .then(response => {
        let csvContent = "data:text/csv;charset=utf-8," + ConvertToCSV(response.events)
        window.open(encodeURI(csvContent))
    })
