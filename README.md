# OptiCool-CC (# Team CH2-PS291)
Member of Cloud Computing for Bangkit Academy Capstone Team CH2-PS291
| Member | Student ID | University |
|:------:|:----------:|:----------:|
| Dafif Afin Annafi | C312BSY4392 | Sebelas Maret University |
| Lusy Dahniar Alfani | C312BSX4036 | Sebelas Maret University |


**This is Cloud Computing repository for OptiCool application.**


## API Description
We began by implementing secure user authentication with JSON Web Token (jsonwebtoken) and Bcrypt for account creation. After login, users get a unique token as a key for various APIs, enhancing security by confirming their identity. This token acts as a digital pass, granting secure access to explore our platform's full capabilities. User authentication is deployed using App Engine. We have also created a Model API based on the work of our Machine Learning team, which has developed and trained the model. We deployed this Model API on Google Cloud Run to ensure availability and scalability, enabling users to easily upload facial images and receive accurate prediction responses regarding their facial shapes. The integration of a glasses database in Cloud SQL connects facial predictions to eyeglass frame recommendations based on the corresponding database.

## API Documentation
[API Documentation](https://documenter.getpostman.com/view/31606648/2s9YeMzng8)

## API URL
[Auth and Database API](https://public-dot-opticool.et.r.appspot.com/)
[Machine Learning API](https://prediction-icoh56fh5a-et.a.run.app/)


## Endpoints
Here are the endpoints used by Opticool

**Auth and Database API**

 - **'/register'**
	User registration using email/password method (saving user data in Cloud SQL)
- **'/login'**
	Creating a unique session token for the user
- **'/user'**
	Retrieving user data from the database
- **'/eyeglass'**
	Retrieving eyeglass data from the database
- **'/eyeglass/{id}'**
	Retrieving eyeglass data who have same id as a parameter from the url endpoint from the database

**Machine Learning API**

 - **'/predict'**
	Sending face photos for AI prediction

## Deployment Model ML
**Model ML OptiCool are deployed on Cloud Run Google Cloud Platform.**
Before deploying the model, we should make Model API. Where in this case we using Flask. 
 1. Prepare Flask Project
    - Create Flask project named app.py, and a folder named static/uploads/ to store uploaded images.
 2. Build the Model and Configuration Files
    - Ensure the machine learning model (face_types_model.h5) and other configuration files are included and available in the project.
 3. Install Dependencies
    - Install the required dependencies from the requirements.txt file:
	```
	pip install -r requirements.txt
	```
 4. Test the Application Locally:
    - Ensure the application runs successfully locally before proceeding to the next steps:
	```
	python app.py
	```
	- To test, you can use Postman and create a new POST request to https://localhost:8080/predict with form data in the body. Fill in the key with 'image' and the value with the image you want to test.
 5. Create Dockerfile
 6. Create .dockerignore
	- Create or ensure the .dockerignore file contains items that should not be included in the Docker image. For example:
	```
	README.md
	*.pyc
	*.pyo
	*.pyd
	__pycache__
	.pytest_cache
	.idea
	test
	```
 7. Build and Tag the Docker Image:
    - Run the following command to initiate a build and tag the Docker image:
	```
	gcloud builds submit --tag gcr.io/opticool/predict
	```
	- This command will use Google Cloud Build to build the Docker image based on the Dockerfile in project directory
 8. Setup Google Cloud
    - Go to opticool project
	```
	gcloud config set project opticool
	```
	- Activate cloud run API and cloud builds API
	```
	gcloud services enable run.googleapis.com
    gcloud services enable cloudbuild.googleapis.com
	```
	- Install and init Google Cloud SDK
	  Here link to install Cloud CLI : https://cloud.google.com/sdk/docs/install
 9. Deploy to Cloud Run
	- With the Docker image now in Google Container Registry, we can proceed to deploy the application to Google Cloud Run using the gcloud run deploy command.
	```
	gcloud run deploy --image gcr.io/opticool/predict --memory 1Gi --cpu 2
	```
	- Choose options such as region, service name, and confirm to proceed with the deployment.
 10. Access the Application on Cloud Run:
     	- After a successful deployment, access the application through the URL provided by Google Cloud Run. 

