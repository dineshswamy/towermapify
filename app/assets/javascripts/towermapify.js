$(function(){$("input:checkbox,input:text,input:button").uniform()});
var qstring="",url="",pr_id="",themap=null,geocoder=null,autocomplete=null,bounds="";
var obj3g,obj4g,objoperator;
var geoxmlobj=null,startOverQuery=true,check_avail_operators=true;
var ControlsontheMap=new Object();
var defOptions=null,prevlat=null,prevlon=null,prevBounds=null,india_bounds=null;
var sw=new Array();
var ne=new Array();
var map_reset=true;
var moreResultsAvailable=true,outsideindia=true,Operator_Node_List=null;
var rectangle=null;
function initialize() 
{
var india = new google.maps.LatLng(14.477234210156507, 79.8486328125);
   defOptions = {
    zoom:5,
    center: india,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions:{position:google.maps.ControlPosition.BOTTOM_LEFT}
  };
themap = new google.maps.Map(document.getElementById("map_canvas"), defOptions);
g=document.getElementById("location");
autoc_options = {
types: ['(regions)'],
componentRestrictions: {country: 'in'}
};

autocomplete = new google.maps.places.Autocomplete(g,autoc_options);
google.maps.event.addListener(autocomplete,'place_changed',GeocodeLocation);
$('#operator :input').bind("click",click_DoQuery);
india_bounds=new google.maps.LatLngBounds(new google.maps.LatLng(6.7471390,68.1623860),new google.maps.LatLng(35.50715650,97.3955550));
prevBounds=india_bounds;
var operatorlist=document.getElementById("map_operator_list");
themap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(operatorlist);
url="http://localhost:3000/gen_kml/generatekml.xml?";
InspectCheckBox();
//intializing functions for hiding and showing controls on the map(global variable)
ControlsontheMap.hide=function showtheControlsontheMap()
{
$("#operator").hide();
$("#loader_ajax").show();
}
ControlsontheMap.show=function hidetheControlsontheMap()
{
$("#loader_ajax").hide();
$("#operator").fadeIn();
}
google.maps.event.addDomListener(obj3g,'click',DoQuery);
google.maps.event.addDomListener(obj4g,'click',DoQuery);
//geoxmlobj=new geoXML3.parser({map:themap});
//geoxmlobj.parse(url);
google.maps.event.addListener(themap,'bounds_changed',InspectBounds);
//$("#loader_logo").hide();
//show or hide controls

$("#control_show_or_hide").toggle(function(){
$("#control_show_or_hide").html('<img src="/assets/control_open.png" />');
$("#operator_div").css("visibility","hidden");
},
function()
{
$("#control_show_or_hide").html('<img src="/assets/control_close.png" />');
$("#operator_div").css("visibility","visible");
});

}
function click_DoQuery()
{
check_avail_operators=false;
DoQuery();
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
ControlsontheMap.hide();
ClearValues();
Check3GAnd4G();
addProvider();
if(sw.length!=0 && ne.length!=0)
prePareBoundsQstring(sw[0],sw[1],ne[0],ne[1]);
//Need to check because, if the geoxmlobj is loaded for the first time , then it will through error , since it is null. So to make sure it is not null , we do check.
if(geoxmlobj!=null)
geoxmlobj.hideDocument();
geoxmlobj=new geoXML3.parser({map:themap });
//console.log("request"+url+qstring+pr_id+bounds);
geoxmlobj.parse(url+qstring+pr_id+bounds);
//need to check whether this request is from operators checkbox.if true , we need not check available operators also if do so it will remove the unchecked operators.
if(check_avail_operators)
Available_Operators();
check_avail_operators=true;
}
function Reset_map_to_Original()
{
themap.fitBounds(india_bounds);
themap.setZoom(5);
DoQuery();
}
function Available_Operators()
{
var input_value;
var operators_array;
Operators_Node_List=$.trim(Operators_Node_List);
operators_array=Operators_Node_List.split(' ');
console.log(operators_array);
$(".operator_check").each(
function(){
input_value=$(this).val();
console.log("Input value:"+input_value);
if($.inArray(input_value,operators_array)>-1)
{
$(this).attr("checked","checked");
}
else
$(this).removeAttr("checked","checked");
$.uniform.update();
});
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
}
function UpdatePreviousBoundsandDoQuery()
{
sw[0]-=3;
sw[1]-=3;
ne[0]+=3;
ne[1]+=3;
prevBounds=new google.maps.LatLngBounds(new google.maps.LatLng(sw[0],sw[1]),new google.maps.LatLng(ne[0],ne[1]));
//console.log("Came here because of the zoom level");
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





