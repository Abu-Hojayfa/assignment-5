// search food
const search = () => {
  const search = document.getElementById('input').value;
  const searchLength = search.length;
  let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + search + '';

  if (searchLength > 1) {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + search + '';
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {

      const showFood = data.meals;
      document.getElementById('foodMenu').textContent = '';

      showFood.forEach(element => {
        const foodName = element.strMeal;
        const foodImg = element.strMealThumb;

        const menu = document.getElementById('foodMenu');
        const singleFood = document.createElement('div');
        singleFood.classList.add("food-sub-menu");

        singleFood.innerHTML = `<div onclick="foodIngredients('${foodName}')">
                                <img src="${foodImg}" class="img-fluid rounded">
                                <h4 class="text-center">${foodName}</h4>
                                </div>
                                `;
        menu.appendChild(singleFood);
      });
    })

    .catch(error => {
      document.getElementById('foodMenu').style.display = "none";
      document.getElementById('alert').style.display = "block";
    });


};

// food information
function foodIngredients(name) {

  const blur = document.getElementById("foodMenu");
  blur.classList.add("blur");

  document.getElementById('showDetails').style.display = "block";

  const url = ('https://www.themealdb.com/api/json/v1/1/search.php?s=' + name + '');
  fetch(url)
    .then(response => response.json())
    .then(data => {

      const foodInfo = data.meals;

      foodInfo.forEach(element => {
        const foodName = element.strMeal;
        const foodImg = element.strMealThumb;

        const foodInformation = document.getElementById('showDetails');
        const singleFoodInfo = document.createElement('div');

        singleFoodInfo.innerHTML = `
                                  <img src="${foodImg}" alt=""  class="img-fluid rounded ">
                                  <h3 class="ms-5 mb-3">${foodName}</h3>
                                  <div>
                                  <ul><h5>Ingredients: </h5>
                                  <li class="ms-4">${element.strIngredient1}</li>
                                  <li class="ms-4">${element.strIngredient2}</li>
                                  <li class="ms-4">${element.strIngredient3}</li>
                                  <li class="ms-4">${element.strIngredient4}</li>
                                  <li class="ms-4">${element.strIngredient5}</li>
                                  <li class="ms-4">${element.strIngredient6}</li>
                                  <li class="ms-4">${element.strIngredient7}</li>
                                  <li class="ms-4">${element.strIngredient8}</li>
                                  <li class="ms-4">${element.strIngredient9}</li>
                                  <li class="ms-4">${element.strIngredient10}</li>
                                </ul>
                                  </div>
                                  
                                  <button class="btn-success  align-items-center mt-3" onclick="showMain()">Go
                                  Back</button>
                                  
                                  `;

        foodInformation.appendChild(singleFoodInfo);
      });

    });
  console.log(name);
}

// go back
function showMain() {
  const blur = document.getElementById("foodMenu");
  blur.classList.remove("blur");
  document.getElementById('showDetails').textContent = "";
  document.getElementById('showDetails').style.display = "none";
}