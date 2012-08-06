class SignalhoundGetController < ApplicationController
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
			@signal_data.save
			end
		end
	end
end
