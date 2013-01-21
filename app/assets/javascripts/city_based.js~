var qstring="",url="",pr_id="",themap=null,geocoder=null,autocomplete=null,bounds="";
var geoxmlobj=null;
function initialize() {
  var india = new google.maps.LatLng(14.477234210156507, 79.8486328125);
  var myOptions = {
    zoom:6,
    center: india,
    zoomControl:false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
themap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
if(boundsfixed)
{
var mapbounds=new google.maps.LatLngBounds(new google.maps.LatLng(alat[0],blon[0]),new google.maps.LatLng(alat[1],blon[1]));
themap.fitBounds(mapbounds);
}
url="/gen_kml/generatekml.xml?city_id="+cid;
geoxmlobj=new geoXML3.parser({map:themap});
geoxmlobj.parse(url);	
}

