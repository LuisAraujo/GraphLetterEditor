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
currentlatter = document.getElementById("current-latter");
arrlatter = ['A','E','I','O','U'];
indexlatter = 0;


size = 15;
arr_rgb = [];
clearArrRGB();
mousepress = false;
print = true;
eraser = false;
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
	console.log(arrlatter.length-1);
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

keysave.addEventListener('click', function(evt) {
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


function pintOreasePixel(evt){
	
	var mousePos = getMousePos(canvas, evt);
	var posx = parseInt(mousePos.x/size);
	var posy = parseInt(mousePos.y/size);
	
	if((posx >= 20 ) || (posy >= 20) )
		return;
	
	//console.log(posx, posy);
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


function gerateGraph(arr){
	//The vertices of the graph were defined as a subset of foreground pixel  which  fulfill  either  conditions:  (a)  end  points (),  aforeground pixel which has exactly only one neighbor; or (b) branch point (), a foreground pixel which has more than two neighbors
	graph.reset();
	
	for(i=1; i< arr_rgb.length-1; i++){
		for(j=1; j< arr_rgb[i].length-1; j++){	
				if( (arr_rgb[i][j] > 1) || (arr_rgb[i][j] < 0) )
					arr_rgb[i][j]  = 1;
			 
			   if ( ( (arr_rgb[i][j] == 1) && (arr_rgb[i+1][j] == 1) && (arr_rgb[i-1][j] == 1) ) 
				   && ( (arr_rgb[i][j+1] == 1) || (arr_rgb[i][j-1] == 1) ) ){	
					arr_rgb[i][j] = 2;	
					n = new Node(i, j);
					graph.addNode(n);
				   }
					
				if ( ( (arr_rgb[i][j] == 1) && (arr_rgb[i][j+1] == 1) && (arr_rgb[i][j-1] == 1) ) 
				   && ( (arr_rgb[i+1][j] == 1) || (arr_rgb[i-1][j] == 1) ) ){
					arr_rgb[i][j] = 2;		
					n = new Node(i, j);
					graph.addNode(n);
				   }
			   
		  }
		}
	
	 
	
	
	for(i=0; i< arr_rgb.length; i++){
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
				
				if((countheighbor == 1) || (countheighbor > 2)){
					
					n = new Node(i,j);
					graph.addNode(n);
					arr_rgb[i][j] = 2;
				}
			
			}
		}
	}
	
	//gerateEdges();
	
}



function gerateEdges(){
	var j;
	
	for(j=0; j <  graph.getNodes().length; j++){
		node = graph.getNodes()[j];
		var x = node.getX();
		var y = node.getY();
		a = 2000;
		
		while(a--){
			
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
			
			if(arr_rgb[x][y] != 2){
				arr_rgb[x][y] = -1;
			}else if ( (x != node.getX() )  || (y != node.getY()) ){
				nodes = graph.getNodes();
				var i;
				for(i=0; i< nodes.length; i++){
					if((nodes[i].getX() == x) && (nodes[i].getY() == y)){
						node.addLink(new Link(nodes[i]));
						break;
					}
				}
				
				break;
			
			}
			
		}	
	}
}