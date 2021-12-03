function getVowels() {
    var input = document.getElementById("getInputVowels").value;
    document.getElementById("getResult").innerHTML = Numb_Vls(input).toString();
}

function reset() {
    document.getElementById("getInputVowels").value = "";
    document.getElementById("getResult").innerHTML = "";
}


function Numb_Vls(str){
    for(let i = 0; i < str.length; i++){
      return str.split("").filter(c => "aeiouy".includes(c.toLowerCase())).length;
    }
 }