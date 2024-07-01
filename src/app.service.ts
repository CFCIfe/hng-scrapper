import { Injectable } from '@nestjs/common';
import axios from 'axios';

type returnBody = {
  client_ip?: string;
  location?: string;
  greeting: string;
};

@Injectable()
export class AppService {
  private ipdata_apikey;
  private weather_apikey;
  constructor() {
    this.ipdata_apikey = process.env.IPDATA_API_KEY;
    this.weather_apikey = process.env.WEATHERAPI_API_KEY;
  }

  async getHello(name: string): Promise<returnBody> {
    if (!name) {
      return { greeting: 'Request failed. Please provide a visitor name' };
    }

    const client_name = name.charAt(0).toUpperCase() + name.slice(1);

    // Get the client's IP address
    // Get the client's location
    const client_location_response = await axios.get(
      `https://api.ipdata.co?api-key=${this.ipdata_apikey}`,
    );

    const { ip, city } = client_location_response.data;

    const client_temp_response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${this.weather_apikey}&q=${city}`,
    );

    const client_temp = client_temp_response.data.current.temp_c;

    return {
      client_ip: ip,
      location: city,
      greeting: `Hello, ${client_name}!, the temperature is ${client_temp} degrees Celsius in ${city}`,
    };
  }
}
