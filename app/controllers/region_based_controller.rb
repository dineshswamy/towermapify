class RegionBasedController < ApplicationController
	layout 'region_based_layout'	
	def byregions
		@bounds=CoverageArea.select("lat,lon")
		if(!params[:region_id].nil?) then
			l= begin Integer(params[:region_id]) rescue 0 end		
			@bounds=@bounds.where(:region_id=>l)
			@regionid=l
		end	
		@maxlat,@maxlong=0.0,0.0
		@minlat,@minlong=999.9,999.9
		delta = 0.015
		@bounds.each{ |abound|
			@maxlat = abound.lat if(abound.lat>@maxlat)		
			@minlat = abound.lat if(abound.lat<@minlat)		
			@maxlong = abound.lon if(abound.lon>@maxlong)		
			@minlong = abound.lon if(abound.lon<@minlong)		
		}
		@maxlat+=delta
		@minlat+=delta		
		@maxlong+=delta
		@minlong+=delta
		puts "#{@maxlat},#{@maxlong},#{@minlat},#{@minlong}"
	end	
end
