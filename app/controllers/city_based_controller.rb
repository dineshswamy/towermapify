class CityBasedController < ApplicationController
	layout 'city_based_layout'
	def bycity
		@bounds=CoverageArea.select("lat,lon")
		if(!params[:city_id].nil?) then
			l=begin Integer(params[:city_id]) rescue 0 end		
			@bounds=@bounds.where(:city_id=>l)
			@cityid=l
		end	
		@maxlat,@maxlong=0.0,0.0
		@minlat,@minlong=999.9,999.9
		delta = 0.020
		@bounds.each{ |abound|
			@maxlat = abound.lat if(abound.lat>@maxlat)		
			@minlat = abound.lat if(abound.lat<=@minlat)		
			@maxlong = abound.lon if(abound.lon>@maxlong)		
			@minlong = abound.lon if(abound.lon<=@minlong)		
		}
		@maxlat+=delta
		@minlat-=delta		
		@maxlong+=delta
		@minlong-=delta
		
    	end
end
