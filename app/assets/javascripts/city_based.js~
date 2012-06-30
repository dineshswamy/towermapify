var qstring="",url="",pr_id="",themap=null,geocoder=null,autocomplete=null,bounds="";
var obj3g,obj4g,objoperator;
var geoxmlobj=null;
function initialize() {

  var chicago = new google.maps.LatLng(14.477234210156507, 79.8486328125);
  var myOptions = {
    zoom:4,
    center: chicago,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
themap = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
if(boundsfixed)
{
var bounds=new google.maps.LatLngBounds(new google.maps.LatLng(a[0],a[1]),new google.maps.LatLng(a[2],a[3]));
map.fitbounds(bounds);
}
g=document.getElementById("location");
autoc_options = {
types: ['geocode'],
componentRestrictions: {country: 'in'}
};
autocomplete = new google.maps.places.Autocomplete(g,autoc_options);
google.maps.event.addListener(autocomplete,'place_changed',GeocodeLocation);
$('#operator :input').bind("click",DoQuery);

var divcontainer=document.getElementById("map_overlay");
url="http://localhost:3000/gen_kml/generatekml.xml?city_id=4652";
InspectCheckBox();
google.maps.event.addDomListener(obj3g,'click',DoQuery);
google.maps.event.addDomListener(obj4g,'click',DoQuery);
geoxmlobj=new geoXML3.parser({map:themap});
geoxmlobj.parse(url+qstring+pr_id);
}
function Check3GAnd4G(){
InspectCheckBox();
if(obj3g.checked && obj4g.checked)
{
qstring="";
qstring+="has_3g=1&has_4g=1";
}
else if(obj4g.checked)
{
qstring="";
qstring+="has_4g=1";
}
else if(obj3g.checked)
{
qstring="";
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
qstring="";
qstring+="has_3g=1&has_4g=1";
}
else if(obj4g.checked)
{
qstring="";
qstring+="has_4g=1";
}
else if(obj3g.checked)
{
qstring="";
qstring+="has_3g=1";
}
else
qstring="";
}

function DoQuery()
{
/*Check3GAnd4G();
addProvider();
*/
geoxmlobj.hideDocument();
geoxmlobj=new geoXML3.parser({map:themap });
geoxmlobj.parse(url);
}

function InspectCheckBox()
{
obj4g=document.getElementById("has_4g");
obj3g=document.getElementById("has_3g");
}
function addProvider()
{
var d=$('#operator :checked');
pr_id="";
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
bounds="";
var g=autocomplete.getPlace();
if(g==null) alert("autocomplete is empty");
//get bounds
l=g.geometry.viewport.getSouthWest();
e=g.geometry.viewport.getNorthEast();
prePareBoundsQstring(l,e);
themap.fitBounds(l.geometry.viewport);
}
function prePareBoundsQstring(l,e)
{
if(qstring=="" && pr_id=="")
boundslat="lat[]="+l.lat()+"&lat[]="+e.lat();
else
boundslat="&lat[]="+l.lat()+"&lat[]="+e.lat();
boundslng="&lng[]="+l.lng()+"&lng[]="+e.lng();
bounds=boundslat+boundslng;
}
function selectCity()
{
var c=document.selectcity.cityid.value;
url="";
url="http://localhost:3000/gen_kml/generatekml.xml?city_id="+c;
DoQuery();
}

