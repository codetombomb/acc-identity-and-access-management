from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt

from sqlalchemy.ext.hybrid import hybrid_property


# 📝 2. Import bcrypt from config
    # - go to User model below


class Production(db.Model, SerializerMixin):
    __tablename__ = "productions"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    budget = db.Column(db.Float)
    image = db.Column(db.String)
    director = db.Column(db.String)
    description = db.Column(db.String)
    ongoing = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    crew_members = db.relationship("CrewMember", backref="production")

    serialize_rules = (
        "-crew_members.production",
    )  # https://pypi.org/project/SQLAlchemy-serializer/#:~:text=If%20for%20some%20reason%20you%20need%20the%20field%20user%20to%20be%20presented%20in%20related_models%20field.%20You%20can%20change%20serialize_rules%20to%20(%27%2Drelated_models.user.related_models%27%2C)%20To%20break%20the%20chain%20of%20serialisation%20a%20bit%20further.%20Recursive%20models%20and%20trees

    @validates("budget")
    def validate_budget(self, key, budget):
        if budget < 100:
            raise ValueError("Budget cannot be less than 100 dollars")
        return budget

    @validates("image")
    def validate_image(self, key, image_path):
        if ".jpg" not in image_path:
            raise ValueError("Image file type must be a jpg")
        return image_path

    def __repr__(self):
        return f"\n<Production id={self.id} title={self.title}, genre={self.genre}, budget={self.budget}, image={self.image}, director={self.director}, ongoing={self.ongoing} >"


class CrewMember(db.Model, SerializerMixin):
    __tablename__ = "crew_members"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    role = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    production_id = db.Column(db.Integer, db.ForeignKey("productions.id"))

    serialize_rules = (
        "-production.crew_members",
    )  # https://pypi.org/project/SQLAlchemy-serializer/#:~:text=If%20for%20some%20reason%20you%20need%20the%20field%20user%20to%20be%20presented%20in%20related_models%20field.%20You%20can%20change%20serialize_rules%20to%20(%27%2Drelated_models.user.related_models%27%2C)%20To%20break%20the%20chain%20of%20serialisation%20a%20bit%20further.%20Recursive%20models%20and%20trees

    def __repr__(self):
        return f"\n<CrewMember id={self.id} name={self.name}, role={self.role} >"


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    admin = db.Column(db.String, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # 📝 3. Add a column _password_hash of type string
        # Note: When an underscore is used, it's a sign that the variable or method is for internal use and should not be accessed from outside of the class directly.
        # - 🚨🚨 ADD UNIQUE CONSTRAINT TO EMAIL OR USERNAME 🚨🚨
    _password_hash = db.Column(db.String)
    
    # user._password_hash
    
    # 📝 4. Create a hybrid_property 
        # - Import the hybrid_property decorator from  sqlalchemy.ext.hybrid 
        # - Create the password_hash method
        # - The password_hash function will act as our reader method and expose or restrict access to the _password_hash property
        # - Show returning of the self._password_hash property
        # - Show raising Error with message saying that password hash cant be viewed
        
    # user.password_hash
    # => "password hash"
    @hybrid_property
    def password_hash(self):
        import ipdb; ipdb.set_trace()
        return self._password_hash
        raise Exception("Cannot access password hashes")
        
    # 📝 5. Create a setter function for the password_hash property
        # - Should be decorated with @password_hash.setter
        # - Setter function should be named password_hash and should accept a password as an arg (and self)
        # - Use the bcrypt.generate_password_hash() method to hash the password_passed as an arg (.decode("utf-8"))
        # - set the _password_hash property to the hashed value
        
    
    # user.password_hash = "password"
    @password_hash.setter
    def password_hash(self, password):
        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        self._password_hash = hashed_pw
    
        
    # 📝 6. Create an authenticate method that:
        # - takes in a provided password
        # - uses bcrypt.check_password_hash(self._password_hash, provided_pw) to check the self._password_hash against the provided password
    
    def authenticate(self, provided_password):
        return bcrypt.check_password_hash(self._password_hash, provided_password)
        
        
    # - Back to app
    
    
    
    
    

    def __repr__(self):
        return f"\n<User id={self.id} name={self.name} email={self.email} admin={self.admin}>"
