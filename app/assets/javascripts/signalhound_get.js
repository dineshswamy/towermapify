function initialize()
	{
		var mapoptions={
		center:new google.maps.LatLng(14.477234210156507, 79.8486328125),
		zoom:5,
		MapTypeId:google.maps.MapTypeId.ROADMAP
		};	
		var themap=new google.maps.Map(document.getElementById("map_canvas"),mapoptions);
		var heatmaplayer= new google.maps.visualization.HeatmapLayer({
		data:heatmapdata
		});
		heatmaplayer.setMap(themap);
		
	}
