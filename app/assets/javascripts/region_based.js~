var qstring="",url="",pr_id="",themap=null,geocoder=null,autocomplete=null,bounds="";
var obj3g,obj4g,objoperator;
var geoxmlobj=null;
function initialize() {

  var india = new google.maps.LatLng(14.477234210156507, 79.8486328125);
  var myOptions = {
    zoom:8,
    center: india,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl:false	
  }
themap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
if(boundsfixed)
{
var mapbounds=new google.maps.LatLngBounds();
mapbounds.extend(new google.maps.LatLng(alat[0],blon[0]));
mapbounds.extend(new google.maps.LatLng(alat[1],blon[1]));
}
url="http://localhost:3000/gen_kml/generatekml.xml?reg_id="+rid;
geoxmlobj=new geoXML3.parser({map:themap});
geoxmlobj.parse(url);	
themap.fitBounds(mapbounds);
}

