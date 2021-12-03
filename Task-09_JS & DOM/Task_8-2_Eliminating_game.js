function startTask_8_2() {
    var num = document.getElementById("Game_Num").value;
    var number = document.getElementById("Game_Number").value;
    document.getElementById("Result_G").innerHTML = game(parseInt(num, 10), parseInt(number, 10)).toString();
}

function resetTask_8_2() {
    document.getElementById("Game_Num").value = "";
    document.getElementById("Game_Number").value = "";
    document.getElementById("Result_G").innerHTML = "";
}


function game(num, number) {

    let listPlayer = new Array(num).fill().map((e, i) => i + 1)

    for (let i = 1; listPlayer.length > 1; i++){
        let actual = listPlayer.shift();
        !(i % number == 0) 
        ? listPlayer.push(actual)
        : i = 0;
    }
    return listPlayer.shift();
}