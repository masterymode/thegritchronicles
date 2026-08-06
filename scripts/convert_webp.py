import os
from pathlib import Path
from PIL import Image

def convert_images_to_webp():
    # Determine the directory where the script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Supported input formats
    extensions = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}
    
    print(f"Scanning directory: {script_dir}")
    
    found_images = False
    for file in os.listdir(script_dir):
        file_path = script_dir / file
        
        # Check if file is an image and not already a webp
        if file_path.suffix.lower() in extensions:
            found_images = True
            output_path = file_path.with_suffix(".webp")
            
            try:
                with Image.open(file_path) as img:
                    # Convert to RGB if necessary (e.g., for RGBA to WebP)
                    # or keep as is for transparency support
                    img.save(output_path, "WEBP", quality=80)
                    print(f"Successfully converted: {file} -> {output_path.name}")
            except Exception as e:
                print(f"Failed to convert {file}: {e}")

    if not found_images:
        print("No compatible images found in the script's folder.")

if __name__ == "__main__":
    convert_images_to_webp()