
//class date for all res can be grouped under
class date {
    constructor(date) {
        this.date = date;
        this.reservations = []
    }
    addRes(name, time, partySize) {
        this.reservations.push(new reservations(name, time, partySize));
    }
}

//class for the res info.
class reservations {
    constructor(name, time, partySize) {
        this.name = name;
        this.time = time;
        this.partySize = partySize;
    }
}


class APIcalls {
    static url = "" //API url when we get one lol

    //geting all the date
    static allDates() {
        return $.get(this.url);
    }

    //get a singal date
    static getDate(id) {
        return $.get(this.url + `/${id}`);
    }

    //create date
    static createDate(date) {
        return $.post(this.url, date);
    }

    //delete date
    static deleteDate(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        })
    }

    //find date
    static updateHouse(date) {
        return $.ajax({
            url: this.url + `/${date.id}`, //the ID is a guess for the API or array.
            datatype: 'json',
            data: JSON.stringify(date),
            contentType: 'application/json',
            type: 'PUT'
        });
    }
}