function loadXMLDoc(dname)
{
  if (window.XMLHttpRequest)
    {
    xhttp=new XMLHttpRequest();
    }
  else
    {
    xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xhttp.open("GET",dname,false);
  xhttp.send("");
  return xhttp.responseXML;
}

function allblue()
{
    $("div").css('color', 'blue');
}

function displayResult()
{
  selection = document.getElementById("recipes");
  node = document.getElementById("catalog");
  xml=loadXMLDoc("recipes.xml");
  xsl=loadXMLDoc("slide.xsl");
  // code for IE
  if (window.ActiveXObject)
    {
    ex=xml.transformNode(xsl);
    node.innerHTML=ex;
    }
  // code for Mozilla, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument)
    {
    xsltProcessor=new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml,document);
    node.appendChild(resultDocument);
  }
  
  scrollarea = document.getElementById("scroll-area");
  scrolldata = document.getElementById("scroll-data");
  scrollareawidth = $(scrollarea).width();
  scrolldatawidth = $(scrolldata).width();
  
  if (window.Touch){
    scrollarea.addEventListener('touchstart', scrollAreaMouseDown);
  } else {
    scrollarea.addEventListener('mousedown', scrollAreaMouseDown);
  }
  
  update(scrollarea.getAttribute("default"));
}

function update(recipe)
{
  if (recipe == ""){
    selection = document.getElementById("recipes").value;
  } else {
    document.getElementById("recipes").value = recipe;
    selection = recipe;
  }
  $("span.selected").removeClass("selected");
  $("#"+selection).addClass("selected"); 
  
  node = document.getElementById("recipe");
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
  xml=loadXMLDoc("recipes.xml");
  xsl=loadXMLDoc("recipe.xsl");
  // code for IE
  if (window.ActiveXObject)
    {
    ex=xml.transformNode(xsl);
    node.innerHTML=ex;
    }
  // code for Mozilla, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument)
    {
    xsltProcessor=new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    xsltProcessor.setParameter(null, "message", selection);
    resultDocument = xsltProcessor.transformToFragment(xml,document);
    node.appendChild(resultDocument);
    }
  updateRecipe();
}

function updateRecipe()
{
  weight = document.getElementById("weight");
  wpu = document.getElementById("wpu");
  qty = document.getElementById("qty");
  if (weight.value == "") {updatenumber(weight, wpu.value * qty.value);};
  if (qty.value == "") {updatenumber(qty, weight.value / wpu.value);};
  updateIngredients();
}

function updatenumber(field, number)
{
  if (field.getAttribute("digit") != null){
    nd = field.getAttribute("digit");
    field.value = Math.round(number * Math.pow(10,nd)) / Math.pow(10,nd); 
  } else{
    field.value = number;
  }
}

function weightUpdate()
{
  weight = document.getElementById("weight");
  wpu = document.getElementById("wpu");
  qty = document.getElementById("qty");
  updatenumber(qty, weight.value / wpu.value);
  updateIngredients();
}

function qtyUpdate()
{
  weight = document.getElementById("weight");
  wpu = document.getElementById("wpu");
  qty = document.getElementById("qty");
  updatenumber(weight, wpu.value * qty.value);
  updateIngredients();
}

function updateIngredients()
{
  ingds = document.getElementById("ingredients");
  weight = document.getElementById("weight");
  wpu = document.getElementById("wpu");
  qty = document.getElementById("qty");
  for (i=0; i<ingds.childNodes.length; i++){
  if (ingds.childNodes[i].className=="ingredient"){
    ingname = ingds.childNodes[i].id;
    perc = document.getElementById(ingname + "-perc");
    ingweight = document.getElementById(ingname + "-weight");
    updatenumber(ingweight,  weight.value * perc.value);
    }
  }
}