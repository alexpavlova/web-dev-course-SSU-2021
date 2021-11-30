function CreateM(n, m, message){
    if (!Number.isInteger(n) || !Number.isInteger(m)){
        return "The size of the matrix must be integer."
    }
    if(n < 0 || m < 0){
        return "The size of the matrix must be positive."
    }

    let result = "+---".repeat(m) + "+\n" 
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if (i * m + j < message.length){
                result += `| ${message[i * m + j]} `;
            }
            else{
                result += "|   ";
            }
        }

        result += "|\n" + "+---".repeat(m) + "+\n";
    }

    return result;
}

console.log('7.2. Форматирование строки в таблицу ');
console.log(CreateM(4, 4, 'Hello World!'));
console.log(CreateM(4, 3, "Nice pattern"));
console.log(CreateM(3, 4, "Nice pattern"));
console.log(CreateM(0, 0, "Nice pattern"));
console.log(CreateM(-1, 4, "Nice pattern"));
console.log(CreateM(3, 4.3, "Nice pattern"));
console.log(CreateM(1, 1, ""));