function store(value) {
    sessionStorage.setItem("type", value);
    console.log(sessionStorage.getItem("type"));
}

//Do not remove below line of code
if (typeof exports !== "undefined") {
    module.exports = {
        store,
    };
}
