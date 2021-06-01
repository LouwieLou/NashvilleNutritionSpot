# Instructions to download webpage and test it
1. Clone repository from github using `git clone https://github.com/skandasastry/nashville-nutrition-spot.git`. Or, if you are 
receiving the code as a zip file, simply extract the code directory from the zip archive.
2. In the terminal, navigate into the main directory with the command `cd nashville-nutrition-spot`
3. Navigate to the frontend part and install necessary packages by using the command `cd frontend && npm install`. 
4. Open up another terminal window in the same location as the main directory.
5. Navigate to the backend part and install packages by using the command `cd backend && npm install`.
6. Run the command `node src` to start the backend server.
7. On the frontend terminal, run the command `npm start` or `yarn start`. If you are getting an error due to missing
packages, first run `npm install` then run `npm start`. If you are getting errors due to missing modules, resolve this
by entering the command `npm i [MISSING MODULE IN ERROR MESSAGE]`.
8. If you would like to test the Square ordering functionality, ensure that the .env files are 
in both of your `frontend/` and `backend/` directories.
9. Your default browser should automatically open the page to http://localhost:3000
10. If you want to make changes to the code, simply open up your favorite text editor and 
make the changes, then save your file. The webpage should re-render automatically but if 
it doesn't just force a refresh and it will update.




