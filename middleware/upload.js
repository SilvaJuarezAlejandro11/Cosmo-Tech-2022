const multer = require('multer');
const MulterAzureStorage = require('multer-azure-storage');

const upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString:
      'DefaultEndpointsProtocol=https;AccountName=storagebatizlab;AccountKey=xCvZxcgmG3xoIJqiWMQt320vBmD5DTiHeg7r5yYt0FTeSIbAE3C4v1zMJbuLtRF+bVGMfSv6ZK1/14J0lWZnWw==;EndpointSuffix=core.windows.net',
    containerName: 'archivos',
    containerSecurity: 'blob',
  }),
});

module.exports = upload;
