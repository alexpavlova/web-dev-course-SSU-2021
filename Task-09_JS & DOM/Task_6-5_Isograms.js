function getString() {
    var input = document.getElementById("getInput").value;
    document.getElementById("getResultTr").innerHTML = formatString(input).toString();
}

function resetStr() {
    document.getElementById("getInput").value = "";
    document.getElementById("getResultTr").innerHTML = "";
}


function formatString(str){
    var result = "";
    str = str.toLowerCase()
    for (var i = 0; i < str.length; i++) {
          let currentChar = str.charAt(i);
          result += currentChar.toUpperCase() + currentChar.toLowerCase().repeat(i);
          if (i < str.length -1) {
              result += "-";
          }
      }
    return result;
 }