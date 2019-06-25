btnpen = document.getElementById("btn-pen");
btneraser = document.getElementById("btn-eraser");
keydelete = document.getElementById("key-delete");
keysave = document.getElementById("key-send");
keygerate = document.getElementById("key-gerate");
keyturn = document.getElementById("btn-turn");
currentlatter = document.getElementById("current-latter");
veditor = document.getElementById("vieweditor");
vproject = document.getElementById("viewproject");

/*itemsaved = document.getElementsByClassName("itemsaved");
for(var i = 0; i < itemsaved.length; i++) {
  itemsaved[i].addEventListener("click", function() {
     alert("Clicked index: " + i);
  })
}*/	


function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
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
		var allgraphs = getListItems();
		for(i = allgraphs.length-1; i > 0 ; i--){
			var latter = getItem("Graph"+i);
			if(latter == null)
				continue;
			
			latter = latter[latter.length-1];
			container += "<div class='itemsaved' ><img graph = 'Graph"+i+"' src='dataset/images/Graph"+i+"-1-"+latter+".png'><div class='label'>Graph"+i+"("+latter+")</div></div>";
			container += "<div class='itemsaved' ><img graph = 'Graph"+i+"' src='dataset/images/Graph"+i+"-2-"+latter+".png'><div class='label'>Graph"+i+"("+latter+")</div></div>";
		}
		
		vproject.innerHTML = container;	

		/*itemsaved = document.getElementsByClassName("itemsaved");
		for(var i = 0; i < itemsaved.length; i++) {
			itemsaved[i].addEventListener("click", function(evt) {
					openGraph( evt.target.attributes[0].nodeValue) ;
			})
		}*/



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
	save();
	resertColorImage();
	drawPixel();
	drawGrid();
});
