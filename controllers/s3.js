const aws = require("aws-sdk");
const crypto = require('crypto');
const util = require("util")
const randomBytes = util.promisify(crypto.randomBytes)
const dotenv = require("dotenv");
dotenv.config();


const region = "us-east-1"
const bucketName = "foodtotabledev"
const accessKeyId = process.env.S3ACCESSKEY
const secretAccessKey = process.env.S3SECRETKEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

module.exports = async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex') + ".png"

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}


