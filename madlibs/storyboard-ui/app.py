import os
import re
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder=".")

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Link directly to your text folder path structure
STORY_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "..", "text_stories", "stories_tragic-romance"))
if not os.path.exists(STORY_DIR):
    STORY_DIR = os.path.join(CURRENT_DIR, "text_stories", "stories_tragic-romance")

print(f"\n[SERVER LOG] PYTHON SERVER IS LOOKING IN: {STORY_DIR}\n")

@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(".", path)

@app.route("/api/stories", methods=["GET"])
def list_stories():
    if not os.path.exists(STORY_DIR):
        return jsonify([])
    files = [f for f in os.listdir(STORY_DIR) if f.endswith(".txt")]
    return jsonify(sorted(files))

@app.route("/api/story/<filename>", methods=["GET"])
def get_story_metadata(filename):
    safe_filename = os.path.basename(filename)
    file_path = os.path.join(STORY_DIR, safe_filename)
    
    if not os.path.exists(file_path):
        print(f"[ERROR LOG] Python failed to locate file asset: {file_path}")
        return jsonify({"error": "File target not found"}), 404
        
    story_content = ""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            story_content = f.read()
    except UnicodeDecodeError:
        with open(file_path, "r", encoding="cp1252", errors="replace") as f:
            story_content = f.read()
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Regex matches your single curly bracket values {tag} accurately
    found_tags = re.findall(r"\{([^{}]+)\}", story_content)
    unique_placeholders = sorted(list(set(found_tags)))
        
    return jsonify({
        "title": safe_filename.replace(".txt", "").replace("_", " ").title(),
        "placeholders": unique_placeholders,
        "content": story_content
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
