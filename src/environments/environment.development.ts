// export const environment = {
//     production: true,
//     // BASE_URL:'http://35.154.44.56:3000/api', //SMG SERVER
//     BASE_URL:'http://35.154.44.56:3000/api',

    
   
// };
 

export const environment = {
  production: true,
  BASE_URL: getBaseUrl()
};

function getBaseUrl() {
  const serverIp = window.location.hostname;

  // Define the base URLs based on different server IPs
  const baseUrls:any = {
    // '35.154.44.56': 'https://stargatestaging-poolmonitor.exotel.com:3000/api', //VRM UAT
    // '35.154.44.56': 'https://stargatestaging-poolmonitor.exotel.com:3000/api', //VRM UAT
    'https://stargatestaging-poolmonitor.exotel.com':'https://stargatestaging-poolmonitor.exotel.com:3000/api',
    // 'https://stargatestaging-poolmonitor.exotel.com:3000/login': 'https://stargatestaging-poolmonitor.exotel.com:3000/api', //VRM UAT
    '3.111.214.34': 'http://3.111.214.34:3000/api' //SMG
    
  };

  // Default base URL if server IP does not match any defined mappings
  // const defaultBaseUrl = 'http://35.154.44.56:3000/api';
  const defaultBaseUrl = 'https://stargatestaging-poolmonitor.exotel.com:3000/login';

  // Return the corresponding base URL based on the server's IP
  return baseUrls[serverIp] || defaultBaseUrl;
}
