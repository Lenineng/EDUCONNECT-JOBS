from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory database for demonstration purposes
users = []
jobs = []

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        user = {
            "name": request.form["name"],
            "email": request.form["email"],
            "password": request.form["password"],
            "user_type": request.form["user_type"]
        }
        users.append(user)
        return redirect(url_for("login"))
    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        user = next((u for u in users if u["email"] == email and u["password"] == password), None)
        if user:
            return redirect(url_for("dashboard", user_type=user["user_type"]))
        return "Invalid credentials"
    return render_template("login.html")

@app.route("/dashboard/<user_type>", methods=["GET", "POST"])
def dashboard(user_type):
    if user_type == "employer" and request.method == "POST":
        job = {
            "title": request.form["title"],
            "description": request.form["description"]
        }
        jobs.append(job)
    return render_template("dashboard.html", user_type=user_type, jobs=jobs)

if __name__ == "__main__":
    app.run(debug=True)
