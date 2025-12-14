from app import create_app, db
from app.models import User
from sqlalchemy import select

app = create_app()

with app.app_context():
    try:
        print("Testing query...")
        stmt = select(User).filter_by(username="test_user")
        user = db.session.execute(stmt).scalar_one_or_none()
        print("Query successful")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
