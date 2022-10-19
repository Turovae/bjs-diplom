const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((respond) => {
        if (respond.success) {
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const getStocks = () => {
    ApiConnector.getStocks((stocks) => {
        if (stocks.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(stocks.data);
        }
    });
};

getStocks();
setInterval(getStocks, 1000 * 60);

const moneyManager = new MoneyManager();

// Пополнение кошелька
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

// Конвертация валют
moneyManager.conversionMoneyCallback = (data) => {

    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация прошла успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {

    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Вы успешно перевели средства");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

// Создание объекта типа FavoriteWidget
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {

    ApiConnector.addUserToFavorites(data, (response) => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен в избранное");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
};

favoritesWidget.removeUserCallback = (userId) => {

    ApiConnector.removeUserFromFavorites(userId, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удален");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
};