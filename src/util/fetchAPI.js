// Define the base URL for the API
const BASE_URL = "http://localhost:5000";

// Define a function named `request` that takes URL, method, headers, body, and isNotStringified as parameters
export const request = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
    let res; // Declare a variable to store the response from the fetch request
    let data; // Declare a variable to store the parsed JSON data from the response

    // Switch statement to handle different HTTP methods
    switch (method) {
        case 'GET':
            // Perform a GET request using fetch
            res = await fetch(BASE_URL + url, { headers });
            // Check if the response status is not 200 or 201, throw an error
            if (res.status !== 200 && res.status !== 201) throw new Error("ERROR");
            // Parse the response body as JSON
            data = await res.json();
            // Return the parsed data
            return data;

        case 'POST':
            // Check if the request body should not be stringified
            if (isNotStringified) {
                // Perform a POST request with the provided body
                res = await fetch(BASE_URL + url, { headers, method, body });
            } else {
                // Perform a POST request with the body stringified as JSON
                res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) });
            }
            // Check if the response status is not 200 or 201, throw an error
            if (res.status !== 200 && res.status !== 201) throw new Error("ERROR");
            // Parse the response body as JSON
            data = await res.json();
            // Return the parsed data
            return data;

        case 'PUT':
            // Perform a PUT request with the body stringified as JSON
            res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify(body) });
            // Check if the response status is not 200 or 201, throw an error
            if (res.status !== 200 && res.status !== 201) throw new Error("ERROR");
            // Parse the response body as JSON
            data = await res.json();
            // Return the parsed data
            return data;

        case 'DELETE':
            // Perform a DELETE request
            res = await fetch(BASE_URL + url, { headers, method });
            // Check if the response status is not 200 or 201, throw an error
            if (res.status !== 200 && res.status !== 201) throw new Error("ERROR");
            // Parse the response body as JSON
            data = await res.json();
            // Return the parsed data
            return data;

        default:
            return; // Return undefined for unsupported methods
    }
};
