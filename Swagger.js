import swaggerAutogen from 'swagger-autogen';

const outputFile = './Swagger_Output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles)