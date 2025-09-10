from pydantic import BaseModel
from typing import Optional

class OralHistory(BaseModel):
    audio_path: Optional[str] = None
    transcription: Optional[str] = None

class Product(BaseModel):
    id: int
    craft_type: str
    story: str
    green_score: int
    authenticity_score: int
    image_path: str
    marketing_poster: Optional[str] = None
    oral_history: Optional[OralHistory] = None
