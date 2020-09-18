import $ from 'jquery';
import {Loader} from 'google-maps';

function LoadMap() {
	const key = 'AIzaSyC7a0YRxJASpCYbMoC3w-_kWPeiQZWz0k0';

	const loader = new Loader(key);

	const google = loader.load();

	let MapParameters = null,
		MapObject,
		Points = [],
		Routes = [],
		Lines = [],
		mapZoom = Number($('#map').attr('data-map-zoom')),
		mapCenterX = -22.96143961,
		mapCenterY = -87.35351562,
		mapXChange = [40,40,20,11,5,2.5,1,0.5,0.3,0.1],
		directionsService,
		requestArray = [],
		renderArray = [];

	if(mapZoom>12||mapZoom<3){
		mapZoom = 5;
		mapZoom = mapZoom - 1;
	}

	if($('#map').attr('data-map-address')){
		let url = `/udata/custom/getXMLtoMAS/${$('#map').attr('data-map-address')}/'.json`;

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: url,
			async: false,
			success: function(data){
				MapParameters = data;

				let pointCord;

				if(MapParameters.mid){
					let mapCenter = MapParameters.mid.split(',');
					mapCenterX = mapCenter[0];
					//mapCenterX = mapCenter[0];
					mapCenterY = mapCenter[1];
					if(mapCenterY < -180)
						mapCenterY = 360+mapCenterY;
				}
				for(let key in MapParameters){
					let obj = MapParameters[key];
					if(obj['name'] === 'Points'){
						for(let point in obj.marks){
							pointCord = obj.marks[point].split(',');
							Points.push(pointCord);
						}
					}
					else{
						if(obj['name'] === 'route'){
							let rote = [];
							for(var point in obj.marks){
								pointCord = obj.marks[point].split(',');
								rote.push(pointCord);
							}
							Routes.push(rote);
						}
						if(obj['name'] === 'line'){
							let line = [];
							for(let point in obj.marks){
								pointCord = obj.marks[point].split(',');
								line.push(pointCord);
							}
							Lines.push(line);
						}
					}
				}
			},
			error: function(){
				console.log("fail.register");
			}
		});
	}

	google.then(el => {
		MapObject = el.maps;

		directionsService = new MapObject.DirectionsService();

		let e= {
				center: new MapObject.LatLng(mapCenterX, mapCenterY),
				zoom: mapZoom,
				zoomControl:!0,
				zoomControlOptions: {
					style: MapObject.ZoomControlStyle.LARGE, position: MapObject.ControlPosition.RIGHT_BOTTOM
				}
				,
				disableDoubleClickZoom:!0,
				mapTypeControl:!0,
				mapTypeControlOptions: {
					style: MapObject.MapTypeControlStyle.DEFAULT, mapTypeIds: [MapObject.MapTypeId.ROADMAP, MapObject.MapTypeId.TERRAIN]
				}
				,
				scaleControl:!1,
				scrollwheel:!1,
				panControl:!1,
				streetViewControl:!1,
				draggable:!0,
				overviewMapControl:!0,
				overviewMapControlOptions: {
					opened: !1
				}
				,
				mapTypeId: MapObject.MapTypeId.ROADMAP,
				styles:[
					{
						featureType:"water",
						elementType:"geometry",
						stylers:[ {
							visibility: "on"
						}
							,
							{
								color: "#aee2e0"
							}
						]
					}
					,
					{
						featureType:"landscape",
						elementType:"geometry.fill",
						stylers:[ {
							color: "#abce83"
						}
						]
					}
					,
					{
						featureType:"poi",
						elementType:"geometry.fill",
						stylers:[ {
							color: "#769E72"
						}
						]
					}
					,
					{
						featureType:"poi",
						elementType:"labels.text.fill",
						stylers:[ {
							color: "#7B8758"
						}
						]
					}
					,
					{
						featureType:"poi",
						elementType:"labels.text.stroke",
						stylers:[ {
							color: "#EBF4A4"
						}
						]
					}
					,
					{
						featureType:"poi.park",
						elementType:"geometry",
						stylers:[ {
							visibility: "simplified"
						}
							,
							{
								color: "#8dab68"
							}
						]
					}
					,
					{
						featureType:"road",
						elementType:"geometry.fill",
						stylers:[ {
							visibility: "simplified"
						}
						]
					}
					,
					{
						featureType:"road",
						elementType:"labels.text.fill",
						stylers:[ {
							color: "#5B5B3F"
						}
						]
					}
					,
					{
						featureType:"road",
						elementType:"labels.text.stroke",
						stylers:[ {
							color: "#ABCE83"
						}
						]
					}
					,
					{
						featureType:"road",
						elementType:"labels.icon",
						stylers:[ {
							visibility: "off"
						}
						]
					}
					,
					{
						featureType:"road.local",
						elementType:"geometry",
						stylers:[ {
							color: "#A4C67D"
						}
						]
					}
					,
					{
						featureType:"road.arterial",
						elementType:"geometry",
						stylers:[ {
							color: "#9BBF72"
						}
						]
					}
					,
					{
						featureType:"road.highway",
						elementType:"geometry",
						stylers:[ {
							color: "#EBF4A4"
						}
						]
					}
					,
					{
						featureType:"transit",
						stylers:[ {
							visibility: "off"
						}
						]
					}
					,
					{
						featureType:"administrative",
						elementType:"geometry.stroke",
						stylers:[ {
							visibility: "on"
						}
							,
							{
								color: "#87ae79"
							}
						]
					}
					,
					{
						featureType:"administrative",
						elementType:"geometry.fill",
						stylers:[ {
							color: "#7f2200"
						}
							,
							{
								visibility: "off"
							}
						]
					}
					,
					{
						featureType:"administrative",
						elementType:"labels.text.stroke",
						stylers:[ {
							color: "#ffffff"
						}
							,
							{
								visibility: "on"
							}
							,
							{
								weight: 4.1
							}
						]
					}
					,
					{
						featureType:"administrative",
						elementType:"labels.text.fill",
						stylers:[ {
							color: "#495421"
						}
						]
					}
					,
					{
						featureType:"administrative.neighborhood",
						elementType:"labels",
						stylers:[ {
							visibility: "off"
						}
						]
					}
				]
			},
			o = document.getElementById("map"),
			t = new MapObject.Map(o, e),
			i=[
				["Лима",
					"undefined",
					"undefined",
					"undefined",
					"undefined",
					-12.046374,
					-77.0427934,
					"https://mapbuildr.com/assets/img/markers/solid-pin-orange.png"],
				["Паракас",
					"undefined",
					"undefined",
					"undefined",
					"undefined",
					-42.4008174,
					173.681386,
					"https://mapbuildr.com/assets/img/markers/solid-pin-orange.png"],
				["Балестас",
					"undefined",
					"undefined",
					"undefined",
					"undefined",
					-13.7318314,
					-76.3977304,
					"https://mapbuildr.com/assets/img/markers/solid-pin-orange.png"],
				["Наска",
					"undefined",
					"undefined",
					"undefined",
					"undefined",
					-14.8358687,
					-74.93275829999999,
					"https://mapbuildr.com/assets/img/markers/solid-pin-orange.png"],
				["Мачу",
					"undefined",
					"undefined",
					"undefined",
					"undefined",
					-31.3144808,
					-64.28823640000002,
					"https://mapbuildr.com/assets/img/markers/solid-pin-orange.png"]
			];
		let n=[];

		if(Routes.length>0&&$('#map').attr('data-map-address')) {
			generateRequests(t);
		}

		if(Lines.length > 0) {
			CreateLines(t);
		}

		if(Points.length > 0)setPoints(t);
	});


	function CreateLines(map){
		for(let iline in Lines){
			let line = Lines[iline];
			let polylineCoords = [];
			for(let ipoint in line){
				let point = line[ipoint];
				polylineCoords.push(new MapObject.LatLng(point[0], point[1]));
			}
			let polyline = new MapObject.Polyline({
				path: polylineCoords, // Координаты
				strokeColor: "#4b6953", // Цвет
				strokeWeight: 6 // Ширина
			});
			polyline.setMap(map);
		}

	}
	function generateRequests(map){
		requestArray = [];
		for (let route in Routes){
			let waypts = [];
			let start, finish;
			let lastpoint;



			MapParameters = Routes[route];
			let limit = MapParameters.length;
			for (let waypoint = 0; waypoint < limit; waypoint++) {
				if (MapParameters[waypoint] === lastpoint){
					continue;
				}
				lastpoint = MapParameters[waypoint];
				let marker = new MapObject.Marker({
					position: new MapObject.LatLng(MapParameters[waypoint][0],MapParameters[waypoint][1]),
					map: map,
					title: 'title',
					desc: 'descript',
					icon: '/templates/ilovetravel/images/icon_map.png'
				});
				waypts.push({
					location: new MapObject.LatLng(MapParameters[waypoint][0],MapParameters[waypoint][1]),
					stopover: true
				});
			}

			start = (waypts.shift()).location;
			finish = waypts.pop();
			if(finish === undefined){
				finish = start;
			} else {
				finish = finish.location;
			}
			var request = {
				origin: start,
				destination: finish,
				waypoints: waypts,
				travelMode: MapObject.TravelMode.DRIVING
			};
			requestArray.push({"route": route, "request": request});
		}
		processRequests(map);
	}

	function processRequests(map){
		let i = 0;

		function submitRequest(){
			directionsService.route(requestArray[i].request, directionResults);
		}

		function directionResults(result, status) {
			if (status === MapObject.DirectionsStatus.OK) {
				renderArray[i] = new MapObject.DirectionsRenderer({suppressMarkers:!0});
				renderArray[i].setMap(map);

				let polylineOptions = {
					strokeColor:"#4b6953",
					strokeWeight:"5"
				};

				renderArray[i].setOptions({
					preserveViewport: true,
					suppressInfoWindows: true,
					polylineOptions: polylineOptions,
				});
				renderArray[i].setDirections(result);
				nextRequest();
			}

		}

		function nextRequest(){
			i++;
			if(i >= requestArray.length){
				return;
			}
			submitRequest();
		}
		submitRequest();
	}

	function setPoints(map){
		for(let point in Points){

			let data = Points[point];
			new MapObject.Marker({
				icon: '/templates/ilovetravel/images/icon_map.png',
				position: new MapObject.LatLng(parseFloat(data[0]),parseFloat(data[1])),
				map: map
			});
		}
	}
}

const options = {
	root: null,
	rootMargin: "300px 300px 300px 300px",
	threshold: 0,
};

function CreateObserver() {
	function callback(entries,observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting){
				LoadMap();

				observer.unobserve(entry.target);
			}
		})
	}

	const observer = new IntersectionObserver(callback,options);

	if (document.querySelector('.map-main-target')){
		document.querySelectorAll('.map-main-target').forEach(function (el) {
			observer.observe(el);
		});
	}
}

if (!window['IntersectionObserver']){
	if (document.querySelector('.map-main-target')){
		LoadMap();
	}
} else {
	CreateObserver();
}