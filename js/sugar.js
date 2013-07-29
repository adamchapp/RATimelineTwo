//Hides the prototype object to clarify code
//From Javascript : The Good Parts
//
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

//Makes Adam feel better about prototype inheritence, whilst
//really accomplishing nothing
Function.prototype.extends = function(obj)
{
    this.prototype = obj.prototype;
    return this;
};