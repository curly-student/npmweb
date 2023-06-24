function removeOrderItem(orderInfo, position){
    if(!Array.isArray(orderInfo.items)) {
        throw new Error('Items should be an array');
    }

    for(let i=0; i < orderInfo.items.length; i++) {
        if(!orderInfo.items[i].hasOwnProperty('price') || !orderInfo.items[i].hasOwnProperty('quantity')) {
            throw new Error('Malformed item');
        }
    }
    if(position < 0 || position > orderInfo.items.length) {
        throw new Error('Invalid position');
    }

    orderInfo.items.splice(position,1);
    let total = 0;
    for(let i=0; i < orderInfo.items.length; i++) {
        total += orderInfo.items[i].quantity*orderInfo.items[i].price;
    }
    orderInfo.total = total;

    return orderInfo;
}

const app = {
    removeOrderItem
};

module.exports = app;