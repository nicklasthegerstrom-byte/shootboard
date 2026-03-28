<<<<<<< HEAD
# shootboard
=======
# ShootBoard

ShootBoard is a fullstack application for planning and managing photo shoots.

Users can create shoots, upload inspiration images, automatically generate a collage, and keep track of shoot status.

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

---

## Installation

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

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

## API Endpoints

- GET /shoots – Get all shoots
- POST /shoots – Create new shoot
- PATCH /shoots/{id} – Update shoot
- DELETE /shoots/{id} – Delete shoot
- POST /upload-collage – Upload 4 images and generate collage

---

## Notes

- Exactly 4 images are required to create a collage
- Images are stored locally in the backend uploads directory
- Status is managed only during edit (planned → completed)

---

## Future Improvements

- Replace local storage with cloud storage
- Add authentication
- Improve UI/UX
- Drag & drop image upload
- Better image management per shoot

---

## Author

Nicklas Thegerström
nicklas.thegerstrom@gmail.com
>>>>>>> aa938ca (gitignore)
