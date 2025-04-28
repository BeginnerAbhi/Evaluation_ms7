function createFunctionRegistry()
{
    const registry=new Map();

    return{

        registerFunction(name, fn)
        {
            if(typeof fn !== 'function')
            {
                throw new Error("Only Functions can be registered");

            }
            registry.set(name, fn);
        },

        executeFunction(name, args=[],context=null)
        {
            if(!registry.has(name))
            {
                throw new Error('Function "${name}" not found');
            }
            return registry.get(name).apply(context,args);
        },

        mapFunction(name,dataArray)
        {
            if(!registry.has(name))
            {
                throw new Error('Function "${name}" not found');
            }
            return dataArray.map(registry.get(name));
        },

        filterFunction(name,dataArray)
        {
            if(!registry.has(name))
            {
                throw new Error('Function "${name}" not found');
            }
            return dataArray.filter(registry.get(name));
        },

        reduceFunction(name, dataArray, initialValue)
        {
            if(!registry.has(name))
            {
                throw new Error('Function "${name}" not found');
            }
            return dataArray.reduce(registry.get(name),initialValue);
        },

        executeFunctionAsync(name,args=[],delay=0)
        {
            if(!registry.has(name))
            {
                throw new Error('Function "${name}" not found');
            }
            return new Promise((resolve)=>{
                setTimeout(()=>resolve(registry.get(name).apply(null,args)),delay);
            });
        },

        exportRegistry()
        {
            return JSON.stringify([...registry.keys()]);
        }




        };
}

//usage
const registry = createFunctionRegistry();
registry.registerFunction("double", x => x * 2);
console.log(registry.executeFunction("double", [5]));

registry.executeFunctionAsync("double", [4], 2000).then(console.log);

