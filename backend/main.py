from app.__init__ import app, init_app, register_blueprints

init_app(app)
register_blueprints()

if __name__ == "__main__":
    app.run(debug=True, port=5001)