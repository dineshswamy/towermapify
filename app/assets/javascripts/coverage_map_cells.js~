var markersArray=new Array();
var op_logo_hash=[];
var last_Marker=null;
function initialize(query_url) {
  var india = new google.maps.LatLng(14.477234210156507, 79.8486328125);
  var myOptions = {
    zoom:6,
    center: india,
    zoomControl:false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
var themap = new google.maps.Map(document.getElementById("region_city_based_coverage_map"), myOptions);
if(boundsfixed)
{
var mapbounds=new google.maps.LatLngBounds(new google.maps.LatLng(alat[0],blon[0]),new google.maps.LatLng(alat[1],blon[1]));
themap.fitBounds(mapbounds);
}
url="/gen_kml/generatekml.json?"+query_url;
send_url(url,themap);
}
function send_url(url_json,map)
{
	$.ajax({
	url:url_json,
	type:"get",
	async:true,
	beforeSend:function(){
			
	},
	success:function(data){
			render_json(data,map);
			
	},
	error:function(data){
				render_json($.parseJSON(data.responseText),map);
				
	}
	});
}

function render_json(data,map)
{
		var map_coverage_data=data.coverage_data;
		for(i=0;i<map_coverage_data.length;i++)
		{
createMarker(map_coverage_data[i].prov_id,map_coverage_data[i].city,map_coverage_data[i].lat,map_coverage_data[i].lon,map_coverage_data[i].has_3g,map_coverage_data[i].has_4g,map_coverage_data[i].has_hsia,map);
		}
}

function createMarker(pid,city,lat,lng,has_3g,has_4g,has_hsia,map)
{	
	var LatLng=new google.maps.LatLng(lat,lng);
	var chooseicon;	
	var infocontent="";
	var provider_icon=getProviderIcon(pid);	
	
	var marker_image=new google.maps.MarkerImage(
          provider_icon,
          new google.maps.Size(23, 27),
          new google.maps.Point(0, 0),
          new google.maps.Point(10,27)
        );
var marker = new google.maps.Marker({
				position:LatLng,
		      map:map,
	 			icon:marker_image
				});

if(has_3g && has_4g)
{
infocontent+="<img src=\"/assets/4g.png\" width=\"30\" height=\"30\" ></br><img src=\"/assets/3g.png\" width=\"30\" height=\"30\" >";
}
else if(has_4g)
{
infocontent+="<img src=\"/assets/4g.png\" width=\"30\" height=\"30\" >";
}
else if(has_3g)
{
infocontent+="<img src=\"/assets/3g.png\" width=\"30\" height=\"30\" >";
}
infocontent+=pid;
var infoboxoptions={
      content:'<div class="text_style">'+city+'<ul class="list_info">'+infocontent+'</ul></div>',
      pixelOffset: new google.maps.Size(-95,-20),
      maxWidth:0,
      disableAutoPan:true,
      closeBoxMargin:"10px 10px 0px 0px",
      closeBoxURL:"/assets/close_info.gif",
      isHidden:false,
      pane:"floatPane",
      boxClass:"infowindow_style",
      enableEventPropagation:true,
      alignBottom:true
    };

var infowindow=new InfoBox(infoboxoptions);
marker.infowindow=infowindow;
google.maps.event.addListener(marker,'click',function(){
if(!!last_Marker && !! last_Marker.infowindow)
{
	last_Marker.infowindow.close();
	
}
	last_Marker=this;
	infowindow.open(this.map,this);
});
markersArray.push(marker);
}
function clearMarker()
{
	if(markersArray)
	{
		for (i in markersArray)
		{			
			markersArray[i].setMap(null);	
		}
	}
}
function getProviderIcon(pid)
{
	op_logo_hash[0]="reliance.png"
	op_logo_hash[1]="airtel.png"
	op_logo_hash[3]="reliance.png"
	op_logo_hash[17]="reliance.png"
	op_logo_hash[4]="vodafone.png"
	op_logo_hash[5]="aircel.png"
	op_logo_hash[6]="bsnl.png"
	op_logo_hash[7]="idea.png"
	op_logo_hash[10]="mts.png"
	op_logo_hash[13]="docomo.png"
	op_logo_hash[12]="docomo.png"
	return "/assets/"+op_logo_hash[pid];
}

