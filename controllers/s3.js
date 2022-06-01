const aws = require("aws-sdk");
const crypto = require('crypto');
const util = require("util")
const randomBytes = util.promisify(crypto.randomBytes)


const region = "us-east-1"
const bucketName = "foodtotabledev"
const accessKeyId = "AKIASNJCCJQFTZUA6CHC"
const secretAccessKey = "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"

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


