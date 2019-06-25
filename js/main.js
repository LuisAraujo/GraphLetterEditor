//graph
graph = new Graph();

//arry of possible latters
arrlatter = ['A','a','E','e','I','i','O','o','U','u'];
//current index for latter
indexlatter = 9;
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

//clearArrRGB();	

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
					//console.log("achou");
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
			   
			   
			      //triangulo
			   /* |0,1,0|    |1,0,1|
				  |1,0,1| ou |0,1,0|*/
			   if ( ((arr_rgb[i][j] == 1) && (arr_rgb[i+1][j-1] == 1)  &&  (arr_rgb[i+1][j+1] == 1))
					|| 
			        ((arr_rgb[i][j] == 1) && (arr_rgb[i-1][j-1] == 1)  &&  (arr_rgb[i-1][j+1] == 1))
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
    //console.log(status);
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
		//console.log('saved'); 
	});
  
 
}

function saveAllDatasetByStorage() {
	list = getListItems();
    var data = "";
	for(var j = 0; j < list.length; j++){
		data  += getItem("Graph"+j) +"\n";
	}
		
	 $.post("php/filemanager_dataset.php",
	  {
		data: data,
		latter: "",
		min: "",
		training: "alldata"
	  });
}


function sendDatasetToFile() {
 
  list = getListItems();
  Amasc = "";
  Amasc_t = "";
  
  Amin = "";
  Amin_t = "";
  
  Emasc = "";
  Emasc_t = "";
  
  Emin = "";
  Emin_t = "";
  
  Imasc = "";
  Imasc_t = "";
  
  Imin = "";
  Imin_t = "";
  
  Omasc = "";
  Omasc_t = "";
  
  Omin = "";
  Omin_t = "";
  
  Umasc = "";
  Umasc_t = "";
  
  Umin = "";
  Umin_t = "";
  
  for(var j = 0; j < list.length; j++){
	if(j <= 40){
		var c = j;
		
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )	
			Amasc_t += getItem("Graph"+j) +"\n";
		else {
			Amasc += getItem("Graph"+j) +"\n";
		}
	
	}else if(j <= 80){
		var c = j%40;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Amin_t += getItem("Graph"+j) +"\n";
		else
			Amin += getItem("Graph"+j)+"\n";
			
	
	}else if(j <= 120){
		var c = j%80;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Emasc_t += getItem("Graph"+j) +"\n";
		else 
			Emasc += getItem("Graph"+j) +"\n";
	
	}else if(j <= 160){
		var c = j%120;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Emin_t += getItem("Graph"+j) +"\n";
		else 
			Emin += getItem("Graph"+j) +"\n";
	
	}else if(j <= 200){
		var c = j%160;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Imasc_t += getItem("Graph"+j) +"\n";
		else 
			Imasc += getItem("Graph"+j) +"\n";
	
	}else if(j <= 240){
		var c = j%200;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Imin_t += getItem("Graph"+j) +"\n";
		else 
			Imin += getItem("Graph"+j) +"\n";
	
	}else if(j <= 280){
		var c = j%240;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Omasc_t += getItem("Graph"+j) +"\n";
		else 
			Omasc += getItem("Graph"+j) +"\n";
	
	}else if(j <= 320){
		var c = j%280;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Omin_t += getItem("Graph"+j) +"\n";
		else 
			Omin += getItem("Graph"+j) +"\n";
	
	}else if(j <= 360){
		var c = j%320;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Umasc_t += getItem("Graph"+j) +"\n";
		else 
			Umasc += getItem("Graph"+j) +"\n";
	
	}else if(j <= 400){
		var c = j%360;
		if( (c == 0) || (c == 1) || (c ==2) || (c == 5) || (c == 6) || (c == 8) || (c == 20) || (c == 25) || (c == 30)  || (c == 35) )
			Umin_t += getItem("Graph"+j) +"\n";
		else 
			Umin += getItem("Graph"+j) +"\n";
	}
  }
	  
	  /*console.log(Amasc);
	  console.log(Amin);
	  console.log(Emasc);
	  console.log(Emin);
	  console.log(Imasc);
	  console.log(Imin);
	  console.log(Omasc);
	  console.log(Omin);*/
	  
	  
	  //A -----
	  $.post("php/filemanager_dataset.php",
	  {
		data: Amasc,
		latter: "A",
		min: "masc",
		training: "training"
	  });
	  
	    $.post("php/filemanager_dataset.php",
	  {
		data: Amasc_t,
		latter: "A",
		min: "masc",
		training: "test"
	  });
	  
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Amin,
		latter: "A",
		min: "min",
		training: "training"
	  });
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Amin_t,
		latter: "A",
		min: "min",
		training: "test"
	  });
	  
	  //E -----
	  $.post("php/filemanager_dataset.php",
	  {
		data: Emasc,
		latter: "E",
		min: "masc",
		training: "training"
	  });
	  
	    $.post("php/filemanager_dataset.php",
	  {
		data: Emasc_t,
		latter: "E",
		min: "masc",
		training: "test"
	  });
	  
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Emin,
		latter: "E",
		min: "min",
		training: "training"
	  });
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Emin_t,
		latter: "E",
		min: "min",
		training: "test"
	  });
	  
	  
	  //I -----
	  
	   $.post("php/filemanager_dataset.php",
	  {
		data: Imasc,
		latter: "I",
		min: "masc",
		training: "training"
	  });
	  
	    $.post("php/filemanager_dataset.php",
	  {
		data: Imasc_t,
		latter: "I",
		min: "masc",
		training: "test"
	  });
	  
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Imin,
		latter: "I",
		min: "min",
		training: "training"
	  });
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Imin_t,
		latter: "I",
		min: "min",
		training: "test"
	  });
	  
	  //O -----
	  
	     $.post("php/filemanager_dataset.php",
	  {
		data: Omasc,
		latter: "O",
		min: "masc",
		training: "training"
	  });
	  
	    $.post("php/filemanager_dataset.php",
	  {
		data: Omasc_t,
		latter: "O",
		min: "masc",
		training: "test"
	  });
	  
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Omin,
		latter: "O",
		min: "min",
		training: "training"
	  });
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Omin_t,
		latter: "O",
		min: "min",
		training: "test"
	  });
	  
	  
	  //U -----
   
	   $.post("php/filemanager_dataset.php",
	  {
		data: Umasc,
		latter: "U",
		min: "masc",
		training: "training"
	  });
	  
	    $.post("php/filemanager_dataset.php",
	  {
		data: Umasc_t,
		latter: "U",
		min: "masc",
		training: "test"
	  });
	  
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Umin,
		latter: "U",
		min: "min",
		training: "training"
	  });
	  
	  $.post("php/filemanager_dataset.php",
	  {
		data: Umin_t,
		latter: "U",
		min: "min",
		training: "test"
	  });
   
}



/*
function openGraph(graphid){
	
	var tobd = getItem(graphid);
	tobd = tobd.split(";");
	tobd = tobd[0].split(":");
	tobd = tobd[1].split(",");
	var c = 20;
	console.log(tobd.length);
	for(var i = 0; i < 20; i++){
		for(var j = 0; j < 20; j++){
			arr_rgb[i][j] = tobd[c++];
		}
	}
}*/

/*for(i = 321; i < 327; i++){
	content = localStorage.getItem("Graph"+i);
	content2 = content.slice(0, -1) + "U";
	console.log(content);
	localStorage.setItem("Graph"+i, content2)
}*/