
const buttonBox = document.querySelectorAll(".button-box button"),
pricingCards = document.querySelector(".pricing-cards"),
price = document.querySelectorAll(".plan-price .price"),
namePlan = document.querySelectorAll(".plan-price .name-plan")

let arrayBtn = Array.from(buttonBox)

arrayBtn.forEach((ele)=> {
    ele.addEventListener("click", (e) => {
        arrayBtn.forEach((ele) => {
          ele.classList.remove("active");
        });
        console.log(typeof e.currentTarget.dataset.plan)
        let plan = e.currentTarget.dataset.plan;
        if(plan === "monthly") {
            price[0].innerHTML = "$3.99 / week";
            namePlan[0].innerHTML = "Billed monthly";
            price[1].innerHTML = "$5.99 / week";
            namePlan[1].innerHTML = "Billed monthly";
            pricingCards.classList.add("paln-monthly")
            pricingCards.classList.remove("paln-yearly")
        }else {
            price[0].innerHTML = "$8.99 / month";
            namePlan[0].innerHTML = "Billed yearly";
            price[1].innerHTML = "$21.99 / month";
            namePlan[1].innerHTML = "Billed yearly";
            pricingCards.classList.add("paln-yearly")
            pricingCards.classList.remove("paln-monthly")
        }
    
        e.currentTarget.classList.add("active");
      });
})