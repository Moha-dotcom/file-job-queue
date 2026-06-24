from card_generator import CardValidator, CardGenerator
import json

amex_generator = CardGenerator("amex")

# Generate 2 cards with formatting and bank info
pretty_cards = amex_generator.generate(
    count=9,
    beautiful_format=True,

)

print(json.dumps([
    {
        "card": "3438 4472 0543 385",
        "expiry_date": "04/32",
        "cvv": 8890
    },
    {
        "card": "3731 9255 9854 074",
        "expiry_date": "10/31",
        "cvv": 5784
    },
    {
        "card": "3759 5559 7325 713",
        "expiry_date": "07/29",
        "cvv": 8623
    },
    {
        "card": "3490 9804 7496 629",
        "expiry_date": "06/28",
        "cvv": 7771
    },
    {
        "card": "3750 8145 7598 586",
        "expiry_date": "01/31",
        "cvv": 4129
    },
    {
        "card": "3710 1945 3344 823",
        "expiry_date": "07/32",
        "cvv": 6493
    },
    {
        "card": "3787 7068 4672 241",
        "expiry_date": "10/28",
        "cvv": 8738
    },
    {
        "card": "3400 9503 9355 523",
        "expiry_date": "02/32",
        "cvv": 3962
    },
    {
        "card": "3470 9840 8755 102",
        "expiry_date": "12/31",
        "cvv": 1835
    }
]))
#