from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Product
from data import products

app = FastAPI(title="ArtisanHub API")

# Allow frontend (React) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite or CRA
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to ArtisanHub API"}

@app.get("/products/", response_model=list[Product])
def get_products():
    return products

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    for p in products:
        if p.id == product_id:
            return p
    return {"error": "Product not found"}
