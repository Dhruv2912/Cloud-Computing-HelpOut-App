# Help-out Application

## Introduction

In today’s world there are many people who want to contribute to the society and have enough resources to help people, 
but they are not able to find the cause they believe in or do not have the information of the causes around them. This web application provides a solution for this problem. 
It is a web application that would be used as a platform to help the society or people in need by creating causes or by contributing in them. 
A major issue in the existing solutions is that they are mostly used for financial contributions. They do not consider any other listings. 
This application would also allow the user to create a listing for resources (There could be a listing for collecting Food items for people in need due to Covid-19). 
Other problem is that most of the existing solutions are more inclined in promoting organizations, but this application would allow any individual to create a cause irrespective of the resources or donation asked. To make it more efficient and easier the application would also provide the feature to find the causes which are near their vicinity (10-miles). 
The web application will be hosted on the cloud and would be automatically scaled up or down to handle the web traffic using Google App Engine.

## Technologies Used 

• Web Application (HTML, CSS, jQuery, and JavaScript)
• Google App Engine (Hosting and Autoscaling) 
• Firebase (Authentication) 
• Cloud Firestore (Database) 
• GOOGLE APIs (Geocoding API and Google Maps API) 

## Installation Steps 

• Create firebase project 
• Replace firebase configuration and credentials in credentials.js file with your projects credentials. 
• Enable firebase Email/Password authentication 
• Create following collections in cloud fire store 
	o causes 
	o resourceCauses 
	o users 
	o donations 
• Create a project in Google Cloud Platform Console 
• Enable Google Maps API and Geocoding API in your google cloud project 
• Create an API credential key from the console. 
• Replace the key in credentials.js with your key 
 
With these changes deploy the code on Google App Engine using google cloud SDK and run the app. 