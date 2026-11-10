export const items = [
    {
        "name": "Tango",
        "purpose": "Recovery",
        "image": "images/item-icons/tango.jpg",
        "summary": "Bring Tangos to recover between trades without leaving your lane.",
        "cost": 90,
        "abilities": [
            {
                "type": "Use",
                "name": "Devour",
                "text": [
                    "Consumes a target tree to gain 7 health regeneration for 16 seconds. Consuming an Ironwood Tree doubles the heal amount.",
                    "Cast Range: 165"
                ]
            }
        ],
        "lore": "Forage to survive on the battlefield."
    },
    {
        "name": "Bloodthorn",
        "purpose": "Damage",
        "image": "images/item-icons/bloodthorn.jpg",
        "summary": "Choose Bloodthorn when your team can focus attacks on a silenced target.",
        "cost": 6800,
        "stats": [
            "+20 Intelligence",
            "+60 Attack Speed",
            "+50 Damage",
            "+5 Mana Regeneration",
            "+20 Magic Resistance"
        ],
        "abilities": [
            {
                "type": "Active",
                "name": "Soul Rend",
                "text": [
                    "Silences a target for 5 seconds. At the end of the silence, an additional 30% of all damage taken during the silence will be dealt to the target as magical damage.",
                    "All attacks on the silenced target will have True Strike and 100% chance to critically strike for 130% damage.",
                    "Range: 900"
                ]
            },
            {
                "type": "Passive",
                "name": "Mage Slayer",
                "text": [
                    "Places a debuff when you attack enemies, causing them to do 35% less spell damage for 6 seconds."
                ]
            }
        ],
        "lore": "A reviled blade that bites deeper with each wriggle of its victim's final throes."
    },
    {
        "name": "Black King Bar",
        "purpose": "Defense",
        "image": "images/item-icons/black_king_bar.jpg",
        "summary": "Activate Black King Bar before committing to a fight against enemy disables.",
        "cost": 4050,
        "stats": [
            "+10 Strength",
            "+24 Attack Damage"
        ],
        "abilities": [
            {
                "type": "Active",
                "name": "Avatar",
                "text": [
                    "Applies a Basic Dispel. Grants 60% Magic resistance and immunity to pure and reflected damage. For the duration of the effect, any negative effect from enemy spells has no effect.",
                    "Duration: 9/8/7/6",
                    "Dispel Type: Basic Dispel"
                ]
            }
        ],
        "lore": "A powerful staff imbued with the strength of giants."
    },
    {
        "name": "Blink Dagger",
        "purpose": "Mobility",
        "image": "images/item-icons/blink_dagger.png",
        "summary": "Use Blink Dagger to close the gap before an initiation spell.",
        "cost": 2250,
        "abilities": [
            {
                "type": "Active",
                "name": "Blink",
                "text": [
                    "Teleport to a target point up to 1200 units away.",
                    "Blink Dagger cannot be used for 3 seconds after taking damage from an enemy hero or Roshan."
                ]
            }
        ],
        "lore": "The fabled dagger used by the fastest assassin ever to walk the lands."
    },
    {
        "name": "Monkey King Bar",
        "purpose": "Damage",
        "image": "images/item-icons/Monkey_King_Bar.jpg",
        "summary": "Consider Monkey King Bar when evasion makes your attacks miss.",
        "cost": 4700,
        "stats": [
            "+40 Attack Damage",
            "+45 Attack Speed"
        ],
        "abilities": [
            {
                "type": "Passive",
                "name": "Pierce",
                "text": [
                    "Grants each attack an 80% chance to pierce through evasion and deal 70 bonus magical damage."
                ]
            }
        ],
        "lore": "A powerful staff used by a master warrior."
    },
    {
        "name": "Magic Stick",
        "purpose": "Recovery",
        "image": "images/item-icons/stick.jpg",
        "summary": "Pick up a Magic Stick in a lane where opponents cast spells frequently.",
        "abilities": [
            {
                "type": "Active",
                "name": "Energy Charge",
                "text": [
                    "Nearby enemy spell casts can build charges. Activate the stick to spend its charges and restore health and mana."
                ]
            }
        ]
    },
    {
        "name": "Faerie Fire",
        "purpose": "Recovery",
        "image": "images/item-icons/faerie-fire.jpg",
        "summary": "Carry a Faerie Fire for a burst of healing during an early trade.",
        "abilities": [
            {
                "type": "Use",
                "name": "Imbue",
                "text": [
                    "Keep it in your inventory for bonus attack damage, or consume it to restore health immediately."
                ]
            }
        ]
    }
];
