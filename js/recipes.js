var XSLslide;
var urlXSLslide = "xsl/slide.xsl";
var XSLrecipes;
var urlXSLrecipes = "xsl/recipes.xsl";
var XMLrecipes;
var urlXMLrecipes = "recipes.xml";

function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send("");
    return xhttp.responseXML;
}

function allblue() {
    $("div").css('color', 'blue');
}

function displayResult() {
    $.when($.ajax(urlXSLslide), $.ajax(urlXSLrecipes), $.ajax(urlXMLrecipes)).then(function (a1, a2, a3) {

        XSLslide = a1[0];
        XSLrecipes = a2[0];
        XMLrecipes = a3[0];

        node = document.getElementById("catalog");
        // code for IE
        if (window.ActiveXObject) {
            ex = XMLrecipes.transformNode(XSLslide);
            node.innerHTML = ex;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument) {
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(XSLslide);
            resultDocument = xsltProcessor.transformToFragment(XMLrecipes, document);
            node.appendChild(resultDocument);
        }

        scrollarea = document.getElementById("scroll-area");
        scrolldata = document.getElementById("scroll-data");
        update(scrollarea.getAttribute("default"));
    });
}

function update(recipe) {
    if (recipe == "") {
        selection = document.getElementById("recipes").value;
    } else {
        document.getElementById("recipes").value = recipe;
        selection = recipe;
    }

    $(".selected").removeClass("selected");
    $("#" + selection).addClass("selected");

    node = document.getElementById("recipe");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    // code for IE
    if (window.ActiveXObject) {
        ex = XMLrecipes.transformNode(XSLrecipes);
        node.innerHTML = ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(XSLrecipes);
        xsltProcessor.setParameter(null, "message", selection);
        resultDocument = xsltProcessor.transformToFragment(XMLrecipes, document);
        node.appendChild(resultDocument);
    }

    updateRecipe();
}

function updateRecipe() {
    weight = document.getElementById("weight");
    wpu = document.getElementById("wpu");
    qty = document.getElementById("qty");

    if (weight.value == "") {
        updatenumber(weight, wpu.value * qty.value);
    }

    if (qty.value == "") {
        updatenumber(qty, weight.value / wpu.value);
    }

    updateIngredients();
}

function updatenumber(field, number) {
    if (field.getAttribute("digit") != null) {
        nd = field.getAttribute("digit");
        field.value = Math.round(number * Math.pow(10, nd)) / Math.pow(10, nd);
    } else {
        field.value = number;
    }
}

function weightUpdate() {
    weight = document.getElementById("weight");
    wpu = document.getElementById("wpu");
    qty = document.getElementById("qty");
    updatenumber(qty, weight.value / wpu.value);
    updateIngredients();
}

function qtyUpdate() {
    weight = document.getElementById("weight");
    wpu = document.getElementById("wpu");
    qty = document.getElementById("qty");
    updatenumber(weight, wpu.value * qty.value);
    updateIngredients();
}

function updateIngredients() {
    ingds = document.getElementById("ingredients");
    weight = document.getElementById("weight");
    wpu = document.getElementById("wpu");
    qty = document.getElementById("qty");
    for (i = 0; i < ingds.childNodes.length; i++) {
        var cname = ingds.childNodes[i].className;
        if (cname && cname.indexOf("ingredient") !== -1) {
            ingname = ingds.childNodes[i].id;
            proportion = document.getElementById(ingname + "-proportion");
            ingweight = document.getElementById(ingname + "-weight");
            updatenumber(ingweight, weight.value * proportion.value);
        }
    }
}