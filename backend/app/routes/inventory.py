from flask import Blueprint, jsonify,request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app.models import Sweet
from app import db

# Make sure the blueprint name is unique
inventory_bp = Blueprint("inventory", __name__)

@inventory_bp.route("/<int:id>/purchase", methods=["POST"])
@jwt_required()
def purchase(id):
    try:
        sweet = db.get_or_404(Sweet, id)
        if sweet.quantity == 0:
            return jsonify(msg="Out of stock"), 400
        sweet.quantity -= 1
        db.session.commit()
        return jsonify(msg="Purchased successfully"), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(msg="Purchase failed"), 500