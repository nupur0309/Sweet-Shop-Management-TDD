
import pytest
from app import create_app, db

@pytest.fixture
def app():
    """Create application for testing."""
    test_config = {
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
        'JWT_SECRET_KEY': 'test-key',
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    }
    app = create_app(test_config)
    return app

def test_imports():
    """Test if all required modules can be imported."""
    try:
        from app.models import User, Sweet
        from app.routes import auth, sweets, inventory
        assert True
    except ImportError as e:
        pytest.fail(f"Failed to import modules: {e}")

def test_app_creation(app):
    """Test if app can be created successfully."""
    assert app is not None
    assert app.config['TESTING'] is True

def test_database_initialization(app):
    """Test if database can be initialized."""
    with app.app_context():
        try:
            db.create_all()
            db.session.remove()
            db.drop_all()
            assert True
        except Exception as e:
            pytest.fail(f"Database initialization failed: {e}")
