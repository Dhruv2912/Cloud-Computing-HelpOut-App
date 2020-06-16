from flask import Flask, render_template  

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")
    
@app.route("/nearme")
def near_me():
    return render_template("nearme.html")

@app.route("/mydonations")
def my_donations():
    return render_template("mydonations.html")


if __name__ == "__main__":
    app.run(debug=True)
