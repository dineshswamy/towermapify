# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.

 $(document).ready(function(){
                  var myOptions = {                    
                     zoom: 4,
                    // center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);     var geoXml = new geoXML3.parser({
                    map: map,
                    singleInfoWindow: true
                });
               //geoXml.parse('http://localhost:3000/gen_kml/generatekml.xml');
            });

