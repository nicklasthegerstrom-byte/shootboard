# ShootBoard

ShootBoard is a fullstack application for planning and managing photo shoots.

Users can create shoots, upload inspirational images and automatically generate a collage, track shoot status, and view shoots in both list and calendar format.

---

## Features

- Create a new shoot with:
  - title
  - description
  - location
  - date
  - 4 inspiration images

- Automatic collage generation (backend)

- View all shoots in a clean card layout

- Edit shoot details and update status (planned / completed)

- Delete shoots

- Search/filter shoots by title

- Sort shoots by shoot date (nearest / latest)

- Calendar view:
  - Monthly overview of shoots
  - Days with shoots are marked with a dot
  - Click a date to view shoots for that day

---

## Tech Stack

Frontend:
- React (Vite)
- TypeScript
- CSS

Backend:
- FastAPI
- Python
- SQLite
- Pillow (image processing)

---

## How it works

1. User uploads 4 images
2. Backend validates and processes images
3. A collage is generated and saved
4. Shoot is stored in the database with image path
5. Frontend displays the shoot and collage
6. Calendar view visualizes shoot dates

---

## Installation

### Backend

cd backend  
python -m venv .venv  
source .venv/bin/activate   (Mac/Linux)  
pip install -r requirements.txt  
uvicorn main:app --reload  

### Frontend

cd frontend  
npm install  
npm run dev  

---

## Running the app

1. Start the backend:  
   http://localhost:8000  

2. Start the frontend:  
   http://localhost:5173  

3. Open your browser:  
   http://localhost:5173  

Make sure both backend and frontend are running at the same time.

---

## API Routes

### Shoot Routes

- GET /shoots – Get all shoots  
- GET /shoots/{id} – Get a single shoot  
- POST /shoots – Create a new shoot  
- PUT /shoots/{id} – Update a full shoot (not used in this version)
- PATCH /shoots/{id} – Update partial shoot for example only status  
- DELETE /shoots/{id} – Delete a shoot  

### Upload Routes

- POST /upload-collage – Upload 4 images and generate a collage  

---

## Notes

- Exactly 4 images are required to create a collage  
- Images are stored locally in the backend uploads directory  
- Status is managed via edit (planned → completed)  
- Calendar view uses shoot_date to highlight and filter shoots  

---

## Future Improvements

- Color-coded calendar (planned vs completed)  
- Replace local storage with cloud storage  
- Add authentication  
- Improve UI/UX  
- Drag & drop image upload  
- Better image management per shoot  

---

## Author

Nicklas Thegerström  
nicklas.thegerstrom@gmail.com  