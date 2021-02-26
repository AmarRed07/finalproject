
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
    static url = "https://crudcrud.com/api/5c82594d1f594441a2f62f4a4a228ad1/unicorns" //API url when we get one lol

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
       // return $.post(this.url, date);
       return $.ajax({
            url: this.url,
            dataType: 'json',
            data: JSON.stringify(date),
            contentType: 'application/json',
            type: 'POST'
        });

    }

<<<<<<< HEAD
    //delete date
     static deleteDate(id) {
         return $.ajax({
             url: this.url + `/${id}`,
             type: 'DELETE'
         })
     }

=======
>>>>>>> fd36115cc41e5507e46553a34992a33642b94877
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

class DOMManager {
    static dates; 

    static getDatesAndRender () {
       APIcalls.allDates().then((dates)=>this.render(dates)); 
    }

//gets all dates then rendes the dom
    static allDates(){
        APIcalls.allDates().then(dates =>this.render(dates)); 
    }

    //makes the date then renders the DOM, getting on error where it dosent render the dom. 

    static createDate (newDate) {
        APIcalls.createDate(new date(newDate))
        .then(()=> {
            return APIcalls.allDates();
        })
        .then(dates => this.render(dates))
    }

    //delete the date
    static deleteDate(id) {
        APIcalls.deleteDate(id)
        .then(()=> {
            return APIcalls.allDates();
        })
        .then(dates => this.render(dates))
    }

    //delete date
    static deleteDate(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        })
    }
// delete the date button -working.
    static deleteDate(id) {
        APIcalls.deleteDate(id)
        .then(() => {
            return APIcalls.getDatesAndRender();
        })
        .then((dates) => this.render(dates));
    }


<<<<<<< HEAD

=======
>>>>>>> fd36115cc41e5507e46553a34992a33642b94877
    //still need the add the res add and delete.
    //renders the dome.
    static render(dates) {
        this.dates = dates;
        $('#date-table').empty(); 
        for(let date of dates){
            $('#date-table').prepend(
                `<div id="${date._id}" class="card">
                <div class="card-header">
                    <h2>${date.date}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deleteDate('${date._id}')"> Delete </button>
                </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row"> 
                                <div class="col-sm"> 
                                    <input type="text" id="${date._id}-Reservation Name" class="form-control" placeholder="Reservation Name">
                                </div>
                                <div class="col-sm">
                                <input type="text" id="${date._id}-Number of Party" class="form-control" placeholder="Number in a party">
                                </div>
                            </div> <br>
                            <bitton id="${date._id}-new-room" onclick="DOMManager.addRoom('${date._id}')" class="btn btn-primary form-control">Add</button>
                         </div>
                    </div>
            </div>  <br>`
            ); 
        }

    }


}

//event lister on the create.
 $('#create-new-house').click(()=> {
     DOMManager.createDate($('#date').val())
 })

//calling the create function 
DOMManager.allDates(); 
