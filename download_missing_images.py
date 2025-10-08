#!/usr/bin/env python3
"""
Script to download missing product images for Parampara Foods
"""

import os
import requests
from pathlib import Path
import time

# Base directory for images
BASE_DIR = Path("D:/Project_MI/Parampara_Foods/wwwroot/images/products")

# List of all food items from seed data
FOOD_ITEMS = [
    # Vegetables
    "tomatoes", "spinach", "carrots", "bell-peppers", "broccoli",
    # Fruits  
    "apples", "bananas", "strawberries", "oranges", "blueberries",
    # Dairy
    "milk", "yogurt", "cheese", "eggs",
    # Grains
    "rice", "quinoa", "bread",
    # Herbs
    "basil", "rosemary", "cilantro",
    # Beverages
    "green-tea", "orange-juice"
]

# Image URLs for each food item (using Unsplash for high-quality images)
IMAGE_URLS = {
    # Vegetables
    "tomatoes": [
        "https://images.unsplash.com/photo-1546470427-5c4b0a0a0b0b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "spinach": [
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "carrots": [
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "bell-peppers": [
        "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "broccoli": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    # Fruits
    "apples": [
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "bananas": [
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "strawberries": [
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "oranges": [
        "https://images.unsplash.com/photo-1557800634-7bf3c73be389?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "blueberries": [
        "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    # Dairy
    "milk": [
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "yogurt": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "cheese": [
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "eggs": [
        "https://images.unsplash.com/photo-1518569656558-1f25e69d93d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    # Grains
    "rice": [
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "quinoa": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "bread": [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    # Herbs
    "basil": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "rosemary": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "cilantro": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    # Beverages
    "green-tea": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ],
    "orange-juice": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop"
    ]
}

def download_image(url, filepath):
    """Download an image from URL and save to filepath"""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ Downloaded: {filepath.name}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {filepath.name}: {e}")
        return False

def main():
    print("Starting image download process...")
    print(f"Target directory: {BASE_DIR}")
    
    # Ensure directory exists
    BASE_DIR.mkdir(parents=True, exist_ok=True)
    
    downloaded_count = 0
    failed_count = 0
    
    for food_item in FOOD_ITEMS:
        if food_item not in IMAGE_URLS:
            print(f"⚠ No URLs defined for: {food_item}")
            continue
            
        urls = IMAGE_URLS[food_item]
        
        # Download main image (index 0)
        main_image = BASE_DIR / f"{food_item}.jpg"
        if not main_image.exists() or main_image.stat().st_size < 1000:  # Less than 1KB means corrupted
            if download_image(urls[0], main_image):
                downloaded_count += 1
            else:
                failed_count += 1
        
        # Download additional images (index 1-4)
        for i in range(1, min(5, len(urls))):
            additional_image = BASE_DIR / f"{food_item}-{i+1}.jpg"
            if not additional_image.exists():
                if download_image(urls[i], additional_image):
                    downloaded_count += 1
                else:
                    failed_count += 1
        
        # Small delay to be respectful to the server
        time.sleep(0.5)
    
    print(f"\nDownload complete!")
    print(f"✓ Successfully downloaded: {downloaded_count} images")
    print(f"✗ Failed downloads: {failed_count} images")

if __name__ == "__main__":
    main()
