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

         # Remove existing sweets and add new sample sweets
        Sweet.query.delete()
        sample_sweets = [
            Sweet(name="Ras Malai", category="Mithai", price=65.00, quantity=40),
            Sweet(name="Gulab Jamun", category="Mithai", price=55.00, quantity=50),
            Sweet(name="Moong Dal Halwa", category="Halwa", price=75.00, quantity=30),
            Sweet(name="Kaju Barfi", category="Barfi", price=85.00, quantity=25),
            Sweet(name="Besan Barfi", category="Barfi", price=60.00, quantity=45),
            Sweet(name="Besan Ladoo", category="Ladoo", price=52.00, quantity=60),
            Sweet(name="Coconut Ladoo", category="Ladoo", price=58.00, quantity=55),
            Sweet(name="Milk Peda", category="Peda", price=62.00, quantity=50),
            Sweet(name="Kaju Peda", category="Peda", price=68.00, quantity=40),
            Sweet(name="Rice Kheer", category="Kheer", price=55.00, quantity=45),
            Sweet(name="Vermicelli Kheer", category="Kheer", price=60.00, quantity=40),
            Sweet(name="Rasgulla", category="Regional Specials", price=75.00, quantity=35),
        ]
        
        for sweet in sample_sweets:
            db.session.add(sweet)
        
        print("Replaced all sweets with new sample sweets")
        
        # Commit all changes
        db.session.commit()
        print("Database initialization completed successfully!")
        
if __name__ == '__main__':
    init_db() 