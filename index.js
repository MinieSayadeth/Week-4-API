const mealsListEl = document.querySelector(".meals");

async function main() {
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
  );
  const mealsData = await meals.json();
  mealsListEl.innerHTML = mealsData.meals
    .map((meals) => mealsHTML(meals))
    .join("");
}

main();

function mealsHTML(meals) {
  return `<div class="meal__container">
  <h3 class="meal__title">${meals.strMeal}</h3>          
  <img src="${meals.strMealThumb}" class="meals--img" alt="">
  <p class="meal__Id">
      ${meals.idMeal}
  </p>
</div>`;
}

async function onSearch(event) {
  document.body.classList += " meals__loading";
  const mealListValue = event.target.value;
  const meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealListValue}`
  );
  //Search result statement
  mealsListEl.innerHTML = `<h2>Searching for meals with: ${mealListValue}</h2>`;
  const mealsData = await meals.json();

  setTimeout(() => {
    const mealListValue = event.target.value;
    let empty = ''
    if (mealsData.meals === null) {
      mealsListEl.innerHTML = `<h2>Oops! Looks like we can't find meals with: ${mealListValue}</h2>`;
    }

    else if (mealListValue === empty) {
      mealsListEl.innerHTML = `<h2>Please enter in an ingredient in the search bar</h2>`;
    }

    else {
      mealsListEl.innerHTML = mealsData.meals
        .slice([0], [6])
        .map((meals) => mealsHTML(meals))
        .join("")
    }

    console.log(empty)
    document.body.classList.remove("meals__loading");
  }, 1000)
}
