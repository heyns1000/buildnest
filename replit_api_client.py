import os
import requests
import json

# --- 1. SECURELY ACCESS THE API KEY FROM REPLIT SECRETS ---
try:
    API_KEY = os.environ['HSOMNI9000_API_KEY']
    if not API_KEY:
        raise KeyError
except KeyError:
    print("FATAL ERROR: The 'HSOMNI9000_API_KEY' is not set in your Replit Secrets.")
    print("Please go to the 'Secrets' tab on the left and add it.")
    exit()

# --- 2. DEFINE THE API ENDPOINTS ---
# The base URL for your custom Banimal API
BANIMAL_API_BASE_URL = "https://www.banimal.co.za/wp-json/banimal/v1"

def inject_intelligence(user_id: int, tags: list, affinity_sector: str):
    """
    Connects to the Banimal API Hub and injects new intelligence into a user profile.
    """
    print(f"🧠 Preparing to inject intelligence for user ID: {user_id}...")
    api_url = f"{BANIMAL_API_BASE_URL}/update-user-profile"

    payload = {
        "user_id": user_id,
        "add_tags": tags,
        "affinity_sector": affinity_sector
    }

    headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            print("✅ SUCCESS: Intelligence injected successfully.")
            print("Server Response:", response.json())
        else:
            print(f"❌ ERROR: API request failed with status code {response.status_code}")
            print("Server Message:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"CRITICAL CONNECTION ERROR: Could not reach the Banimal API Hub at {api_url}.")
        print(e)

# --- NEW FUNCTION TO ADD ---
def create_or_update_product(sku: str, name: str, description: str, price: float, image_url: str):
    """
    Creates or updates a product in the Banimal WooCommerce store.
    """
    print(f"🛍️ Preparing to sync product: {name} (SKU: {sku})...")
    api_url = f"{BANIMAL_API_BASE_URL}/sync-product"

    payload = {
        "sku": sku,
        "name": name,
        "description": description,
        "regular_price": str(price), # WooCommerce API often expects price as a string
        "images": [
            {"src": image_url}
        ]
    }

    headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))
        if response.status_code in [200, 201]:
            print("✅ SUCCESS: Product synced with WooCommerce.")
            print("Server Response:", response.json())
        else:
            print(f"❌ ERROR: Product sync failed with status code {response.status_code}")
            print("Server Message:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"CRITICAL CONNECTION ERROR: Could not reach the Banimal API Hub at {api_url}.")
        print(e)

# --- NEW FUNCTION TO ADD ---
def trigger_flash_sale(discount_percentage: int, duration_hours: int):
    """
    Triggers a store-wide flash sale in WooCommerce.
    """
    print(f"💸 Preparing to trigger a {discount_percentage}% flash sale for {duration_hours} hours...")
    api_url = f"{BANIMAL_API_BASE_URL}/trigger-sale"

    payload = {
        "discount_percentage": discount_percentage,
        "duration_hours": duration_hours
    }

    headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            print("✅ SUCCESS: Flash sale activated.")
            print("Server Response:", response.json())
        else:
            print(f"❌ ERROR: Flash sale activation failed with status code {response.status_code}")
            print("Server Message:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"CRITICAL CONNECTION ERROR: Could not reach the Banimal API Hub at {api_url}.")
        print(e)


# --- EXAMPLE USAGE ---
# This is how you would call the functions from anywhere in your Replit app.
if __name__ == "__main__":
    # --- Action 1: Inject User Intelligence (Existing) ---
    print("\n--- Running Action 1: Inject User Intelligence ---")
    inject_intelligence(
        user_id=1,
        tags=["organic_cotton", "high_value_customer"],
        affinity_sector="Agriculture & Biotech"
    )

    # --- Action 2: Create a New Product (New) ---
    print("\n--- Running Action 2: Create a New Product ---")
    create_or_update_product(
        sku="BL001",
        name="Banimal Bird House Lamp & Speaker",
        description="A charming bird house that combines a gentle LED night light with a high-quality wireless Bluetooth speaker.",
        price=59.99,
        image_url="https://www.banimal.co.za/wp-content/uploads/2025/09/BL001.png"
    )

    # --- Action 3: Trigger a Flash Sale (New) ---
    print("\n--- Running Action 3: Trigger a Flash Sale ---")
    trigger_flash_sale(discount_percentage=20, duration_hours=4)

