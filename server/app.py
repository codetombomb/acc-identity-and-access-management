from flask import request, make_response, session
from flask_restful import Resource

from models import User, Production, CrewMember

from config import app, api, db


class Productions(Resource):
    def get(self):
        production_list = [p.to_dict() for p in Production.query.all()]
        response = make_response(
            production_list,
            200,
        )

        return response

    def post(self):
        form_json = request.get_json()
        new_production = Production(
            title=form_json["title"],
            genre=form_json["genre"],
            budget=int(form_json["budget"]),
            image=form_json["image"],
            director=form_json["director"],
            description=form_json["description"],
        )

        db.session.add(new_production)
        db.session.commit()

        response_dict = new_production.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response


api.add_resource(Productions, "/productions")


class ProductionByID(Resource):
    def get(self, id):
        production = Production.query.filter_by(id=id).first()
        if not production:
            return {"error": "Production not found"}, 404
        production_dict = production.to_dict()
        response = make_response(production_dict, 200)
        return response

    def patch(self, id):
        production = Production.query.filter_by(id=id).first()
        if not production:
            return {"error": "Production not found"}, 404

        for attr in request.form:
            setattr(production, attr, request.form[attr])

        production.ongoing = bool(request.form["ongoing"])
        production.budget = int(request.form["budget"])

        db.session.add(production)
        db.session.commit()

        production_dict = production.to_dict()

        response = make_response(production_dict, 200)
        return response

    def delete(self, id):
        production = Production.query.filter_by(id=id).first()
        if not production:
            return {"error": "Production not found"}, 404
        db.session.delete(production)
        db.session.commit()

        response = make_response("", 204)

        return response


api.add_resource(ProductionByID, "/productions/<int:id>")

# 7. User - POST
# - Create a User POST route by creating a class Users that inherits from Resource
# - Add the route '/users' with api.add_resource()
# - Create a POST method
# - Use .get_json() to convert the request json
# - *** Check for missing values on the request json and return errors list with 422 if any missing ***
# - Create a new user with the request data's name and email property
# - *** Use the password_hash setter method to set the password on the new user object ***
# - Add and commit the new user
# - Save the new users id to the session hash
# - Make a response and send it back to the client
# - Handle errors on client side

# 8. Create a Login route
# - Create a login custom route with methods=["POST"]
# - Build out the login function
# - Use .get_json() to convert the request json
# - Use the name in request data to query the user with a .filter
# - If user found:
    # - If user authenticated (pass password to authenticate method):
        # - set session user_id
        # - convert the user to_dict and send a response back to the client with 200
    # - If user not authorized, return errors list "Username or password incorrect" 401 unauthorized
# - If user not found, return errors list "Username or password incorrect" 401 unauthorized
# - Handle errors on client side

# 11. Create an /authorized custom route with methods=['GET']
# - Create a authorized function
# - Access the user_id from session with session.get
# - Use the user id to query the user with a .filter
# - If the user id is in sessions and found make a response to send to the client
# - If session user_id not present, return errors list "Unauthorized"

# 12. Head back to client/src/App.js to restrict access to our app!

# 13. Logout
# -  Create a class Logout that inherits from Resource
# -  Create a method called delete
# -  Clear the user id in session by setting the key to None
# -  create a 204 no content response to send back to the client

# 14. Navigate to client/src/components/Navigation.js to build the logout button!


if __name__ == "__main__":
    app.run(port=5000, debug=True)
