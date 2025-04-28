function createOrderManager()
{
    let orders=[];

    return{
        addOrder(order)
        {
            orders.push(order);
        },

        updateOrder(id,newStatus)
        {
            const order=orders.find(o=>o.id === id);
            if(order)
            {
                order.status=newStatus;
            }
        },

        filterOrders(status)
        {
            return orders.filter(order=> order.status===status);
        },

        sortOrders(by)
        {
            const sortedOrder=[...orders];
            if(by === "Date")
            {
                sortedOrder.sort((a,b)=> new Date(a.createdAt)- new Date(b.createdAt));
            }
            else if(by === "status")
            {
                sortedOrder.sort((a,b)=> a.status.localCompare(b.status));
            }
            return sortedOrder;

        },

        getTotalRevenue()
        {
            return orders.reduce((total,order)=>{
                const orderTotal=order.items.reduce((sum,item)=> sum+ (item.price * item.quantity),0);
                return total+orderTotal;
            },0);
        },

        exportOrders()
        {
            return JSON.stringify(orders);
        }
    };
}

//usage

const manager = createOrderManager();
manager.addOrder({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrder({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
console.log(manager.filterOrders("pending"));

console.log(manager.getTotalRevenue());

