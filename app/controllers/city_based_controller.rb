class CityBasedController < ApplicationController
	def bycity
		if(!params[:reg_id].nil?) then
		l= begin Integer(params[:reg_id]) rescue 0 end		
		@query=CoverageArea.where(:region_id=>l)
		@bounds=CoverageArea.select("max(lat) as maxlat ,min(lat) as minlat ,max(lon) as maxlon ,min(lon) as minlon")
		@bounds=@bounds.where(:region_id=>l)
	end	
end
