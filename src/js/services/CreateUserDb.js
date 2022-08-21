export default class DrinkingUser {
    constructor(id) {
        this.ID = id;
        this.favoritesCocktails = [];
        this.favoritesIngredients = [];
        this._isExistInDb = false;
    }

    isExistInDb() {
        return this._isExistInDb;
    }

    setExistInDb() {
        this._isExistInDb = true;
        return this;
    }

    getId() {
        return this.ID;
    }

    // addFavouriteCocktailById(id) {
    //     this.favouritesCocktails = {
    //         ...this.favouritesCocktails,
    //         id
    //     }
    //     return this;
    // }

    // deleteFavouritesCocktailsById(id) {
    //     const array = Object.values(this.favouritesCocktails);
    //     console.log(array);
    //     this.favouritesCocktails = array.reduce((acc, key) => {
    //         if (key !== id) {
    //             acc = key;
    //         }
    //         return acc;
    //     }, {})
    //     return this;
    // }

    // getFavouritesCocktails() {
    //     return this.favouritesCocktails
    // }

    // hasFavouriteCocktailById(id) {
    //     const array = Object.values(this.favouritesCocktails)
    //     return array.find((data) => data = id);
    // }

    //TODO описуємо коктейлі

    addFavoriteCocktailById(id) {
        if (!this.favouritesCocktails.find(data => data === id)) {
            this.favouritesCocktails.push(id);
        }
        return this;
    }

    deleteFavoriteCocktailById(id) {
        this.favouritesCocktails.filter(data => data !== id)
        return this;
    }

    getFavoritesCocktails() {
        return this.favouritesCocktails
    }

    hasFavoriteCocktailById(id) {
        return this.favouritesCocktails.find(data => data === id);
    }

    importCocktails(data) {
        for (let i in data) {
            this.addFavoriteCocktailById(data[i])
        }
        return this;
    }

    //TODO описуємо інгрідієнти

    addFavoriteIngredientById(id) {
        if (!this.favouritesIngredients.includes(id)) {
            this.favouritesIngredients.push(id);
        }
        return this;
    }

    deleteFavoritesIngredientById(id) {
        this.favouritesIngredients.filter(data => data !== id)
        return this;
    }

    getFavoritesIngredients() {
        return this.favouritesIngredients;
    }

    hasFavoriteIngredientById(id) {
        return this.favouritesIngredients.includes(id);
    }


    importIngredients(data) {
        for (let i in data) {
            this.addFavoriteIngredientById(data[i])
        }
        return this;
    }



}