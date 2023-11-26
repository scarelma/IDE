# Auth service


For development:
```bash
docker compose up db -d && docker compose up pgadmin -d

alembic revision --autogenerate -m "migration name ( similar to git commit message )"        

alembic upgrade head    

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```