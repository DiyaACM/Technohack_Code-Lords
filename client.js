//client side js

function enterdetails() {

    const userRequest = new XMLHttpRequest();
    userRequest.open('post', '/add');
    userRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    userRequest.send(JSON.stringify({'Name':document.getElementById("name").value,'Dob': document.getElementById("dob").value,'Address':document.getElementById("address").value,'MedInfo':document.getElementById("medinfo").value,'Contact':document.getElementById("contact").value,'Duration':document.getElementById("duration").value,'GuardianName':document.getElementById("gname").value,'Relation':document.getElementById("relation").value,'Occupation':document.getElementById("occupation").value,'GuardianContact':document.getElementById("gcontact").value,'GuardianAddress':document.getElementById("gaddress").value,'GuardianEmail':document.getElementById("email").value}));

}