const registerTempStateOnLocalStrg = (generalState) => {

    window.localStorage.setItem(
        "pokemon-temp-list",
        JSON.stringify(generalState)
    );
};

export {
    registerTempStateOnLocalStrg
}