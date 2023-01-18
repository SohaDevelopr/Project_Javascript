let color_1 = document.getElementById("color1"),
color_2 = document.getElementById("color2"),
color_3 = document.getElementById("color3"),
color_4 = document.getElementById("color4")
const btnNew = document.getElementById("new")


let arrayOfPalettes = [
    {
      color1: '#7FA7BB',
      color2: '#F7EFED',
      color3: '#F1485B',
      color4: '#33546D'
    },
    {
        color1: '#147587',
        color2: '#FA7E5C',
        color3: '#F3ECE5',
        color4: '#FECB5F'
    },
    {
        color1: '#2BAEB3',
        color2: '#404272',
        color3: '#FF6E3C',
        color4: '#FFD74B'
    },
    {
        color1: '#1A569F',
        color2: '#FEB13F',
        color3: '#CCE6E5',
        color4: '#EB5579'
    },
    {
        color1: '#2F3B68',
        color2: '#47BC97',
        color3: '#5246C1',
        color4: '#F8E0CB'
    },
    {
        color1: '#1D3752',
        color2: '#214D72',
        color3: '#2C7695',
        color4: '#50BFC3'
    },
    {
        color1: '#EC4887',
        color2: '#3B2868',
        color3: '#FEBD25',
        color4: '#F7DDD0'
    },
    {
        color1: '#ED6355',
        color2: '#FDA94F',
        color3: '#6E5BBA',
        color4: '#FA9A94'
    },
    {
        color1: '#729CA2',
        color2: '#C4DCDF',
        color3: '#ECF3F4',
        color4: '#FF893B'
    },
    {
        color1: '#F2D6B4',
        color2: '#94D5D8',
        color3: '#7696BA',
        color4: '#A9CBB8'
    },
    {
        color1: '#1E2F4D',
        color2: '#CCDDEF',
        color3: '#9DC39C',
        color4: '#FEB930'
    },
    {
        color1: '#006BBB',
        color2: '#30A0E0',
        color3: '#FFC872',
        color4: '#FFE3B3'
    },
];


btnNew.addEventListener("click", () => {
    const randomPalette = Number.parseInt(Math.random() * arrayOfPalettes.length + 1);
    color_1.style.backgroundColor = arrayOfPalettes[randomPalette].color1;
    color_1.innerHTML = `${arrayOfPalettes[randomPalette].color1}`
    color_2.style.backgroundColor = arrayOfPalettes[randomPalette].color2;
    color_2.innerHTML = `${arrayOfPalettes[randomPalette].color2}`
    color_3.style.backgroundColor = arrayOfPalettes[randomPalette].color3;
    color_3.innerHTML = `${arrayOfPalettes[randomPalette].color3}`
    color_4.style.backgroundColor = arrayOfPalettes[randomPalette].color4;
    color_4.innerHTML = `${arrayOfPalettes[randomPalette].color4}`
  });

  color_1.addEventListener("click", () => {
    navigator.clipboard.writeText(color_1.innerHTML);
    alert("Copied!");
  })

  color_2.addEventListener("click", () => {
    navigator.clipboard.writeText(color_2.innerHTML);
    alert("Copied!");
  })

  color_3.addEventListener("click", () => {
    navigator.clipboard.writeText(color_3.innerHTML);
    alert("Copied!");
  })

  color_4.addEventListener("click", () => {
    navigator.clipboard.writeText(color_4.innerHTML);
    alert("Copied!");
  })

