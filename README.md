## Overview
Fintra is a modular financial operating system with an AI Chief of Staff.

## Architecture
- platform-core: identity, licensing, governance
- agencyos: decision intelligence
- modules: payroll, sales tax, accounting, etc.
- frontend: unified portal

## How Students Use This Repo
- You are NOT expected to build everything
- Focus on testing, extending logic, or improving one module
- The platform is already wired end-to-end

## Getting Started
1. Clone repo
2. Install dependencies
3. Run frontend + services
4. Run tests in /testing

## What to Explore
- Cross-module intelligence
- ROI calculations
- Governance mode
- Decision explanations


cd platform-core
source venv/bin/activate (skip if no venv)
pip install -r requirements.txt
pip install fastapi uvicorn
uvicorn main:app --reload
http://127.0.0.1:8000/docs



cd frontend
npm install
npm install recharts
npm install jspdf
npm install zustand
npm install zustand recharts react-router-dom
npm install react-router-dom
npm run dev

Local: http://localhost:5173


