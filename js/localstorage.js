var meuStorage = localStorage;

//clearAllItems();
//setNewProject("Teste_C#.2|10|100,D.2|100|200");
//p = getListProject();
//console.log(p)


function clearAllItems(){
	localStorage.clear();	
}

function setNewItem(content){
	var cid = 0;
	
	while(getItem("Graph"+cid) != null){
		 cid++;
	}
	 
	var name = "Graph"+cid;
	localStorage.setItem(name, content);	
	
	return name;
}
function updateItem(name, content){
	localStorage.setItem(name, content);	
}
function saveItem(name, content){
	localStorage.setItem(name, content);	
}

function getListItems(){
	var a = [];
	for(i = 0; i < localStorage.length; i++){
		a.push( localStorage.key(i)  );
	}
	return a;
}

function getItem(item){
	return localStorage.getItem(item);
}

function getItemByKey(key){
	return localStorage.key(key);
}

function getNameItem(id){
	return getProject(id).split("_")[0]
}

function deleteItem(item){
	console.log(item);
	localStorage.removeItem(item);
}