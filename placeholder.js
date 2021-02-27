
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

//made an ID for the res.
let utils = (function() {
    let ids = 0;
    function getNewId() {
        return ids++;
    }

    return { getNewId };
})();

//class for the res info.
class Reservations {
    constructor(name, partySize,id) {
        this.name = name;
        this.partySize = partySize;
        this.id = id;
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
        //find date
        static updateDate(date) {
            return $.ajax({
                url: this.url+ `/${date._id}`,
                dataType: 'json',
                data: JSON.stringify({
                    "date" : date.date,
                    "reservations" : date.reservations}),
                contentType: 'application/json', 
                type: 'PUT'
            });
        }
    //delete date
    static deleteDate(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        })
    }
}

class DOMManager {
    static dates; 

    //renders the dom
    static getDatesAndRender () {
       return APIcalls.allDates().then((dates)=>this.render(dates)); 
    }

//gets all dates then rendes the dom
    static allDate(){
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
        APIcalls.deleteDate(id).then(this.getDatesAndRender())
        .then(()=> {
            return APIcalls.allDates();
        })
        .then(dates => this.render(dates))
    }

    //add the res
    static addRes(id) {
        for (let date of this.dates) {
            //finds date ID
            if (date._id == id) {
                //finds matching date and makes a new res 
                date.reservations.push(new Reservations($(`#${date._id}-room-name`).val(), $(`#${date._id}-room-area`).val(),utils.getNewId()));
                APIcalls.updateDate(date)
            }
            this.getDatesAndRender();
        }
    }

    static deleteRes (dateId,resId) {
        for(let date of this.dates) {
            //finds matching date 
            if(date._id == dateId){
                for(let res of date.reservations){
                    //finds matching res id
                    if( res.id == resId){
                        //removes res and updates object
                        date.reservations.splice(date.reservations.indexOf(res),1);
                        APIcalls.updateDate(date)
                    }
                    this.getDatesAndRender()
                    this.getDatesAndRender()
                }
            }
        }
    }


    //still need the add the res add and delete.
    //renders the dome.
    static render(dates) {
        this.dates = dates

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
                                    <input type="text" id="${date._id}-room-name" class="form-control" placeholder="Guest Name">
                                </div>
                                <div class="col-sm">
                                <input type="text" id="${date._id}-room-area" class="form-control" placeholder="Party Size">
                                </div>
                            </div> <br>
                            <bitton id="${date._id}-new-room" onclick="DOMManager.addRes('${date._id}')" class="btn btn-primary form-control">Add</button> <br>
                         </div>
                    </div>
            </div>  <br>`
            ); 
            for (let res of date.reservations) {
                $(`#${date._id}`).find('.card-body').append(
                    `<p>
                            <span id="name-${res.id}"><strong> Name : </strong> ${res.name} </span>
                            <span id="name-${res.id}"><strong> Part Size : </strong> ${res.partySize} </span>
                            <button class="btn btn-danger" onclick="DOMManager.deleteRes('${date._id}','${res.id}')">Delete Room</button>`
                )
            }
        }

    }


}

//event lister on the create.
$('#create-new-house').click(()=> {
    DOMManager.createDate($('#date').val())
})

//calling the create function 
DOMManager.allDate(); 
