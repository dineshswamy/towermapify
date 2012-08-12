TowerMapify::Application.routes.draw do
 
  #match.gen_kml '/gen_kml/1',:to=>'generatekml#gen_kml' 

  #get "gen_kml/generatekml"

  match "gen_kml/generatekml" =>"gen_kml#generatekml"
  match "signalmapify/getsignaldata"=>"signalmapify#getsignaldata"
  match "signalhound_get/signal_getify"=>"signalhound_get#signal_getify"
  match "signalhound_get/signal_mapify"=>"signalhound_get#signal_mapify"
  match "test_as_client/send_json"=>"test_as_client#send_json"
  get "city_based/bycity"
  get "region_based/byregions"
  get "towermapify/mapthetowers"
  get "show_entry/theentry"
  get "showcity/list"

  # The priority is based upon order of creation:
  # first created -> highest priority.
 resources :showcity_controller
  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  #root :to => 'komparifymap#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
