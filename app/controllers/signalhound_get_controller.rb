class SignalhoundGetController < ApplicationController
	layout 'signalhound_heatmap_layout'
	def signal_getify
		
		if(!params[:signal_data].nil?) then
			
			@signal_data_json=JSON.parse(params[:signal_data])
			@signal_data_json.each do |l|
			@signal_data= SignalHoundData.new
			@signal_data.operator_id=l["operator_id"]
			@signal_data.operator_name=l["operator_name"]
			@signal_data.lat=l["lat"]
			@signal_data.lon=l["lon"]
			@signal_data.dbm=l["dbm"]
			@signal_data.network_type=l["network_type"]
			@signal_data.weight=l["weight"]
			@signal_data.save
			
			end
		end
		#asynchronous processing of signal data recieved.
		#redirect_to :action=>"signal_mapify"
	end
	def signal_mapify
		@signal_to_map_data=SignalHoundData.select("*")
		@count_no_of_rows=0
	end
	def signal_mapify_dbm_normalize
			@signaldata_count=SignalHoundData.count
			@error_value=[]
			while @signaldata_count > 0
				@current_record=SignalHoundData.first
				@current_record_lat=@current_record[:lat]
				@current_record_lon=@current_record[:lon]
				@records_from_signal_data=SignalHoundData.where(:lat)
				
				
			end
	end
end
