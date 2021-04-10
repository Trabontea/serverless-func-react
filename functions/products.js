require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.DB_SHOES)
  .table('products')

exports.handler = async(event, context, cb) => {
  // console.log(event); // queryStringParameters: { id: '1' },
  const { id } = event.queryStringParameters;
  // console.log('id::', id);

  if (id) {
    try {
      const product = await airtable.retrieve(id);
      console.log(product)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`
      }
    }
  }
  try {
    const { records } = await airtable.list(); // data.records
    // console.log(records);
    const products = records.map((product) => {
      const { id } = product;
      const {name, image, price} = product.fields;
      const url = image[0].url;
      return {id, name , url, price}
    })
    return  {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch(error) {
    return  {
      statusCode: 500,
      body: 'Server Error'
    }
  }
}