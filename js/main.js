graph = new Graph();
canvas2 = document.getElementById("canvas2");
contexto2 = canvas2.getContext("2d");
canvas = document.getElementById("canvas");
contexto = canvas.getContext("2d");
contexto.fillStyle = "rgba(0,0,0)"; 
btnpen = document.getElementById("btn-pen");
btneraser = document.getElementById("btn-eraser");
keydelete = document.getElementById("key-delete");
keysave = document.getElementById("key-send");
keygerate = document.getElementById("key-gerate");
keyturn = document.getElementById("btn-turn");
currentlatter = document.getElementById("current-latter");
veditor = document.getElementById("vieweditor");
vproject = document.getElementById("viewproject");

arrlatter = ['A','E','I','O','U'];
indexlatter = 0;
vieweditor = 1;
vieweproject = 0;

size = 15;
arr_rgb = [];

arr_rgb =  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


arr_rgb =  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

//clearArrRGB();

mousepress = false;
print = true;
eraser = false;


drawPixel();
drawGrid();

function clearArrRGB (){	
	arr_rgb = [];
	for(var i=0; i<canvas.height/size; i++){
	   arr_rgb.push([ ]);
	   for(var j=0; j<canvas.width/size; j++)
		arr_rgb[i].push(0);
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


function drawPixel(){
	contexto.clearRect(0, 0, canvas.width, canvas.height);
	contexto.fillStyle = "#000";
	for(i=0; i< arr_rgb.length; i++){
		for(j=0; j< arr_rgb[i].length; j++){	 
			//if(arr_rgb[i][j] > 0){
				if(arr_rgb[i][j] == 0)
					contexto.fillStyle = "#fff";
				if(arr_rgb[i][j] == 1)
					contexto.fillStyle = "#000";
				if(arr_rgb[i][j] == 2)
					contexto.fillStyle = "#f00";
				if(arr_rgb[i][j] == -1){
					contexto.fillStyle = "#0f0";
				}
				contexto.fillRect( j*size, i*size,size, size);
			//}
		}
	}
	
	
};


function drawGrid(){
	
	for(i=0; i < arr_rgb.length; i++){	 
		contexto.beginPath();
		contexto.strokeStyle = "#aaa";
		contexto.moveTo(i*size, 0);
		contexto.lineTo(i*size, arr_rgb.length*size);
		contexto.stroke();
		
		contexto.moveTo(0, i*size);
		contexto.lineTo(arr_rgb.length*size, i*size);
		contexto.stroke();
		
	}
	
}

canvas.addEventListener('mousemove', function(evt) {
	pintOreasePixel(evt);
}, false);


canvas.addEventListener('mousedown', function(evt) {
	mousepress= true;
	pintOreasePixel(evt);
});

canvas.addEventListener('mouseup', function(evt) {
	mousepress= false;
});


btnpen.addEventListener('click', function(evt) {
	print = true;
	eraser = false;
	btneraser.classList.remove("bt-active");
	btnpen.classList.add("bt-active");
});


btneraser.addEventListener('click', function(evt) {
	print = false;
	eraser = true;
	btnpen.classList.remove("bt-active");
	btneraser.classList.add("bt-active");
});


currentlatter.addEventListener('click', function(evt) {
	indexlatter++;
	indexlatter = indexlatter % (arrlatter.length) ;
	currentlatter.innerHTML = arrlatter[indexlatter];
});


keyturn.addEventListener('click', function(evt) {
	if(vieweditor == 1){
		vieweditor = 0;
		veditor.style = "display: none"; 
		vproject.style = "display: block";
		
		container = "";
		for(i = 0; i < 20; i++)
			container += "<div class='itemsaved'><img src='graphs/graph01.png'><div class='label'>E</div></div>";
	
		vproject.innerHTML = container;	
		
	}else{
		vieweditor = 1;
		vproject.style = "display: none"; 
		veditor.style = "display: block"; 
		
		
	}
});
	
keydelete.addEventListener('click', function(evt) {
	print = false;
	eraser = false;
	btnpen.classList.remove("bt-active");
	btneraser.classList.remove("bt-active");
	
	clearArrRGB();
	drawPixel();
	drawGrid();
});

keygerate.addEventListener('click', function(evt) {
	print = false;
	eraser = false;
	btnpen.classList.remove("bt-active");
	btneraser.classList.remove("bt-active");
	gerateGraph(arr_rgb);
	drawPixel();
	drawGrid();
	
	graph.show(canvas2);
	//console.log(pixelToString(arr_rgb));
});

keysave.addEventListener('click', function(evt) {
	ordeningNodes();
	gerateAdjacentMatrix();
	resertColorImage();
	drawPixel();
	drawGrid();
});



function ordeningNodes(){
	//orderning nodes
	graph.getNodes().sort(function(a, b) {
				if(a.getX() > b.getX()){
					return 1
				}else if (a.getX() < b.getX()){
					return -1;
				}else{
					if(a.getX() > b.getX()){
						return 1
					}else if (a.getX() < b.getX()){
					return -1;	
					}
				}
	});
}

function gerateAdjacentMatrix(){
	
	//gerate adjacente matrix
	var matrix = [];
	var i, j;	
	for(i = 0 ; i < graph.getNodes().length; i++){
		aux = []
		for(j = 0 ; j < graph.getNodes().length; j++){
			aux.push(0);
		}
		
		matrix[i] = aux;
	}
	
	var nodes = graph.getNodes();
	//para todo nó
	for(i = 0 ; i < graph.getNodes().length; i++){
		//para todos os links
		var links = graph.getNodes()[i].getLinks();
		
		for(j=0; j < links.length; j++){
			//para todos os nós
			for(l = 0 ; l < nodes.length; l++){
				
				
				if( (links[j].getNode() === nodes[l]) 
					//|| 
				   // (graph.getNodes()[l] == graph.getNodes()[i] ) 
				   ){
					matrix[i][l] = 1;
					matrix[l][i] = 1;
					console.log("achou");
					continue;
				}
					
					//matrix[j][l] = 1;
			}
		}
	}
	
	
	maxsize = 20;
	//completing matriz to patter 20x20
	if(matrix.length < maxsize){
		currentsize = matrix.length;
		
		for(i = 0; i < currentsize; i++){
			for(j = currentsize; j < maxsize; j++){
				matrix[i].push(0);
			}
		}
		
		for(i = currentsize; i < maxsize; i++){
			matrix[i] = [];
			for(j = 0;  j < maxsize; j++){
				matrix[i].push(0);
			}
		}
	}
	
	setNewItem(['A', graph, matrix]);
	//console.log(getItem(0));
}


function pintOreasePixel(evt){
	
	var mousePos = getMousePos(canvas, evt);
	var posx = parseInt(mousePos.x/size);
	var posy = parseInt(mousePos.y/size);
	
	if((posx >= 20 ) || (posy >= 20) )
		return;
	
	if((mousepress) && (print) )
		arr_rgb[posy][posx] = 1;
	
	if ((mousepress) &&  (eraser) )
		arr_rgb[posy][posx] = 0;
	
	
	drawPixel();
	drawGrid();
	contexto.strokeStyle = "#ff0";
	contexto.strokeRect(posx*size, posy*size,size, size);
}

function pixelToString(arr){
	
	arrstr = "";
	for(i=0; i< arr.length; i++){
		arrstr += "\n"+arr[i].toString();
	}
	
	return arrstr;
}

function resertColorImage(){
	var i =0;
	var j = 0;
	for(i=1; i< arr_rgb.length-1; i++){
		for(j=1; j< arr_rgb[i].length-1; j++){	
				if( (arr_rgb[i][j]  != 0) )
					arr_rgb[i][j]  = 1;
		}
	}
	
	
}

function gerateGraph(arr){
	//The vertices of the graph were defined as a subset of foreground pixel  which  fulfill  either  conditions:  (a)  end  points (),  aforeground pixel which has exactly only one neighbor; or (b) branch point (), a foreground pixel which has more than two neighbors
	graph.reset();
	
	resertColorImage();
	
	for(i=1; i< arr_rgb.length-1; i++){
		for(j=1; j< arr_rgb[i].length-1; j++){	
				
				
				//breanch
				/*|0,0,0|    |0,0,0|
				  |0,1,1| ou |1,1,0|*/
			   if ( ( (arr_rgb[i][j] == 1) && (arr_rgb[i+1][j] == 1) && (arr_rgb[i-1][j] == 1) ) 
				   && ( (arr_rgb[i][j+1] == 1) || (arr_rgb[i][j-1] == 1) ) ){	
					arr_rgb[i][j] = 2;	
					n = new Node(i, j);
					graph.addNode(n);
				   }
				
				//breanch
				if ( ( (arr_rgb[i][j] == 1) && (arr_rgb[i][j+1] == 1) && (arr_rgb[i][j-1] == 1) ) 
				   && ( (arr_rgb[i+1][j] == 1) || (arr_rgb[i-1][j] == 1) ) ){
					arr_rgb[i][j] = 2;		
					n = new Node(i, j);
					graph.addNode(n);
				 }
				   
				   
				//quebra diagonal
				if ( (arr_rgb[i][j] == 1) && (arr_rgb[i-1][j] == 0) && (arr_rgb[i-1][j+1] == 0) 
					 && (arr_rgb[i-1][j-1] == 0) &&  (arr_rgb[i][j+1] == 0)  && (arr_rgb[i][j-1] == 0) ) 
				   {	
					arr_rgb[i][j] = 2;	
					n = new Node(i, j);
					graph.addNode(n);
				   }
				   
				//quebra diagonal   
				if ( (arr_rgb[i][j] == 1) && (arr_rgb[i+1][j] == 0) && (arr_rgb[i+1][j+1] == 0) 
					 && (arr_rgb[i+1][j-1] == 0) &&  (arr_rgb[i][j+1] == 0)  && (arr_rgb[i][j-1] == 0) ) 
				   {	
					arr_rgb[i][j] = 2;	
					n = new Node(i, j);
					graph.addNode(n);
				   }
				   
				
				   
			   //esquina
			   /* |0,0,0|    |0,0,0|
				  |0,1,1| ou |1,1,0|*/
			   if ((arr_rgb[i][j] == 1) && (arr_rgb[i-1][j] == 0)  &&  (arr_rgb[i-1][j-1] == 0)
				   &&  (arr_rgb[i-1][j+1] == 0) && 
			   (((arr_rgb[i][j+1] == 1)  && (arr_rgb[i][j-1] == 0))
			   || 
			   ((arr_rgb[i][j+1] == 0)  && (arr_rgb[i][j-1] == 1)))
			   )
			   {	
					arr_rgb[i][j] = 2;	
					n = new Node(i, j);
					graph.addNode(n);
			   }
			
			     //esquina
			   /* |0,1,1|    |1,1,0|
				  |0,0,0| ou |0,0,0|*/
			   if ((arr_rgb[i][j] == 1) && (arr_rgb[i+1][j] == 0)  &&  (arr_rgb[i+1][j-1] == 0)
				   &&  (arr_rgb[i+1][j+1] == 0) && 
			   (((arr_rgb[i][j+1] == 1)  && (arr_rgb[i][j-1] == 0))
			   || 
			   ((arr_rgb[i][j+1] == 0)  && (arr_rgb[i][j-1] == 1)))
			   )
			   {	
					arr_rgb[i][j] = 2;	
					n = new Node(i, j);
					graph.addNode(n);
			   }
			   
			   
				   
				
			   
		  }
		}
	
	//return;
	
	
	/*for(i=0; i< arr_rgb.length; i++){
		for(j=0; j< arr_rgb[i].length; j++){	 
			if(arr_rgb[i][j] == 1){
				countheighbor = 0;
				
				if(i < arr_rgb.length-1){
					
					countheighbor += parseInt(arr_rgb[i+1][j]);
					
					if(parseInt(arr_rgb[i+1][j]) == 2) 
						continue;
					
					
					if(j>0){
						countheighbor += parseInt(arr_rgb[i+1][j-1]);
						
						if(parseInt(arr_rgb[i+1][j-1]) == 2)
							continue;
						
					}
					
					if(j < arr_rgb.length){
						countheighbor += parseInt(arr_rgb[i+1][j+1]);
						
						if(parseInt(arr_rgb[i+1][j+1]) == 2 )
							continue;
					}
				}
				
				if(j>0){
					countheighbor += parseInt(arr_rgb[i][j-1]);
					
					if(parseInt(arr_rgb[i][j-1])==2)
						continue;
				}
				
				if(j < arr_rgb.length-1){
					countheighbor += parseInt(arr_rgb[i][j+1]);
					if(parseInt(arr_rgb[i][j+1])==2)
						continue;
				}
				
				if(i > 0){
					countheighbor += parseInt(arr_rgb[i-1][j]);
					if(parseInt(arr_rgb[i-1][j]) == 2)
						continue;
					
					if(j>0){
						countheighbor += parseInt(arr_rgb[i-1][j-1]);
						if(parseInt(arr_rgb[i-1][j-1]) == 2)
							continue;
						
					}
					
					if(j < arr_rgb.length-1){
						countheighbor += parseInt(arr_rgb[i-1][j+1]);
						 
						if(parseInt(arr_rgb[i-1][j+1]) == 2)
							continue;
						
					}
				}
				
				if((x == 4) && (y == 13)){
					console.log(countheighbor);
				}
				if((countheighbor == 1) || (countheighbor > 2)){
					
					n = new Node(i,j);
					graph.addNode(n);
					arr_rgb[i][j] = 2;
				}
			
			}
		}
	}
	*/
	
	gerateEdges();
	
}


function gerateEdges(){
	var j=0;
	//graph.getNodes()[i].length
	for(j=0; j < graph.getNodes().length; j++){
		console.log("proximo node");
		node = graph.getNodes()[j];
		var x = node.getX();
		var y = node.getY();
			
		while( 
			(arr_rgb[x+1][y] >= 1 ) || (arr_rgb[x-1][y] >= 1) ||
			(arr_rgb[x][y+1] >= 1) || (arr_rgb[x][y-1] >= 1) || 
			(arr_rgb[x+1][y-1] >= 1) || (arr_rgb[x-1][y+1] >= 1) || 
			(arr_rgb[x-1][y-1] >= 1) || (arr_rgb[x+1][y+1] >= 1) 
		){
			
		//for(i=0; i < 1; i++){
			node = graph.getNodes()[j];
			x = node.getX();
			y = node.getY();
		
			while(1){
				console.log(x, y);
				iny = y;
				inx = x;
				
				//registar a direção se subindo ou descendo, esquerda e direita
				//para não ocorrer de criar um link com o vértice anterior, que ele saiu
				//verificar se os próximos a frente são 2
				//se for, crio link
				
				
				if(arr_rgb[x+1][y] > 0){
					x++;
				}else if(arr_rgb[x+1][y+1] > 0){
					x++;
					y++;
				}else if(arr_rgb[x][y+1] > 0){
					y++;	
				}else if(arr_rgb[x-1][y] > 0){
					x--;	
				}else if(arr_rgb[x][y-1] > 0){
					y--;
				}else if(arr_rgb[x-1][y-1] > 0){
					x--;
					y--;	
				}else if(arr_rgb[x+1][y-1] > 0){
					x++;
					y--;	
				}else if(arr_rgb[x-1][y+1] > 0){
					x--;
					y++;						
				}
				
				
				if((iny == y) && (inx == x)){
					console.log("stoping");					
					break;
				}
				
				if(arr_rgb[x][y] != 2){
					
					arr_rgb[x][y] = -1;
					
				}else if ( (x != node.getX() )  || (y != node.getY()) ){
					node.addLink(new Link(getNodeByXandY(x,y)));
					console.log("find node");
					node = graph.getNodes()[j];
					x = node.getX();
					y = node.getY();
					break;
				}
				
				
				
				
				
			}	
		}
	}
}


function getNodeByXandY(x, y){
	nodes = graph.getNodes();
	for(i=0; i< nodes.length; i++){
		if((nodes[i].getX() == x) && (nodes[i].getY() == y)){
			 return nodes[i];
		}
	}
	
	return null;
}