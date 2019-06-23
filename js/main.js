//graph
graph = new Graph();

//arry of possible latters
arrlatter = ['A','a','E','e','I','i','O','o','U','u'];
//current index for latter
indexlatter = 3;
currentlatter.innerHTML = arrlatter[indexlatter];
//flag to controling view editor mode
vieweditor = 1;
//flag to controling view project mode
vieweproject = 0;

//max size to out arrays
maxsize = 10;
//maxsize for pixel in canvas
size = 15;

timeout = 20;
//clearArrRGB();

//draw on start 
drawPixel();
drawGrid();

//ordening nodes by x and y
function ordeningNodes(){
	//orderning nodes
	graph.getNodes().sort(function(a, b) {
		if(a.getX() > b.getX()){
			return 1
		}else if (a.getX() < b.getX()){
			return -1;
		}else{
			if(a.getY() > b.getY()){
				return 1
			}else{
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
	
	
	
	//completing matriz to patter 20x20
	if(matrix.length <= maxsize){
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
	
	return matrix;
	//
	//console.log(getItem(0));
}


function gerateGraph(arr){
	//The vertices of the graph were defined as a subset of foreground pixel  which  fulfill  either  conditions:  (a)  end  points (),  aforeground pixel which has exactly only one neighbor; or (b) branch point (), a foreground pixel which has more than two neighbors
	graph.reset();
	
	//reset color image
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
					
					//printBorder(i, j);
					
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
	
	
	
	gerateEdges();
	
}


function gerateEdges(){
	start = new Date();
	
	
	var j=0;
	//graph.getNodes()[i].length
	for(j=0; j < graph.getNodes().length; j++){
		//console.log("proximo node");
		node = graph.getNodes()[j];
		var x = node.getX();
		var y = node.getY();
			
		while( 
			(arr_rgb[x+1][y] >= 1 ) || (arr_rgb[x-1][y] >= 1) ||
			(arr_rgb[x][y+1] >= 1) || (arr_rgb[x][y-1] >= 1) || 
			(arr_rgb[x+1][y-1] >= 1) || (arr_rgb[x-1][y+1] >= 1) || 
			(arr_rgb[x-1][y-1] >= 1) || (arr_rgb[x+1][y+1] >= 1) 
		){
			
			
			end = new Date();
			if( (end.getTime() - start.getTime()) > timeout ){
				console.log("timeout");
				break;
			
			}
			
		//for(i=0; i < 1; i++){
			node = graph.getNodes()[j];
			x = node.getX();
			y = node.getY();
		
			while(1){
				
				end = new Date();
				if( (end.getTime() - start.getTime()) > timeout ){
					console.log("timeout");
					break;
					
				}
				
				//console.log(x, y);
				iny = y;
				inx = x;
			
				if(arr_rgb[x][y+1] > 0){
					y++;
				}else if(arr_rgb[x+1][y] > 0){
					x++;
				}else if(arr_rgb[x+1][y+1] > 0){
					x++;
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
					//console.log("stoping");					
					break;
				}
				
				if(arr_rgb[x][y] != 2){
					
					arr_rgb[x][y] = -1;
					
				}else if ( (x != node.getX() )  || (y != node.getY()) ){
					node.addLink(new Link(getNodeByXandY(x,y)));
					//console.log("find node");
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


function save(){
	ordeningNodes();
	
	var data = "";
	var i = 0;
	for(i = 0 ; i < 9; i++){
		
		if( i < graph.getNodes().length)
			data += graph.getNodes()[i].getX() + ","; 
		else
			data += "0,";	
	}
	
	if( i < graph.getNodes().length)
		data += graph.getNodes()[i].getX(); 
	else
		data += "0";	

	data += ",";
	
	for(i = 0 ; i < 9; i++){
			if( i < graph.getNodes().length)
				data += graph.getNodes()[i].getY() + ","; 
			else
				data += "0,";	
	}
	
	if( i < graph.getNodes().length)
		data += graph.getNodes()[i].getY(); 
	else 
		data += "0";
		
	data += ",";
 
		
	matrix = gerateAdjacentMatrix();
	
	for(i = 0 ; i < matrix.length; i++){
		for(j = 0 ; j < matrix[i].length-1; j++){
			data += matrix[i][j] + ",";
		}
		
		data += matrix[i][j];
		if(i != matrix.length-1)
			data += ","
		
	}
	

	sendDataToFile("x:" + data +  ";y:" + arrlatter[indexlatter]);
	name = setNewItem("x:" + data +  ";y:" + arrlatter[indexlatter]);	
	sendDataToImg(canvas, name+"-1-"+ arrlatter[indexlatter]);
	sendDataToImg(canvas2, name+"-2-"+ arrlatter[indexlatter]);
	
}



function sendDataToFile(data) {
 
  $.post("php/filemanager.php",
  {
    data: data,
  },
  function(data, status){
    console.log(status);
  });
   
}



function sendDataToImg(canvas, namedata) {
 
	var dataURL = canvas.toDataURL();
  
	$.ajax({
		type: "POST",
		url: "php/saveimage.php",
		data: { 
			imgBase64: dataURL,
			name: namedata
		}
	}).done(function(o) {
		console.log('saved'); 
	});
  
 
}


/*for(i = 63; i < 73; i++){
	content = localStorage.getItem("Graph"+i);
	content2 = content.slice(0, -1) + "a";
	console.log(content);
	localStorage.setItem("Graph"+i, content2)
}*/