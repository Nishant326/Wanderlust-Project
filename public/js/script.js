(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            };

            form.classList.add('was-validated')
        }, false);
    })
})();


//tax fillter
let togleBtn = document.getElementById("switchCheck");
togleBtn.addEventListener("click", () => {
  let taxInfos = document.getElementsByClassName("taxInfo");
  console.log(taxInfos);
  for (taxInfo of taxInfos) {
    if (taxInfo.style.display != "inline") {
      taxInfo.style.display = "inline";
    } else {
      taxInfo.style.display = "none";

    }
  }
});
//responsive fillter 
let bar = document.getElementById("bars");

console.log(bar)

bar.addEventListener("click", () => {
    let fillters = document.getElementsByClassName("filter");

    for(fillter of fillters){
        if(fillter.style.display == "none"){
        fillter.style.display = "inline"
    }else{
        fillter.style.display = "none"
}
}

})

// bars.addEventListener()("click",()=>{
//     fillter.style.display="inline";
// });

