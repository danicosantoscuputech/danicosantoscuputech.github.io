/* Fetches data from the JSON file via AJAX */

const loadJSON = function (callback) {
    let requestData = new XMLHttpRequest();
    requestData.open("GET", "https://danicosantoscuputech.github.io/assets/dataset/people-collection.json", true);
    requestData.send(null);
    requestData.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
}

/* Adds table HTML markup */

const addTab = function (id, name, age, active, email, phone, company, balance) {
    let anchorCtrl, mainResult, add, i;
    mainResult = document.getElementById("mainResult");
    anchorCtrl = mainResult.querySelectorAll('a');   
    add = "<tr><td ><a id='"+ id +"' href='employee-detail.html' title='Employee Details' onclick='storageData(this);'><img style='width: 32px' src='./assets/img/avatar-employee.png' alt='Employee Picture'></a></td><td>" + name + "</td><td>" + age + "</td><td>" + active + "</td><td>" + email + "</td><td>" + phone + "</td><td>" + company + "</td><td>" + balance + "</td><td>"
    "</tr>";
    for (i = 0; i < anchorCtrl.length; i++) {
        if (id == anchorCtrl[i].getAttributeNode('id').value) {
            add = "";
            break;
        }
    }
    mainResult.innerHTML += add;
    
    
}

/* Clears the result table */

const clearTab = function() {
    document.getElementById("mainResult").innerHTML = "";
}

/* Simple search filter */

const searchData = function () {
    let input, filter, infoMsg;
    input = document.getElementById("employee");
    infoMsg = document.getElementById("infoMsg");
    filter = input.value.toLowerCase();
    if (filter.length > 0 && filter.length < 3) {
        infoMsg.style.display = "inline";
        infoMsg.innerHTML = "Please insert at least  3 (three) characters";
    } else {
        infoMsg.style.display = "none";
    }

    /* Starts the fetch data function */

    init = (function () {
        loadJSON(function (response) {
            let jsonObj, filterName, searchArray;
            searchArray = [];
            jsonObj = JSON.parse(response);
            for (x in jsonObj) {
                filterName = jsonObj[x].name.toLowerCase();
                if (filterName.indexOf(filter) > -1 && filter.length >= 3) {
                    searchArray.push(jsonObj[x]);
                }
            }
            if (searchArray.length >= 1) {
                clearTab();
                for (y in searchArray) {
                    addTab(searchArray[y]._id, searchArray[y].name, searchArray[y].age, searchArray[y].isActive, searchArray[y].email, searchArray[y].phone, searchArray[y].company, searchArray[y].balance);
                }
            }else if(searchArray.length === 0) {
                clearTab();
            }
            
            return console.log(searchArray);
        });
    })();
}

/* Shows additional results based on the first letter */

const showAll = function() {
    loadJSON(function(response) {
        let jsonObj, searchKey, searchArray, filter;
        searchArray = [];
        jsonObj = JSON.parse(response);
        searchKey =         document.getElementById("employee").value;
        filter = searchKey.toLowerCase();
        for (x in jsonObj) {
            var filterName = jsonObj[x].name.toLowerCase();
            if (filterName.indexOf(filter.slice(0,1)) > -1 && filter.length >= 3) {
                searchArray.push(jsonObj[x]);
            }
        }
        if (searchArray.length >= 1) {  
            for (y in searchArray) {
                addTab(searchArray[y]._id, searchArray[y].name, searchArray[y].age, searchArray[y].isActive, searchArray[y].email, searchArray[y].phone, searchArray[y].company, searchArray[y].balance);
            }
        }else if(searchArray.length === 0) {
            clearTab();
        }
        return console.log(searchArray);

    });
}

/* Stores the objects ID property */

const storageData = function(elmnt) {
    let id = elmnt.getAttributeNode("id").value;
    localStorage.setItem('id', id);
};

/* Clears the localStorage Data */

const clearData = function() {
    localStorage.clear();
}

/* Map setup */

const locationMap = function(lat, lng) {
    let mapCenter, mapOpt, marker, map;
    mapCenter = new google.maps.LatLng(lat, lng);
    mapOpt = {
        center: mapCenter,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    marker = new google.maps.Marker({position: mapCenter});
    map = new google.maps.Map(document.getElementById("map"), mapOpt);
    marker.setMap(map);
};

/* Fetch additional data to the chosen-employee page */

const empData = function()  {
    loadJSON(function(response) {
        let jsonObj, id, empObj, picture; 
        jsonObj = JSON.parse(response);
        id = localStorage.getItem('id');
        for (x in jsonObj) {
            if (id == jsonObj[x]._id) {
                empObj = jsonObj[x];
            }
        }
       
         picture = document.getElementById("picture");
        document.getElementById("rgsDate").innerHTML = empObj.registered ; 
        document.getElementById("empName").innerHTML = empObj.name;
        document.getElementById("fullName").innerHTML = empObj.name;
        document.getElementById("gender").innerHTML = empObj.gender;
        if (empObj.gender === "male")  {
            picture.src = "./assets/img/male-avatar.png";
        }else {
            picture.src = "./assets/img/female-avatar.png"
        }
        document.getElementById("phone").innerHTML = empObj.phone;
        document.getElementById("company").innerHTML = empObj.company;
        document.getElementById("addr").innerHTML = empObj.address;
        document.getElementById("about").innerHTML = empObj.about;
        
        locationMap(empObj.latitude, empObj.longitude);        
    });
};