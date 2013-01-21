var markerArray=new Array();
function send_url(url_json,map)
{
	$.ajax({
	url:url_json,
	type:"get",
	async:true,
	beforeSend:function(){
			set_loader();
	},
	success:function(data){
			render_json(data,map);
	}
	});
}

function render_json(data)
{
		var json_data=$.parseJSON(data);
		var map_coverage_data=json_data.coverage_data;
		for(i=0;i<map_coverage_data.length;i++)
		{
		createMarker(map_data[i].prov_id,map_data[i].city,map_data[i].lat,map_data[i].lon,map_data[i].has_3g,map_data[i].has_4g,map_data[i].has_hsia);
		}
}

function createMarker(pid,city,lat,lng,has_3g,has_4g,has_hsia)
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
infocontent+="<img src=\"/assets/4g.png\"></br><img src=\"/assets/3g.png\">";
}
else if(has_4g)
{
infocontent+="<img src=\"/assets/4g.png\">";
}
else if(has_3g)
{
infocontent+="<img src=\"/assets/3g.png\">";
}
infocontent+=pid;
var infoboxoptions={
      content:'<div>'+city+'<div>'+infocontent+'</div></div>',
      pixelOffset: new google.maps.Size(-95,-20),
      maxWidth:0,
      disableAutoPan:true,
      closeBoxMargin:"0px 0px 0px 0px",
      closeBoxURL:"/assets/close.png",
      isHidden:false,
      pane:"floatPane",
      boxClass:"infowindow_style",
      enableEventPropagation:true,
      alignBottom:true
    };

infowindow=new InfoBox(infoboxoptions);
google.maps.event.addListener(marker,'click',function(){
	infowindow.close();
	infowindow.open(map,marker);
});
markersArray.push(marker);
}
function clearMarker()
{
	if(markersArray)
	{
		for (i in markersArray )
		{
			markersArray[i].infowindow.close();
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
