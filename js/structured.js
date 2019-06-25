function Graph(){
	this.nodes = [];
}

Graph.prototype.getNodes = function(){
	return this.nodes;
}

Graph.prototype.addNode = function(node){
	this.nodes.push(node);
}

Graph.prototype.reset = function(node){
	this.nodes = [];
}

Graph.prototype.show = function(canvas){
	
	context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#f00";
	context.strokeStyle = "#000";
	var i;
	var j;
	
	for(i = 0; i< this.nodes.length; i++){
		context.fillStyle = "#f00";
		context.beginPath();
		context.arc(this.nodes[i].getY()*15, this.nodes[i].getX()*15, 5, 0, 2 * Math.PI);
		context.fill();
		
		for(j = 0; j< this.nodes[i].getLinks().length; j++){
			
			context.beginPath();
			context.moveTo(this.nodes[i].getY()*15, this.nodes[i].getX()*15);
			context.lineTo(this.nodes[i].getLinks()[j].getNode().getY()*15, this.nodes[i].getLinks()[j].getNode().getX()*15);
			context.stroke();
		}
		
	}
	
	
	
}

function Link (end){
	this.end = end;
}

Link.prototype.getNode = function(){
	return this.end;
}

function Node(x, y){
	this.links = [];
	this.x = x;
	this.y = y;
}

Node.prototype.getY = function(){
	return this.y;
}

Node.prototype.getX = function(){
	return this.x;
}
Node.prototype.getLinks = function(){
	return this.links;
}

Node.prototype.addLink = function(link){

	for(var i = 0; i < this.links.length; i++)
		if(this.links[i] == link)
			return;
	
	this.links.push(link);
}