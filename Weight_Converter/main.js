
let input = document.getElementById("input")
let btnKg = document.getElementById("btn-kg")
let btnIbs = document.getElementById("btn-ibs")
let result = document.getElementById("result")

// Button Convert Pound To Kilogram
btnKg.onclick = () => {
    if(input.value === "") {
        result.innerHTML = "TextBox is Empty"
        result.style.color = "#f44336"
    }

    else {
        result.style.color = "#319DA0"
        let res = input.value * 0.45359237;
        result.innerHTML = `${input.value} Pound = ${res.toFixed(4)} Kilogram`
        input.value = ""
    }
}

// Button Convert Kilogram To Pound
btnIbs.onclick = () => {
    if(input.value === "") {
        result.innerHTML = "TextBox is Empty"
        result.style.color = "#f44336"
    }

    else {
        result.style.color = "#319DA0"
        let res = input.value * 2.2046226218;
        result.innerHTML = `${input.value} Kilogram = ${res.toFixed(4)} Pound`
        input.value = ""
    }
}
