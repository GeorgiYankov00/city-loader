# City Loader Service
File Processor is a Node.js service that parses CSV and JSON files stored in the `/src/input` directory and loads the data into a MongoDB database. The microservice processes the files, line by line, using a Stream to optimize the memory usage and to avoid loading the whole file(s) in-memory, which will be problematic for bigger files. The requests for both files are handled in parallel manner to reduce the process time. The Database has a unique index on the `name` field to optimize filtration queries and not allow duplicate city data.

# Project Architecture:

![Alt text](https://github.com/GeorgiYankov00/city-loader/blob/main/design/City%20Web%20App.png)

# Getting Started
Prerequisites
Ensure you have Node.js and npm installed on your machine. Also, MongoDB should be running locally or accessible through a provided connection string in either .env file or environment variables of System.

# Sample environment variables
```
DB_URL = mongodb://localhost:27017
```
# Installation
Clone the repository:
```
git clone https://github.com/GeorgiYankov00/city-loader.git
```

# Navigate to the project directory:

```
cd city-loader
```

# Install dependencies:

```
npm install
```

# Starting the Service
The service will process the CSV and JSON files in parallel and load the data into the specified MongoDB database.
```
npm start
```
After the files are processed, the app process is closed.

# File Processing
The microservice automatically parses CSV and JSON files found in the `/src/input` directory. The parsed data is then loaded into the MongoDB database.

# Error Handling
Built-in error handling ensures that the microservice gracefully handles errors during the file processing and data loading stages. Check the logs for detailed information on any encountered issues.

# Future enhancements
Add support of additional file types - PSV, TSV, etc. The service to be started event-based whenever a file gets generate upstream in a designated location, in order to parse it and load the data into the DB automatically. 

# Limitations
The JSON Processor Class handles structured JSON file - 1 json at a line. In the future it needs to be enhanced based on the input data and requirements.

# Customization
Feel free to customize the microservice to suit your specific needs. You can extend the file processing logic, add additional data validation, or modify the MongoDB connection settings as required.
