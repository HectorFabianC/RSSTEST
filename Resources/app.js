var ventanaMain = Titanium.UI.createWindow({
	backgroundColor : '#000000',
	layout:'vertical'		//layout de las views
});

// Create an HTTPClient.
var anXhr = Ti.Network.createHTTPClient();
anXhr.setTimeout(10000);

// Define the callback.
anXhr.onload = function() {
  //alert(this.responseText);
  var xml = this.responseXML.documentElement;
  var data = [];
  var items = xml.getElementsByTagName("item");

  // var doctitle = xml.evaluate("//channel/title/text()").item(0).nodeValue;
  for (var i = 0; i < items.length; i++) {
    data.push({
      title : items.item(i).getElementsByTagName("title").item(0).text,
      subtitle : items.item(i).getElementsByTagName("link").item(0).text,
    });
    
    var LabelSab = Ti.UI.createLabel({	//label sabado
    	color: '#FFFFFF',
    	text: JSON.stringify(data[i].title),
    });
    ventanaMain.add(LabelSab);
  };

  console.log(JSON.stringify(data));
};
anXhr.onerror = function() {
  alert('The HTTP request failed');
};

// Send the request data.
anXhr.open('GET', 'http://archivo.eluniversal.com.mx/rss/universalmxm.xml');
anXhr.send();

ventanaMain.open();
