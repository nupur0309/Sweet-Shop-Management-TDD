from app import create_app, db
from app.models import User, Sweet

def init_db():
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Check if admin user already exists
        admin_user = User.query.filter_by(username='admin').first()
        if not admin_user:
            # Create admin user
            admin = User(username='admin', is_admin=True)
            admin.set_password('admin123')
            db.session.add(admin)
            print("Created admin user: admin/admin123")
        
        # Check if regular user exists
        regular_user = User.query.filter_by(username='user').first()
        if not regular_user:
            # Create regular user
            user = User(username='user', is_admin=False)
            user.set_password('user123')
            db.session.add(user)
            print("Created regular user: user/user123")
        
if __name__ == '__main__':
    init_db() 