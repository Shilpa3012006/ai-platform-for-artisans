from models import Product, OralHistory

products = [
    Product(
        id=1,
        craft_type="Handwoven Bamboo Basket",
        story="Handcrafted by Ananya from Assam, crafted using traditional weaving passed through generations.",
        green_score=85,
        authenticity_score=90,
        image_path="/static/images/basket.jpg",
        marketing_poster="/static/images/poster1.jpg",
        oral_history=OralHistory(
            audio_path="/static/audio/basket_story.mp3",
            transcription="This bamboo basket design has been preserved for 150 years."
        )
    ),
    Product(
        id=2,
        craft_type="Terracotta Pot",
        story="Created by Ramesh from Rajasthan, reflecting eco-friendly pottery traditions.",
        green_score=92,
        authenticity_score=88,
        image_path="/static/images/pot.jpg",
        marketing_poster="/static/images/poster2.jpg",
        oral_history=OralHistory(
            audio_path="/static/audio/pot_story.mp3",
            transcription="This pottery is inspired by the desert culture of Rajasthan."
        )
    ),
    Product(
        id=3,
        craft_type="Handloom Cotton Saree",
        story="Woven by Lata from Tamil Nadu, each saree is a story of dedication and eco-conscious craft.",
        green_score=95,
        authenticity_score=93,
        image_path="/static/images/saree.jpg",
        marketing_poster="/static/images/poster3.jpg",
        oral_history=OralHistory(
            audio_path="/static/audio/saree_story.mp3",
            transcription="These sarees are part of my family's handloom tradition."
        )
    )
]
