export interface GeoIPModel {
	ip: string;
	location: {
		continent_code: string;
		continent_name: string;
		country_code2: string;
		country_code3: string;
		country_name: string;
		country_name_official: string;
		country_capital: string;
		state_prov: string;
		state_code: string;
		district: string;
		city: string;
		zipcode: string;
		latitude: string;
		longitude: string;
		is_eu: boolean;
		country_flag: string;
		geoname_id: string;
		country_emoji: string;
	};
	country_metadata: {
		calling_code: string;
		tld: string;
		languages: string[];
	};
	currency: {
		code: string;
		name: string;
		symbol: string;
	};
}
