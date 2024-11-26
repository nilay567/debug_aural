import cloudinary

import cloudinary.uploader
import cloudinary.api

config = cloudinary.config(secure=True)
          
config=cloudinary.config( 
  cloud_name = "dxhkqc1df", 
  api_key = "871297912786714", 
  api_secret = "uz6w-dcTYc_IaWmkqRPLb0MPeA8" 
)

def uploadImage(path,imagename):
    try:
        response=cloudinary.uploader.upload(
            f"{path}/{imagename}.png",unique_filename=True,overwrite=True
        )
        if response:
            return response["url"]
    except Exception as e:
        print(f"Image upload error for {imagename}:{e}")
        return None
    
