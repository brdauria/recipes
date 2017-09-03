var XSLslide;
var urlXSLslide = "xsl/slide.xsl";
var XSLrecepies;
var urlXSLrecepies = "xsl/recepies.xsl";
var XMLrecepies;
var urlXMLrecepies = "recepies.xml";

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
    $.when($.ajax(urlXSLslide), $.ajax(urlXSLrecepies), $.ajax(urlXMLrecepies)).then(function (a1, a2, a3) {

        XSLslide = a1[0];
        XSLrecepies = a2[0];
        XMLrecepies = a3[0];

        node = document.getElementById("catalog");
        // code for IE
        if (window.ActiveXObject) {
            ex = XMLrecepies.transformNode(XSLslide);
            node.innerHTML = ex;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument) {
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(XSLslide);
            resultDocument = xsltProcessor.transformToFragment(XMLrecepies, document);
            node.appendChild(resultDocument);
        }

        scrollarea = document.getElementById("scroll-area");
        scrolldata = document.getElementById("scroll-data");
        update(scrollarea.getAttribute("default"));
    });
}

function update(recepie) {
    if (recepie == "") {
        selection = document.getElementById("recepies").value;
    } else {
        document.getElementById("recepies").value = recepie;
        selection = recepie;
    }

    $(".selected").removeClass("selected");
    $("#" + selection).addClass("selected");

    node = document.getElementById("recepie");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    // code for IE
    if (window.ActiveXObject) {
        ex = XMLrecepies.transformNode(XSLrecepies);
        node.innerHTML = ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(XSLrecepies);
        xsltProcessor.setParameter(null, "message", selection);
        resultDocument = xsltProcessor.transformToFragment(XMLrecepies, document);
        node.appendChild(resultDocument);
    }

    updateRecepie();
}

function updateRecepie() {
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
            perc = document.getElementById(ingname + "-perc");
            ingweight = document.getElementById(ingname + "-weight");
            updatenumber(ingweight, weight.value * perc.value);
        }
    }
}