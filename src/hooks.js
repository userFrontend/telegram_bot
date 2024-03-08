const useEffect = (callback, dependencies) => {
    // Calling it first time since there are no dependency
    if (dependencies === undefined) {
      return callback();
    }
  
    // Creating proxy for setters
    return new Proxy(dependencies, {
      set: function (target, key, value) {
        Reflect.set(target, key, value);
        callback();
      },
    });
  };
  
  module.exports = {useEffect};