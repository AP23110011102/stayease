document.getElementById("switchCheckDefault").addEventListener("change", function(){
      const addTax = this.checked;
      const taxRate = 0.18; // 18% GST
      const prices = document.querySelectorAll(".price");

      prices.forEach(p => {
         const basePrice = parseInt(p.dataset.price);
         const finalPrice = addTax ? Math.round(basePrice * (1+taxRate)) : basePrice;
         p.innerHTML = `<b>${p.innerHTML.split("<br>")[0]}</b><br>&#8377;${finalPrice.toLocaleString("en-IN")}/night`;
      });
});