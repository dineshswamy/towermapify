$(function(){$("input:checkbox,input:text,input:button").uniform()});
var qstring="",url="",pr_id="",themap=null,geocoder=null,autocomplete=null,bounds="";
var obj3g,obj4g,objoperator;
var geoxmlobj=null,startOverQuery=true;
var defOptions=null,prevlat=null,prevlon=null,prevBounds=null,india_bounds=null;
var sw=new Array();
var ne=new Array();
var map_reset=true;
var moreResultsAvailable=true,outsideindia=true;
function initialize() {

  var india = new google.maps.LatLng(14.477234210156507, 79.8486328125);
   defOptions = {
    zoom:5,
    center: india,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

themap = new google.maps.Map(document.getElementById("map_canvas"), defOptions);
g=document.getElementById("location");
autoc_options = {
types: ['(regions)'],
componentRestrictions: {country: 'in'}
};
autocomplete = new google.maps.places.Autocomplete(g,autoc_options);
//google.maps.event.addListener(autocomplete,'place_changed',GeocodeLocation);
$('#operator :input').bind("click",DoQuery);
india_bounds=new google.maps.LatLngBounds(new google.maps.LatLng(6.7471390,68.1623860),new google.maps.LatLng(35.50715650,97.3955550));
prevBounds=india_bounds;
var operatorlist=document.getElementById("map_operator_list");

themap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(operatorlist);
var autocompletediv=document.getElementById("map_overlay_autocomplete");
themap.controls[google.maps.ControlPosition.TOP_LEFT].push(autocompletediv);

url="http://localhost:3000/gen_kml/generatekml.xml?";
InspectCheckBox();
google.maps.event.addDomListener(obj3g,'click',DoQuery);
google.maps.event.addDomListener(obj4g,'click',DoQuery);
geoxmlobj=new geoXML3.parser({map:themap});
geoxmlobj.parse(url);
google.maps.event.addListener(themap,'idle',InspectBounds);

}
function Check3GAnd4G(){
InspectCheckBox();
if(obj3g.checked && obj4g.checked)
{
qstring+="has_3g=1&has_4g=1";
}
else if(obj4g.checked)
{
qstring+="has_4g=1";
}
else if(obj3g.checked)
{
qstring+="has_3g=1";
}
else
qstring="";
}
function Check4G()
{
InspectCheckBox();
if(obj3g.checked && obj4g.checked)
{
qstring+="has_3g=1&has_4g=1";
}
else if(obj4g.checked)
{
qstring+="has_4g=1";
}
else if(obj3g.checked)
{
qstring+="has_3g=1";
}
else
qstring="";
}
function ClearValues()
{
qstring="";
pr_id="";
}
function DoQuery()
{
ClearValues();
Check3GAnd4G();
addProvider();
if(sw.length!=0 && ne.length!=0)
prePareBoundsQstring(sw[0],sw[1],ne[0],ne[1]);
geoxmlobj.hideDocument();
geoxmlobj=new geoXML3.parser({map:themap });
geoxmlobj.parse(url+qstring+pr_id+bounds);
}

function InspectCheckBox()
{
obj4g=document.getElementById("has_4g");
obj3g=document.getElementById("has_3g");
}
function addProvider()
{
var d=$('#operator :checked');
d.each(function(i){
if(i==0 && qstring=="")
pr_id+="op_id[]="+$(this).val();
else
pr_id+="&op_id[]="+$(this).val();
});
}
function Drawrectangle()
{
rectangle= new google.maps.Circle();
// set bounds
circleOptions={
center:themap.getCenter(),
map:themap,
editable:true,
radius:15
};
rectangle.setOptions(circleOptions);
}

function GeocodeLocation()
{
//get place
var locval=document.getElementById("location");
var l=null,e=null;
var g=autocomplete.getPlace();
if(locval.value!="")
{
sw.length=0;
ne.length=0;
if(g.id!=null)
themap.fitBounds(g.geometry.viewport);

//get bounds
//l=g.geometry.viewport.getSouthWest();
//e=g.geometry.viewport.getNorthEast();
//sw.push(l.lat());
//sw.push(l.lng());
//ne.push(e.lat());
//ne.push(e.lng());
//UpdatePreviousBoundsandDoQuery();
}
}
function PushMapBounds()
{

}
function InspectBounds()
{
sw.length=0;
ne.length=0;
var mapbounds=themap.getBounds();
l=mapbounds.getSouthWest();
e=mapbounds.getNorthEast();
sw.push(l.lat());
sw.push(l.lng());
ne.push(e.lat());
ne.push(e.lng());
zl=themap.getZoom();
if(zl>=5)
{
map_reset=true;
if(india_bounds.intersects(mapbounds))
{
if(prevBounds!=null)
{
if((!prevBounds.contains(l) || !prevBounds.contains(e)) || moreResultsAvailable)//contains
{
UpdatePreviousBoundsandDoQuery();
}
else
{
//Do nothing
}
}
else
{
//initializing the previous LatLng Bounds
UpdatePreviousBoundsandDoQuery();
}
}
}
else if(zl<5)
{
if(map_reset)
resetMap();
}
var o=document.getElementById("pb");
var e=document.getElementById("cb");
o.innerHTML="previous bounds"+prevBounds.toString();
e.innerHTML="CurrentBounds"+themap.getBounds().toString()+"</br>zoom level:"+zl
+"moremarkers"+moreResultsAvailable;
}
function UpdatePreviousBoundsandDoQuery()
{
sw[0]-=3;
sw[1]-=3;
ne[0]+=3;
ne[1]+=3;
prevBounds=new google.maps.LatLngBounds(new google.maps.LatLng(sw[0],sw[1]),new google.maps.LatLng(ne[0],ne[1]));
DoQuery();
}
function resetMap()
{
prevBounds=null;
bounds="";
sw.length=0;
ne.length=0;
map_reset=false;
DoQuery();
}
function prePareBoundsQstring(swlat,swlng,nelat,nelng)
{
bounds="";
if(qstring=="" && pr_id=="")
boundslat="lat[]="+swlat+"&lat[]="+nelat;
else
boundslat="&lat[]="+swlat+"&lat[]="+nelat;
boundslng="&lng[]="+swlng+"&lng[]="+nelng;
bounds=boundslat+boundslng;
}

function getLocation()
{
if(navigator.geolocation)
{
navigator.geolocation.getCurrentPosition(onsuccess,onfailure);
}
}




