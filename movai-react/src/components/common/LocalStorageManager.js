// Handle local storage, will chekc for stored operators and update active states based on that
class LocalStorageManager {

    // Load operators from local storage
    static loadOperators(defaultOperators) {
        const storedOperators = JSON.parse(localStorage.getItem('operators'));
        if(storedOperators) {
            const updatedOperators = defaultOperators.map(defaultOp => {
                const storedOp = storedOperators.find(op => op.id === defaultOp.id);
                return storedOp ? { ...defaultOp, active: storedOp.active } : defaultOp;
            });
            return updatedOperators;
        }
        
        // returns default list of operators if nothing in storage
        return defaultOperators; 
    }

    // Save operators to local storage
    static saveOperators(operators) {
        localStorage.setItem('operators', JSON.stringify(operators));
    }
}

export default LocalStorageManager;
