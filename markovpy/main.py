import markovify
from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

userBots = {
    "122512846041907203": "DamnStraight",
    "111815854492061696": "Renbot",
    "169633774257176577": "CloudRunner"
}

models = ["122512846041907203", "111815854492061696", "169633774257176577"]

trainedModels: dict[str, markovify.NewlineText] = {}


def init_models() -> None:
    for botId in models:
        with open(f"models/{botId}.txt") as f:
            text = f.read()
            text_model = markovify.NewlineText(text, state_size=2)
            trainedModels[botId] = text_model
            f.close()

    print("Models loaded")


init_models()


@app.route("/generateMessage")
def generate_message():
    bot_id = request.args.get('botId')
    size = int(request.args.get('size'))
    seed = request.args.get('seed')

    error, message = "", ""

    if seed != "":
        try:
            message = trainedModels[bot_id].make_sentence_with_start(beginning=seed, size=200, strict=False)
        except markovify.text.ParamError:
            error = f"Could not generate sentence beginning with: {seed}"
    else:
        message = trainedModels[bot_id].make_short_sentence(size)

    if message is None or message == "":
        return jsonify(f"Error: {error}")
    else:
        return jsonify(f"{userBots[bot_id]}: {message}")
