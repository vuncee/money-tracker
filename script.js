const food_name = document.getElementById("Food-name");
const food_price = document.getElementById("Food-price");
const date = document.getElementById("Date");
const addButton = document.getElementById("Main-button");
const statsButton = document.getElementById("Stats-button");
const list = document.getElementById("All-food");
const statslist = document.querySelector(".stats-list");
const mainElements = document.querySelector(".main")


const DayButton = document.getElementById("Show-stats")
const Sum = document.getElementById("Day-total")
const FilteredList = document.getElementById("Filtered-list");
const FilteredDate = document.getElementById("Stats-date");




function setInitialDates() {
    const now = new Date();
    
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const fullISO = now.toISOString().slice(0, 16); 

    date.value = fullISO; 
    FilteredDate.value = fullISO.slice(0, 10); 
}
setInitialDates(); 

let Allinfo = JSON.parse(localStorage.getItem("MyObject") || "[]");
Allinfo.sort((a, b) => new Date(b.date) - new Date(a.date));
renderList();

addButton.addEventListener("click", async () => {

  const name = food_name.value;
  const price = Number(food_price.value);
  const datevalue = date.value;

  if (name && price && datevalue) {
    const MyObject = {
      name: name,
      price: price,
      date: datevalue,
      id: Date.now(),
    };


    
    Allinfo.push(MyObject);

     Allinfo.sort((a, b) => new Date(b.date) - new Date(a.date));

    localStorage.setItem("MyObject", JSON.stringify(Allinfo));
  }



 

  
  renderList();



  food_name.value = "";
  food_price.value = "";
  food_name.focus();

});

function renderList(data = Allinfo, target = list) {
  target.innerHTML = "";

  data.forEach((item) => {
    const li = document.createElement("li");
   
    const dateFormatted = new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(item.date));

    li.textContent = `${item.name} - ${item.price} Грн (${dateFormatted})`;

    target.appendChild(li)


    if(target === list){
       const delbutt = document.createElement("button");
      delbutt.textContent = "delete";
     delbutt.addEventListener("click", () => {
      Allinfo = Allinfo.filter((element) => element.id !== item.id);

      localStorage.setItem("MyObject", JSON.stringify(Allinfo));

      renderList();
    });
      
    li.appendChild(delbutt);
    }
    

  });

  
}



statsButton.addEventListener("click", () => {

  mainElements.classList.toggle("hidden");
  statslist.classList.toggle("hidden");
 
})

DayButton.addEventListener("click", () => {

  const SelectedDate = FilteredDate.value


  if(!SelectedDate){
    alert("enter date pls")

  };



  const MyFilteredData =  Allinfo.filter(item => {

    return item.date.startsWith(SelectedDate);

  });


  const total = MyFilteredData.reduce((accum, item) => {

    return accum + item.price
    
  }, 0);

  
if(total > 0){
   Sum.textContent = `Загальна сума: ${total} Грн `;
   renderList(MyFilteredData, FilteredList);
}else {
  Sum.textContent = "Немає інфи за цей день"
  FilteredList.innerHTML = "";


}


})


function enterButton(e){
  if(e.key === "Enter"){
    addButton.click()
  }

}

food_name.addEventListener("keydown", enterButton);
food_price.addEventListener("keydown", enterButton);



