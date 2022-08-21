import DrinkingUser from './CreateUserDb';
import { getDatabase, ref, get, push, onValue, remove, update } from "firebase/database";

export default class DrinkingUserManager {
    constructor(db) {
        this.db = db;
    }

    //* Отримуємо дані з Firebase - "один раз"
    fetchUserById(id) {
        const user = new DrinkingUser(id);
        // TODO Забирає юзера лише один раз
        return get(ref(this.db, 'drinkingUser/' + `idUser:${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let dataDb = snapshot.val();
                    //TODO change 
                    let cocktails = dataDb.cocktails === undefined ? [] : dataDb.cocktails;
                    // dataDb ? (cocktails = Object.values(dataDb)) : (cocktails = false);
                    user.importCocktails(cocktails);
                    //TODO by ingredient
                    let ingredients = dataDb.ingredients === undefined ? [] : dataDb.ingredients;
                    user.importIngredients(ingredients);
                    user.setExistInDb();
                    return user;
                } else {
                    console.log("No data available");
                    // console.log(snapshot);
                    return user;
                }
            })
            .catch((error) => {
                console.log("error");
                // console.error(error);
            });
    }

    //* set data to db  Створюю юзера якщо його немає Можна повернути привітання.
    pushUserById(user) {
        const id = user.getId();
        let dataDb = {};
        dataDb.cocktails = user.getFavoritesCocktails();
        dataDb.ingredients = user.getFavoritesIngredients();
        return push(ref(this.db, 'drinkingUser/' + `idUser:${id}`), dataDb)
            .then((response) => {
                console.log("🚀 ~pushUserById .then console", response)
                // //TODO response.status
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //* Відслідковуємо дані з Firebase по вебсокетах постійно  - Считайте данные один раз с помощью наблюдателя
    getDataFromFirebase(user) {
        const id = user.getId();
        const cocktails = ref(this.db, 'drinkingUser/' + id + '/cocktails');
        const ingredients = ref(this.db, 'drinkingUser/' + id + '/ingredients');
        onValue(cocktails, snapshot => {
            const dataDb = snapshot.val();
            dataDb ? (cocktails = Object.values(dataDb)) : [];
        });
        onValue(ingredients, snapshot => {
            const dataDb = snapshot.val();
            dataDb ? (ingredients = Object.values(dataDb)) : [];
        });
    }

    //* Пушимо ід коктейла в Firebase
    pushCocktailToDbByUserId(idCocktail, user) {
        try {
            const id = user.getId();
            const cocktails = ref(this.db, 'drinkingUser/' + id + '/cocktails');
            // dataDb.cocktails = user.addFavoriteCocktailById(idCocktail)
            // let cocktails = dataDb.cocktails;
            // user.importCocktails(cocktails);
            push(ref(this.db, 'drinkingUser/' + id + '/cocktails/'), idCocktail);
        } catch (error) {
            throw new Error("error.message")
        }
    }

    //* Видаляємо дані з Firebase
    deleteCocktailDbByUserId(idCocktail, user) {
        try {
            const id = user.getId();
            // dataDb.cocktails = user.deleteFavoriteCocktailById(idCocktail)
            // let cocktails = dataDb.cocktails === undefined ? [] : dataDb.cocktails;
            update(ref(this.db, 'drinkingUser/' + id + '/cocktails/'), dataDb);
            user.importCocktails(cocktails);
        } catch (error) {
            throw new Error("error.message")
        }
    }

    //* Пушимо ід інгредієнта в Firebase
    pushIngredientToDbByUserId(idIngredient, user) {
        try {
            const id = user.getId();
            dataDb.ingredients = user.addFavoriteIngredientById(idIngredient);
            let ingredients = dataDb.ingredients
            push(ref(this.db, 'drinkingUser/' + id + '/ingredients/'), idIngredient);
            user.importIngredients(ingredients);
        } catch (error) {
            throw new Error("error.message")
        }
    }

    //* Видаляємо ід інгредієнта з Firebase
    deleteIngredientDbByUserId(idIngredient, user) {
        try {
            const id = user.getId();
            dataDb.ingredients = user.deleteFavoritesIngredientById(idIngredient);
            let ingredients = dataDb.ingredients === undefined ? [] : dataDb.ingredients;
            update(ref(this.db, 'drinkingUser/' + id + '/ingredients/'), idIngredient);
            user.importIngredients(ingredients);
        } catch (error) {
            throw new Error("error.message")
        }
    }
}