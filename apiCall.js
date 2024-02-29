async function callMultipleAPIs(urls) {
    // Create an empty array to store the results
    const results = [];
  
    // Loop through each API URL
    for (const url of urls) {
      try {
        // Make a fetch request to the API
        const response = await fetch(url);
  
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`API call to ${url} failed with status ${response.status}`);
        }
  
        // Parse the response as JSON
        const data = await response.json();
  
        // Add the data to the results array
        results.push(data);
      } catch (error) {
        // Handle errors gracefully, like logging or displaying user-friendly messages
        console.error(`Error calling API ${url}:`, error);
      }
    }
  
    // Return the array of results
    return results;
  }
  
  // Example usage
  const apiUrls = [
    'https://milk-supplychain.vercel.app/api/users',
    'https://milk-supplychain.vercel.app/api/farmerCows',
    'https://milk-supplychain.vercel.app/api/farmerContainers',
    'https://milk-supplychain.vercel.app/api/centerFarmers',
    'https://milk-supplychain.vercel.app/api/centerVans',
    'https://milk-supplychain.vercel.app/api/cowMilkQualities',
    'https://milk-supplychain.vercel.app/api/containerMilkQualities',
    'https://milk-supplychain.vercel.app/api/containerMilkQualityCenters',
    'https://milk-supplychain.vercel.app/api/centerContainerQualities',
    'https://milk-supplychain.vercel.app/api/preProductQualities',
    'https://milk-supplychain.vercel.app/api/productQualities',
    'https://milk-supplychain.vercel.app/api/vanQualities',
  ];
  
  callMultipleAPIs(apiUrls)
    .then(results => {
      // Process the results array, which contains data from each API
      console.log(results);
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });