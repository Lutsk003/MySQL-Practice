const mysql = require('mysql');
const inquirer = require('inquirer')
const Table = require("cli-table");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

var buyFromDatabase = function() {

    connection.query('SELECT * FROM warehouse', function(err, res) {
        // Create table to display warehouse items
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
            style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }
        });

        console.log("DISPLAYING ALL WAREHOUSE ITEMS: ");
        console.log("--------------------------------");

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        
        
        console.log("--------------------------------");

        //Logs the cli-table with warehouse items
        console.log(table.toString());

        inquirer.prompt([{
            name: "itemId",
            type: "input",
            message: "Please enter the ID of the item you would like to buy: ",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } if (value > 10) {
                    return false;
                } else {
                    return false;
                } 
            }
        }, {
            name: "Quantity",
            type:"input",
            message: "Please enter the quantity of this item that you would like to buy: ",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        
        }]).then(function(answer) {
            var idChoice = answer.itemId - 1;
            var productChoice = res[idChoice];
            var productQuantity = answer.Quantity;
            var newQuantity = res[idChoice].stock_quantity - productQuantity;
            if (productQuantity < res[idChoice].stock_quantity) {
                console.log(`The total price for ${answer.Quantity} - ${productChoice.product_name} is: $${(productChoice.price * productQuantity).toFixed(2)}`)

                // connection.query("UPDATE warehouse SET ? WHERE ?", [{
                //     newQuantity: productChoice.stock_quantity - productQuantity
                // }, {
                //     id: productChoice.item_id
                // }], function(err, res) {
                //     buyFromDatabase();
                // });

                connection.query("UPDATE warehouse SET stock_quantity = " + newQuantity +" WHERE item_id = " + productChoice.itemId, function (err, res) {
                    console.log('');
                    console.log('The order had been processed.');
                    console.log('');
                    buyFromDatabase();
                    connection.end();
                })

                // Warehouse quantity not updating correctly

            } else {
                console.log(`Unfortunately, there is insufficient quantity of this item at this time. The inventory currently holds ${res[idChoice].stock_quantity} in the inventory`);
            }
        })
    })
}

buyFromDatabase();


// var sql = "SELECT * from warehouse";




// connection.query, sql((err, results) => {
//     if (err) throw err;
//     for (row in results) {
//         table.push [row.item_id, row.product_name, row.department_name, row.price, row.stock_quantity];
//     };
//     msg.send table.toString();
// });



