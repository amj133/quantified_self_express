const Meal = require('../../models/meal')
const Food = require('../../models/food')
const FoodMeal = require('../../models/food_meal')

const getMeals = async (req, res) => {
  const mealData = await Meal.findAll()
  const meals = mealData.rows.map(async meal => {
    const addedMeal = new Meal(meal.id, meal.name)
    await addedMeal.getFoods()
    return addedMeal
  })
  const awaitedMeals = await Promise.all(meals)
  res.json(awaitedMeals)
}

const getFoodsForMeal = async (req, res) => {
  let id = req.params.id
  const mealData = await Meal.find(id)
  const meal = new Meal(mealData.rows[0].id, mealData.rows[0].name)
  await meal.getFoods()
  res.json(meal.foods)
}

const addFoodToMeal = async (req, res) => {
  let mealId = req.params.meal_id
  let foodId = req.params.food_id
  const mealData = await Meal.find(mealId)
  const foodData = await Food.find(foodId)
  if (mealData.rows[0] === undefined || foodData.rows[0] === undefined) {
    res.sendStatus(404)
  } else {
    const meal = new Meal(mealData.rows[0].id, mealData.rows[0].name)
    const food = new Food(foodData.rows[0].id, foodData.rows[0].name, foodData.rows[0].calories)
    await FoodMeal.create(foodId, mealId)
    const message = {message: `Successfully added ${food.name} to ${meal.name}`}
    res.json(message)
  }
 }

module.exports = {
  getMeals,
  getFoodsForMeal,
  addFoodToMeal
}
