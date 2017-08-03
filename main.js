updateTimes();
function addOperation(){
    var table = document.getElementById("operations");
    
    var row = table.insertRow(-1);
    row.align = "center";
    row.innerHTML = '<td style="width:50%;"><select><option>Add</option><option>Subtract</option><option>Multiply</option><option>Divide</option><option>Round</option></select></td><td><input oninput="updateTimes();"></td><td><button onclick="removeOperation(this)">X</button></td>';
    

}

function removeOperation(element){
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
}

function toTimeString(seconds,roundVal){
    var minutes = Math.floor(seconds/60);
    var seconds = seconds % 60;
    if (roundVal !== undefined && roundVal <= 30){
        
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

function toSeconds(string){
    if (string != "0"){
        var list = string.split(":");
        var minutes = parseInt(list[0]);
        var seconds = parseInt(list[1]);
        return (minutes * 60) + seconds;
    }
    else{
        return 0;
    }
}

function applyOps(data,value){

    for (i=0;i<data.length;i++){
        if (data[i][0] == "Subtract"){
            value =  value - parseFloat(data[i][1]);
        }
        if (data[i][0] == "Add"){
            value =  value + parseFloat(data[i][1]);
        }
        if (data[i][0] == "Multiply"){
            value =  value * parseFloat(data[i][1]);
        }
        if (data[i][0] == "Divide"){
            value =  value / parseFloat(data[i][1]);
        }
        if (data[i][0] == "Round"){
            value =  round(value,data[i][1]);
        }
        
        
    }
    
    return round(value,1)
}

function updateTimes(){
    var isValid = true;
    var table = document.getElementById("operations");
    var data = [];
    for (var i = 0, row; row = table.rows[i]; i++) {
        var operation = $('#operations tr:eq(' + i + ') select').val();
        var value = $('#operations tr:eq(' + i + ') input').val();

        if (value.split(":").length > 1){
            console.log("test");
            value = toSeconds(value);
            console.log(value);
        }
        if (isNaN(parseFloat(value))){
            isValid = false;
        }
        else{
            data.push([operation,value]);
        }
        
    }
    

    html = "";

    if (parseInt(document.getElementById('stepTime').value) == 0){
        html = "<tr align='center'><td colspan=2>???</td></tr>";
        document.getElementById("timeTable").innerHTML = html;
        return;
    }
    
    for (row=toSeconds(document.getElementById("minTime").value);row<=toSeconds(document.getElementById("maxTime").value);row+= Math.abs(parseInt(document.getElementById("stepTime").value))){
        if (isValid){
            html += "<tr><td>" + toTimeString(row) + "</td><td>" + toTimeString(applyOps(data,row)) + "</td></tr>";
        }
        else{
            html += "<tr><td>" + toTimeString(row) + "</td><td>???</td></tr>";
        }
    }
    
    if (html == ""){
        html = "<tr align='center'><td colspan=2>???</td></tr>";
    }
    
    document.getElementById("timeTable").innerHTML = html;
    
    
}



function round(number, place){
    return Math.round(number / place) * place;
}