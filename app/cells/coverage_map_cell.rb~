class CoverageMapCell < Cell::Rails

  def city_coverage(select,id)
  		@bounds=CoverageArea.select("lat,lon")
		if(!id.nil?) then
			l=begin Integer(id) rescue 0 end		
			if(select==:city) then
				@bounds=@bounds.where(:city_id => l)
				@u_q="city_id="+l.to_s()	 
			elsif(select==:region)
				@bounds=@bounds.where(:region_id => l)
				@u_q="reg_id="+l.to_s()	
			end
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
			@chosen=select
    render
    
  end
end
