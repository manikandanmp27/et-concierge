import json

def load_products():
    with open("data/et_products.json") as f:
        return json.load(f)

def recommend(profile: dict) -> list:
    if not profile:
        return []

    products = load_products()
    interests = [i.lower() for i in profile.get("interests", [])]
    role = profile.get("role", "").lower()
    goal = profile.get("financial_goals", "").lower()
    experience = profile.get("experience_level", "").lower()

    scored = []
    for p in products:
        score = 0
        tags = [t.lower() for t in p.get("tags", [])]
        for interest in interests:
            if any(interest in tag or tag in interest for tag in tags):
                score += 2
        if role in tags:
            score += 2
        if goal in tags:
            score += 1
        if experience in tags:
            score += 1
        if score > 0:
            scored.append((score, p))

    scored.sort(reverse=True)
    top = scored[:3]

    return [
        {
            "id": p["id"],
            "name": p["name"],
            "reason": build_reason(p, profile),
            "url": p.get("url", "")
        }
        for _, p in top
    ]

def build_reason(product: dict, profile: dict) -> str:
    role = profile.get("role", "you")
    return f"Perfect for a {role} — {product['description']}"