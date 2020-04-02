const getRandomArray = (numItems) => {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for(var i = 0; i < numItems; i++) {
        data.push({
        label: names[i],
        value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
    } ;   

const getData = () => {
    let data = [];
        
    data.push({
        title: 'Categories',
        data: getRandomArray(20)
    });
    
    data.push({
        title: 'Categories',
        data: getRandomArray(10)
    });
    
    data.push({
        title: 'Data 4',
        data: getRandomArray(6)
    });
    
    return data;
    };

exports.getData = getData;

