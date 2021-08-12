import axios from 'axios';

let mapsapi = axios.create({
	baseURL: "https://maps.googleapis.com/maps/api/place/autocomplete/",
	headers: { 'Content-Type': 'application/json' },
	timeout: 10000,
});



let dnapi = axios.create({
   baseURL: 'https://dn-backend.app.zap-torrent.com/',
   headers: { 'Content-Type': 'application/json' },
   timeout: 10000,
});

let wpapi = axios.create({
   baseURL: 'https://dn-backend.app.zap-torrent.com/',
   headers: { 'Content-Type': 'application/json' },
   timeout: 10000,
});

let instamojoApi = axios.create({
   baseURL: 'https://www.instamojo.com/api/1.1/',
   headers: {
      'X-Api-Key': 'd3ab2d2fbc3799626314c75633874f74',
      'X-Auth-Token': '1deb431ffa8b699538b3f7a1089f696b',
   },
   timeout: 10000,
});

let dbapi = axios.create({baseURL: 'https://dailyneedz-a743e.firebaseio.com'});

export {  dnapi, wpapi, instamojoApi, mapsapi, dbapi };
