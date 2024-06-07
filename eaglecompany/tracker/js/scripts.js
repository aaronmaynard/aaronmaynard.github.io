var key = '';
function trackOrder(key){
	$.getJSON('https://sheets.googleapis.com/v4/spreadsheets/19r2IlfxRFaU8IMmPpdMY9J1dix-boo54gu-9vLU3uxU/values/A2:F10?key=AIzaSyDbnxJAsB_2M6iWyTi9xKir5EOSw86As3A', function(json) {
		// JSON result in `data` variable
		var js = json;
		if(key==''){
			console.log("No Key!");
		}else{
			console.log("Order ID: " + key);
			console.log(js.values);
			for(var i=0;i<js.values.length;i++){
				if(js.values[i][1]==key){
				 displayOrder(js.values[i]);
				 return;
				}
			}
		}
	});
}
function displayOrder(order){
var key = order[1];
var location = order[2];
var status = order[3];
var state = order[4];
var courier = order[5];
console.log(order);
document.getElementById("deliveryStatus").innerHTML = "<strong>"+status+"</strong>";
document.getElementById("deliveryLocation").innerHTML = "<strong>"+location+"</strong>";
document.getElementById("orderKey").innerHTML = "Order Key: <strong>"+key+"</strong>";
document.getElementById("courier").innerHTML = "Courier: <strong>"+courier+"</strong>";
document.getElementById("deliveryImage").innerHTML = "<img alt='Eagle Company Tracker' src='images/OT"+state+".png'>";
}
