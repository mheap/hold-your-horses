var __ = function(){}

__.prototype.hello = (name) => {
    name = name || "World";
    return "Hello " + name;
}

module.exports = __;
