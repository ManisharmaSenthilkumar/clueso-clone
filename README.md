1. Setup & Installation Instructions

1.1 Prerequisites
    Make sure you have the following installed:
        Node.js ≥ 18
        npm ≥ 9
        Git
        (Optional) Google Gemini API key for AI insights

1.2 Clone the Repository
    git clone https://github.com/<your-username>/clueso-clone.git
    cd clueso-clone

1.3 Backend Setup 
    cd backend      //command to run in terminal
    npm install     //command to run in terminal

    1.3.1 Create a .env file inside backend/  and add this line to the .env file :

            PORT=5000
            JWT_SECRET=super_secret_key
            AI_PROVIDER=gemini
            GEMINI_API_KEY=your_gemini_api_key_here

    Start the backend server:
        npm run dev     //command to run in terminal

        After sussefull running it shows that 
            Backend runs at (http://localhost:5000) in terminal

1.4 Frontend Setup
    cd frontend     //Start a new terminal without intrupting Backend terminal and run this command
    npm install     //command to run in terminal
    npm run dev     //command to run in terminal

    After sussefull running it shows that 
            Frontend runs at (http://localhost:5173) in terminal




2. How to Run the Project Locally

    2.1- Start backend first
        cd backend      //command to run in terminal
        npm run dev     //command to run in terminal

    2.2- Start Frontend
        cd frontend      //command to run in terminal
        npm install     //command to run in terminal

    2.3- Open Browser 

            http://localhost:5173

    
    2.4- Create a new account using signup button. 
         There may not any existing users so create new using valid credentials.



3. Architecture Overview

    3.1- High-Level Architecture



            ┌────────────┐
            │  Frontend  │  React + Vite + Tailwind
            │ (Browser)  │
            └─────▲──────┘
                │ REST API (JWT)
                ▼
            ┌────────────┐
            │  Backend   │  Node.js + Express
            │ (API)      │
            └─────▲──────┘
                │
                ▼
            ┌────────────┐
            │  Database  │  SQLite
            └────────────┘
                │
                ▼
            ┌────────────┐
            │ AI Layer   │  Gemini API / Mock AI
            └────────────┘




    3.2- Component Responsibilities

     3.2.1- Frontend
     
               Authentication (Login / Signup)

               Dashboard UI & Navigation

               Feedback submission

               Insights visualization

               Protected routes using JWT


    3.2.2- Backend


                User authentication & session handling

                Feedback CRUD operations

                AI insights generation

                Workspace-based data isolation

                Secure JWT validation


    3.2.3- AI Integration

                Gemini AI used for:

                    > Summary generation

                    > Sentiment analysis

                    > Theme extraction

                Automatic fallback to Mock AI when quota is exceeded




4. Assumptions & Design Decisions


    4.1- Assumptions & Design Decisions

            > Focused on matching workflows and behavior

            > UI styling approximates Clueso but prioritizes functionality


    4.2- Workspace Model Simplification

            > Single seeded workspace (clueso-demo-workspace)

            > All users belong to this workspace

            > Mirrors Clueso’s multi-tenant design in a simplified form

        
    4.3- AI Fallback Strategy

            > Real Gemini AI used when available

            > Mock AI provider used when:

                > API quota is exceeded

                > API key is missing

            > This ensures:

                > System never crashes

                > Demo is always functional


    4.4- Database Choice

                > SQLite selected for:

                    > Easy local setup

                    > Zero external dependencies

                > Schema designed to be easily migrated to PostgreSQL

    
    4.5- Security Decisions 

                > Passwords hashed using bcrypt

                > JWT used for stateless authentication

                > Protected routes enforced both frontend & backend

    4.6- Known Limitations(Documented Intentionally)

                > Browser extension not implemented

                > No production hosting

                > Limited AI rate depending on Gemini quota


       ** These limitations are explicitly documented per assignment instructions.**