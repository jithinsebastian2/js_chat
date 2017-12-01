var mysql = require('mysql');
var app = require('express')();
var http = require('http').Server(app); 
var socket = require('socket.io')(http);

/**DB Connection and Operations**/

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'jithin_new_db',
});
connection.connect(function(error){
	if(error) console.log("error in db connection");
		else console.log("connected successfully");
	
	/* var sql = "CREATE TABLE Customers (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),address VARCHAR(255))";
	connection.query(sql,function(error,result){
		if(error){
			throw error;
		}
		console.log("result is :",result);
	}); */
	
	/*For single data input to a Table customers*/
	/* var sql = "INSERT INTO customers (id,name, address) VALUES (18,'JPS Creations', 'Highway 37')";
	connection.query(sql,function(error,result){
		if(error){
			throw error;
		}
		console.log("result is :",result);
	}); */
	
	/***For multiple Data input at a same time***/
	/* var sql = "INSERT INTO customers(id,name,address) VALUES?";
	var values = [
		[1,'John', 'Highway 71'],
		[2,'Peter', 'Lowstreet 4'],
		[3,'Amy', 'Apple st 652'],
		[4,'Hannah', 'Mountain 21'],
		[5,'Michael', 'Valley 345'],
		[6,'Sandy', 'Ocean blvd 2'],
		[7,'Betty', 'Green Grass 1'],
		[8,'Richard', 'Sky st 331'],
		[9,'Susan', 'One way 98'],
		[10,'Vicky', 'Yellow Garden 2'],
		[12,'Ben', 'Park Lane 38'],
		[13,'William', 'Central st 954'],
		[11,'Chuck', 'Main Road 989'],
		[14,'Viola', 'Sideway 1633']
	]; 
	connection.query(sql,[values],function(error,result){
		if(error)
			throw error;
		else console.log("result is :",result);
	});
	*/
	/* var sql = 'SELECT name FROM customers';
	connection.query(sql,function(error,result){
		if(error)
			throw error;
		else console.log("result is :",result);
	}); */
	//var sql = "SELECT * FROM Customers ORDER BY name";
	/* var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
	connection.query(sql,function(error,result){
		if(error)throw error;
		else
		 console.log(result);
	}); */
});

/**Socket Connection and Operations**/

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000,function(){
	console.log("Listerning on :3000");
});

socket.on('connection',function(io){
	console.log("A user connected");
	io.on('disconnect',function(){
		console.log("user disconnected");
	});
	io.on('chat_msg',function(msg){
	    var userName = 'SELECT username FROM chatdata';
		connection.query(userName,function(error,result){
			if(error)
				throw error;
			else {
				console.log("result type :",typeof(result));
				result.forEach( function (arrayItem){
					var x = arrayItem.username;
					console.log(x);
					if(x == msg[0]){
						console.log("do something");
					}	
				});
				
			}
		}); 
		var sql = "INSERT INTO chatdata (username,message) VALUES ('"+msg[0]+"'"+","+"'"+msg[1]+"')";
		connection.query(sql,function(error,result){
			if(error){
				throw error;
			}
			console.log("result is :",result);
		}); 
		socket.emit('chat_message',msg[1]);
	});
});
