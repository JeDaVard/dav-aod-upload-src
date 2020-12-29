## How to run locally

1. Create AWS bucket
2. Create AWS IAM User with full s3 permissions
3. Rename `.env.dev` file to `.env`
4. In the `.env` file, set the following environment variables
    1. `AWS_ACCESS_KEY_ID=<your_aws_users_key_id>`
    2. `AWS_SECRET_ACCESS_KEY=<your_aws_users_access_key>`
    3. `BUCKET_NAME=<the_bucket_name_you_just_created>`
    
5. Open the terminal, make sure you are in the project directory, and run `npm i`, it might take a few minutes, please wait.
6. Run `npm run dev` to start the server
___
## How to use

1. Make sure you have the server successfully up and running

2. Here you have two endpoints for uploads.
   1. a binary upload (requirement). Upload a file via POST request to `/raw/{filename}` endpoint (provide the content-type).
   2. form-data upload (additional). Upload a file via POST request to `/form-upload` endpoint.
   
You are allowed to upload png, jpg, and pdf files. After the upload process, if it's a pdf, it goes to the `<your_aws_bucket>/files/` folder, if it's an image, it goes to the `<your_aws_bucket>/images/` folder with 3 sizes configured through environment. 
___
## How to config

1. In order to allow more file types, just add more types by adding a comma and the type, like `,<type>` 
2. You can also change the sizes, the shape is `<width>x<height>`
3. Set the required max file size by changing `MAX_FILE_SIZE` env variable (integer in kilobytes)

### Thank you and good luck ;)
