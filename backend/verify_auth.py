import requests
import sys

BASE_URL = "http://127.0.0.1:5000/api/auth"

def test_auth():
    print("Testing Registration...")
    reg_data = {
        "username": "test_user_new_1",
        "password": "password123"
    }
    
    try:
        # Register
        resp = requests.post(f"{BASE_URL}/register", json=reg_data)
        print(f"Register Status: {resp.status_code}")
        print(f"Register Response: {resp.json()}")
        
        if resp.status_code == 201 or (resp.status_code == 400 and "already exists" in resp.json().get("msg", "")):
            print("Registration OK (Created or Exists)")
        else:
            print("Registration FAILED")
            sys.exit(1)

        # Login
        print("\nTesting Login...")
        login_data = {
            "username": "test_user_new_1",
            "password": "password123"
        }
        resp = requests.post(f"{BASE_URL}/login", json=login_data)
        print(f"Login Status: {resp.status_code}")
        print(f"Login Response: {resp.json()}")

        if resp.status_code == 200 and "access_token" in resp.json():
            print("Login SUCCESS")
        else:
            print("Login FAILED")
            sys.exit(1)

    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_auth()
