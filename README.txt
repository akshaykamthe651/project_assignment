STEPS DONE :

1) Created two JSON mock server running on port no :
	http://localhost:3000/hotels
	http://localhost:7000/hotels
	
2) Pulled data from both and source and different files.
	db.json
	db1.json
 Combined in demo.json
 
3) Client hits end-point will gets data from both API'S (Used Node js )
	http://localhost:8080/hotels/
	
4) Used HTTP methods: GET Method with different filter conditions 
	filter on : 1) Roomsize
				2) SearchByHotelName
				3) Sorting On Price 

	