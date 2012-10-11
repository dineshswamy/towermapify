class CoverageMapCell < Cell::Rails

  def city_coverage(city_id)
  		@bounds=CoverageArea.select("lat,lon")
		if(!city_id.nil?) then
			l=begin Integer(city_id) rescue 0 end		
			@bounds=@bounds.where(:city_id => city_id)
			@cityid=l
		end	
		@maxlat,@maxlong=0.0,0.0
		@minlat,@minlong=999.9,999.9
		delta = 0.020
		@bounds.each { |abound|
			@maxlat = abound.lat if(abound.lat>@maxlat)		
			@minlat = abound.lat if(abound.lat<=@minlat)		
			@maxlong = abound.lon if(abound.lon>@maxlong)		
			@minlong = abound.lon if(abound.lon<=@minlong)		
		}
			@maxlat+=delta
			@minlat-=delta		
			@maxlong+=delta
			@minlong-=delta
    render
  end
  
  def region_coverage
  
  end

end
